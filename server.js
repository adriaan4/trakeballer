require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // 465 = SSL directo; 587 = STARTTLS
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

const app = express();
const PORT = process.env.PORT || 3000;

const EMAIL_TIENDA = 'trakeballer@gmail.com';
// IBAN para pagos por transferencia (se puede cambiar con la variable IBAN_TIENDA en Render)
const IBAN_TIENDA = process.env.IBAN_TIENDA || 'ES72 2100 4996 9122 0039 6729';

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// ARCHIVOS
// ============================================================

// Carpeta donde se guardan los PEDIDOS (trake_admin) y los CÓDIGOS DE DESCUENTO
// (admin-descuentos). Para que no se pierdan al redesplegar hace falta un disco
// persistente: en Render, crea un "Disk" con Mount Path /var/data (se detecta solo)
// o pon la variable DATA_DIR con la ruta del disco.
function elegirCarpetaDatos() {
  if (process.env.DATA_DIR) return { dir: process.env.DATA_DIR, persistente: true };
  try {
    if (fs.existsSync('/var/data') && fs.statSync('/var/data').isDirectory()) {
      fs.accessSync('/var/data', fs.constants.W_OK);
      return { dir: '/var/data', persistente: true };
    }
  } catch (_) { /* seguimos con la carpeta del código */ }
  return { dir: __dirname, persistente: false };
}

const { dir: DATA_DIR, persistente: ALMACENAMIENTO_PERSISTENTE } = elegirCarpetaDatos();

try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
} catch (err) {
  console.error(`[FS] No se pudo crear la carpeta de datos ${DATA_DIR}:`, err.message);
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const DESCUENTOS_FILE = path.join(DATA_DIR, 'descuentos.json');
const SUGERENCIAS_FILE = path.join(__dirname, 'sugerencias.json');
const RESENAS_FILE = path.join(__dirname, 'resenas.json');
const SOPORTE_FILE = path.join(DATA_DIR, 'soporte.json');

function inicializarArchivo(ruta) {
  try {
    if (!fs.existsSync(ruta)) {
      fs.writeFileSync(ruta, '[]', 'utf8');
    }
  } catch (err) {
    console.error(`[FS] No se pudo inicializar ${ruta}:`, err.message);
  }
}

// Si antes los archivos estaban en la carpeta del código, se copian a la carpeta de datos.
function migrarArchivoAntiguo(nombre) {
  if (DATA_DIR === __dirname) return;
  try {
    const viejo = path.join(__dirname, nombre);
    const nuevo = path.join(DATA_DIR, nombre);
    if (fs.existsSync(viejo) && !fs.existsSync(nuevo)) {
      fs.copyFileSync(viejo, nuevo);
      console.log(`[FS] Migrado ${nombre} a ${DATA_DIR}`);
    }
  } catch (err) {
    console.error(`[FS] No se pudo migrar ${nombre}:`, err.message);
  }
}

migrarArchivoAntiguo('orders.json');
migrarArchivoAntiguo('descuentos.json');
migrarArchivoAntiguo('soporte.json');

inicializarArchivo(ORDERS_FILE);
inicializarArchivo(SUGERENCIAS_FILE);
inicializarArchivo(RESENAS_FILE);
inicializarArchivo(DESCUENTOS_FILE);
inicializarArchivo(SOPORTE_FILE);

console.log(`[datos] Carpeta de datos: ${DATA_DIR} (${ALMACENAMIENTO_PERSISTENTE ? 'persistente' : 'NO persistente: se borra al redesplegar'})`);
// (los pedidos van a Upstash si están las variables UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN)

// ============================================================
// FUNCIONES ARCHIVOS
// ============================================================

function leerJSON(archivo) {
  try {
    if (!fs.existsSync(archivo)) return [];
    return JSON.parse(fs.readFileSync(archivo, 'utf8'));
  } catch (error) {
    console.error(`Error leyendo ${archivo}:`, error);
    return [];
  }
}

function guardarJSON(archivo, datos) {
  try {
    fs.writeFileSync(archivo, JSON.stringify(datos, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error escribiendo en ${archivo}:`, error);
  }
}

// Lectura estricta: nunca devuelve [] por un error de lectura (así no se pisan
// pedidos/códigos buenos con una lista vacía). Si el archivo está corrupto usa la copia .bak.
function leerJSONSeguro(archivo) {
  if (!fs.existsSync(archivo)) return [];

  const leer = ruta => {
    const texto = fs.readFileSync(ruta, 'utf8');
    if (!texto.trim()) return [];
    const datos = JSON.parse(texto);
    if (!Array.isArray(datos)) throw new Error('El archivo no contiene una lista');
    return datos;
  };

  try {
    return leer(archivo);
  } catch (error) {
    console.error(`[FS] ${archivo} ilegible:`, error.message);
    const copia = archivo + '.bak';
    if (!fs.existsSync(copia)) throw error;
    const datos = leer(copia);
    try { fs.copyFileSync(archivo, `${archivo}.corrupto-${Date.now()}`); } catch (_) {}
    console.warn(`[FS] Recuperado desde ${copia}`);
    return datos;
  }
}

// Escritura atómica (archivo temporal + rename) con copia .bak; lanza error si falla.
function guardarJSONSeguro(archivo, datos) {
  const tmp = archivo + '.tmp';

  try {
    if (fs.existsSync(archivo)) {
      JSON.parse(fs.readFileSync(archivo, 'utf8') || '[]'); // solo copiamos si el actual es válido
      fs.copyFileSync(archivo, archivo + '.bak');
    }
  } catch (_) { /* si el actual está corrupto no pisamos la copia buena */ }

  fs.writeFileSync(tmp, JSON.stringify(datos, null, 2), 'utf8');
  fs.renameSync(tmp, archivo);
}

// ============================================================
// PEDIDOS EN UPSTASH REDIS (base de datos externa: no se borran al redesplegar)
// Variables necesarias (en Render > Environment):
//   UPSTASH_REDIS_REST_URL   = https://xxxx.upstash.io
//   UPSTASH_REDIS_REST_TOKEN = el token REST de la base de datos
// Si no están puestas, se sigue usando orders.json como antes.
// ============================================================

const UPSTASH_URL = String(process.env.UPSTASH_REDIS_REST_URL || '').trim().replace(/\/+$/, '');
const UPSTASH_TOKEN = String(process.env.UPSTASH_REDIS_REST_TOKEN || '').trim();
const USA_REDIS = !!(UPSTASH_URL && UPSTASH_TOKEN);
const REDIS_PEDIDOS = 'trakeballer:pedidos'; // hash: campo = id del pedido, valor = pedido en JSON
const REDIS_SUGERENCIAS = 'trakeballer:sugerencias'; // campo = id
const REDIS_RESENAS = 'trakeballer:resenas'; // campo = id
const REDIS_DESCUENTOS = 'trakeballer:descuentos'; // campo = código
const REDIS_SOPORTE = 'trakeballer:soporte'; // campo = id de la conversación

// Ejecuta UN comando de Redis por la API REST de Upstash. Lanza error si falla.
async function redis(comando) {
  const resp = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(comando),
    signal: AbortSignal.timeout(10000)
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || data.error) {
    throw new Error(`Upstash: ${data.error || resp.status}`);
  }
  return data.result;
}

function parsearPedidosRedis(plano) {
  // HGETALL devuelve [campo1, valor1, campo2, valor2, ...]
  const pedidos = [];
  for (let i = 1; i < (plano || []).length; i += 2) {
    try { pedidos.push(JSON.parse(plano[i])); } catch (e) { console.error('[redis] Pedido ilegible:', plano[i - 1]); }
  }
  return pedidos;
}

async function leerPedidos() {
  if (!USA_REDIS) return leerJSONSeguro(ORDERS_FILE);
  return parsearPedidosRedis(await redis(['HGETALL', REDIS_PEDIDOS]));
}

// Guarda el pedido y comprueba que quedó escrito. Lanza error si no se pudo guardar.
async function guardarPedido(pedido) {
  if (!USA_REDIS) {
    const pedidos = leerJSONSeguro(ORDERS_FILE);

    let id = Date.now();
    while (pedidos.some(p => p.id === id)) id += 1;
    pedido.id = id;

    pedidos.push(pedido);
    guardarJSONSeguro(ORDERS_FILE, pedidos);

    if (!leerJSONSeguro(ORDERS_FILE).some(p => p.id === id)) {
      throw new Error('El pedido no quedó guardado en disco');
    }
    return;
  }

  // HSETNX solo escribe si ese id no existe: dos pedidos a la vez nunca se pisan.
  let id = Date.now();
  for (let intento = 0; intento < 20; intento++, id += 1) {
    pedido.id = id;
    const creado = await redis(['HSETNX', REDIS_PEDIDOS, String(id), JSON.stringify(pedido)]);
    if (creado === 1) {
      if (!(await redis(['HEXISTS', REDIS_PEDIDOS, String(id)]))) {
        throw new Error('El pedido no quedó guardado en Upstash');
      }
      return;
    }
  }
  throw new Error('No se pudo generar un id libre para el pedido');
}

// Cambia un pedido ya guardado: mutar(pedido) modifica el objeto. Devuelve el pedido o null si no existe.
async function actualizarPedido(id, mutar) {
  if (!USA_REDIS) {
    const pedidos = leerJSONSeguro(ORDERS_FILE);
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return null;
    mutar(pedido);
    guardarJSONSeguro(ORDERS_FILE, pedidos);
    return pedido;
  }

  const texto = await redis(['HGET', REDIS_PEDIDOS, String(id)]);
  if (!texto) return null;
  const pedido = JSON.parse(texto);
  mutar(pedido);
  await redis(['HSET', REDIS_PEDIDOS, String(id), JSON.stringify(pedido)]);
  return pedido;
}

// Marca un pedido como listo / no listo. Devuelve el pedido o null si no existe.
function marcarPedidoListo(id, listo) {
  return actualizarPedido(id, p => { p.listo = listo; });
}

// Al arrancar: si una colección está vacía en Redis y existe su archivo .json antiguo,
// se copian sus datos (una sola vez).
async function migrarARedis() {
  if (!USA_REDIS) return;
  const colecciones = [
    { clave: REDIS_PEDIDOS, archivo: ORDERS_FILE, campo: x => x.id, nombre: 'pedidos' },
    { clave: REDIS_SUGERENCIAS, archivo: SUGERENCIAS_FILE, campo: x => x.id, nombre: 'sugerencias' },
    { clave: REDIS_RESENAS, archivo: RESENAS_FILE, campo: x => x.id, nombre: 'reseñas' },
    { clave: REDIS_DESCUENTOS, archivo: DESCUENTOS_FILE, campo: x => x.codigo, nombre: 'códigos de descuento' },
    { clave: REDIS_SOPORTE, archivo: SOPORTE_FILE, campo: x => x.id, nombre: 'conversaciones de soporte' }
  ];

  for (const c of colecciones) {
    try {
      if ((await redis(['HLEN', c.clave])) > 0) continue;
      const viejos = fs.existsSync(c.archivo) ? leerJSONSeguro(c.archivo) : [];
      if (viejos.length === 0) continue;
      const args = ['HSET', c.clave];
      viejos.forEach(x => args.push(String(c.campo(x)), JSON.stringify(x)));
      await redis(args);
      console.log(`[redis] Migrados ${viejos.length} ${c.nombre} del archivo a Upstash`);
    } catch (error) {
      console.error(`[redis] No se pudieron migrar ${c.nombre}:`, error.message);
    }
  }
}

// Si Upstash falla, NO se corta el envío: el aviso por email sigue saliendo.
async function guardarSugerencia(sugerencia) {
  if (USA_REDIS) {
    try {
      await redis(['HSET', REDIS_SUGERENCIAS, String(sugerencia.id), JSON.stringify(sugerencia)]);
    } catch (error) {
      console.error('[sugerencia] No se pudo guardar en Upstash:', error.message);
    }
    return;
  }
  const sugerencias = leerJSON(SUGERENCIAS_FILE);
  sugerencias.push(sugerencia);
  guardarJSON(SUGERENCIAS_FILE, sugerencias);
}

async function guardarResena(resena) {
  if (USA_REDIS) {
    try {
      await redis(['HSET', REDIS_RESENAS, String(resena.id), JSON.stringify(resena)]);
    } catch (error) {
      console.error('[resena] No se pudo guardar en Upstash:', error.message);
    }
    return;
  }
  const resenas = leerJSON(RESENAS_FILE);
  resenas.push(resena);
  guardarJSON(RESENAS_FILE, resenas);
}

async function leerResenas() {
  if (!USA_REDIS) return leerJSON(RESENAS_FILE);
  return parsearPedidosRedis(await redis(['HGETALL', REDIS_RESENAS]));
}

// ============================================================
// OBTENER PRODUCTOS DEL PEDIDO
// ============================================================

function obtenerItems(pedido) {
  if (Array.isArray(pedido.items)) return pedido.items;
  if (Array.isArray(pedido.productos)) return pedido.productos;
  if (Array.isArray(pedido.carrito)) return pedido.carrito;
  return [];
}

// ============================================================
// NORMALIZAR PRODUCTO
// ============================================================

function normalizarProducto(item) {
  const nombre =
    item.equipo || item.nombre || item.name || item.producto || item.titulo || 'Camiseta';

  const tipo = item.tipo || item.category || '';
  const talla = item.talla || item.size || '';
  const dorsal = item.dorsal || item.numero || item.number || '';

  const nombreCamiseta =
    item.nombreCamiseta ||
    item.nombreJugador ||
    item.nombrePersonalizado ||
    item.nombre_personalizado ||
    '';

  const cantidad = Number(item.cantidad ?? item.quantity ?? 1) || 1;
  const precioUnidad =
    Number(item.precioUnidad ?? item.precio ?? item.price ?? 0) || 0;

  let parches = [];
  if (Array.isArray(item.parches)) {
    parches = item.parches;
  } else if (item.parches) {
    parches = [String(item.parches)];
  }

  return { nombre, tipo, talla, dorsal, nombreCamiseta, cantidad, precioUnidad, parches };
}

// ============================================================
// FORMATEAR PRODUCTOS
// ============================================================

function formatearProductosTexto(pedido) {
  const items = obtenerItems(pedido);

  if (items.length === 0) {
    return 'No se recibieron artículos en el pedido.';
  }

  return items
    .map((item, index) => {
      const p = normalizarProducto(item);
      const tipoTexto = p.tipo.toLowerCase().includes('retro') ? 'Retro' : 'Actual';

      let linea = `${index + 1}. ${p.nombre} (${tipoTexto})`;

      if (p.talla) linea += ` - Talla: ${p.talla}`;
      if (p.dorsal) linea += ` - Dorsal: ${p.dorsal}`;
      if (p.nombreCamiseta) linea += ` - Nombre: ${p.nombreCamiseta}`;
      if (p.parches.length > 0) linea += ` - Parches: ${p.parches.join(', ')}`;

      linea +=
        ` - Cantidad: ${p.cantidad}` +
        ` - ${p.precioUnidad.toFixed(2)}€/u` +
        ` - Total: ${(p.precioUnidad * p.cantidad).toFixed(2)}€`;

      return linea;
    })
    .join('\n');
}

// ============================================================
// DESGLOSE DE DESCUENTOS
// ============================================================

const PRECIO_ACTUAL_BASE = 22.99;
const PRECIO_RETRO_BASE = 27.99;

// Precio de los artículos SIN ningún descuento (usa el precio de cada línea; si una línea
// no lo trae, como en el amigo invisible, usa el precio base según sea actual o retro).
function calcularSubtotalSinDescuentos(pedido) {
  return redondear2(
    obtenerItems(pedido).reduce((suma, item) => {
      const p = normalizarProducto(item);
      const base = String(p.tipo).toLowerCase().includes('retro') ? PRECIO_RETRO_BASE : PRECIO_ACTUAL_BASE;
      const unidad = p.precioUnidad > 0 ? p.precioUnidad : base;
      return suma + unidad * p.cantidad;
    }, 0)
  );
}

// Guarda en el pedido cuánto se ha descontado y por qué: la oferta por cantidad
// (6, 10 o 15 camisetas) y/o el código de descuento.
function aplicarDesglose(pedido) {
  const sinDescuentos = calcularSubtotalSinDescuentos(pedido);
  pedido.subtotalSinDescuentos = sinDescuentos;

  const subtotal = typeof pedido.subtotal === 'number' ? pedido.subtotal : null;
  pedido.descuentoCantidad = subtotal === null ? 0 : Math.max(0, redondear2(sinDescuentos - subtotal));
}

// Resumen que se devuelve a la web para enseñárselo al cliente.
function resumenPedido(pedido) {
  return {
    subtotalSinDescuentos: typeof pedido.subtotalSinDescuentos === 'number' ? pedido.subtotalSinDescuentos : null,
    descuentoCantidad: Number(pedido.descuentoCantidad) || 0,
    descuentoCodigo: pedido.descuentoCodigo || null,
    envio: typeof pedido.envio === 'number' ? pedido.envio : null,
    total: Number(pedido.total) || 0
  };
}

// ============================================================
// LINEAS DE SUBTOTAL / ENVIO (texto)
// ============================================================

function lineasTotalesTexto(pedido) {
  const total = Number(pedido.total || 0).toFixed(2);
  const subtotal =
    typeof pedido.subtotal === 'number' ? pedido.subtotal.toFixed(2) : null;
  const envio = typeof pedido.envio === 'number' ? pedido.envio : null;
  const dCantidad = Number(pedido.descuentoCantidad) || 0;
  const hayDescuentos = dCantidad > 0.004 || !!pedido.descuentoCodigo;

  let texto = '';

  if (hayDescuentos && typeof pedido.subtotalSinDescuentos === 'number') {
    texto += `Artículos (precio sin descuentos): ${pedido.subtotalSinDescuentos.toFixed(2)}€\n`;
  } else if (subtotal !== null) {
    texto += `Subtotal: ${subtotal}€\n`;
  }

  if (dCantidad > 0.004) {
    texto += `Descuento por oferta de cantidad: -${dCantidad.toFixed(2)}€\n`;
  }

  if (pedido.descuentoCodigo) {
    texto += `Descuento por código ${descripcionDescuento(pedido.descuentoCodigo)}: -${Number(pedido.descuentoCodigo.importe).toFixed(2)}€\n`;
  }

  if (envio !== null) {
    texto += `Envío: ${envio > 0 ? envio.toFixed(2) + '€' : 'Gratis'}\n`;
  }

  return texto + `TOTAL: ${total}€`;
}

// ============================================================
// CÓDIGOS DE DESCUENTO
// ============================================================

function normalizarCodigo(codigo) {
  return String(codigo || '').trim().toUpperCase().replace(/\s+/g, '');
}

function redondear2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

// Para consultar (validar código) es tolerante; para modificar (estricto=true) lanza
// error si no se puede leer, para no borrar los códigos existentes.
async function leerDescuentos(estricto = false) {
  try {
    if (USA_REDIS) {
      return parsearPedidosRedis(await redis(['HGETALL', REDIS_DESCUENTOS]))
        .sort((x, y) => (x.creadoTs || 0) - (y.creadoTs || 0));
    }
    return leerJSONSeguro(DESCUENTOS_FILE);
  } catch (error) {
    if (estricto) throw error;
    console.error('[descuentos] No se pudo leer:', error.message);
    return [];
  }
}

async function buscarDescuentoActivo(codigo) {
  const cod = normalizarCodigo(codigo);
  if (!cod) return null;
  return (await leerDescuentos()).find(d => d.codigo === cod && d.activo !== false) || null;
}

// Devuelve false si el código ya existía.
async function crearDescuento(nuevo) {
  if (USA_REDIS) {
    return (await redis(['HSETNX', REDIS_DESCUENTOS, nuevo.codigo, JSON.stringify(nuevo)])) === 1;
  }
  const lista = leerJSONSeguro(DESCUENTOS_FILE);
  if (lista.some(d => d.codigo === nuevo.codigo)) return false;
  lista.push(nuevo);
  guardarJSONSeguro(DESCUENTOS_FILE, lista);
  return true;
}

// Cambia campos de un código. Devuelve el código actualizado o null si no existe.
async function actualizarDescuento(codigo, cambios) {
  if (USA_REDIS) {
    const texto = await redis(['HGET', REDIS_DESCUENTOS, codigo]);
    if (!texto) return null;
    const d = Object.assign(JSON.parse(texto), cambios);
    await redis(['HSET', REDIS_DESCUENTOS, codigo, JSON.stringify(d)]);
    return d;
  }
  const lista = leerJSONSeguro(DESCUENTOS_FILE);
  const d = lista.find(x => x.codigo === codigo);
  if (!d) return null;
  Object.assign(d, cambios);
  guardarJSONSeguro(DESCUENTOS_FILE, lista);
  return d;
}

async function borrarDescuento(codigo) {
  if (USA_REDIS) return (await redis(['HDEL', REDIS_DESCUENTOS, codigo])) === 1;
  const lista = leerJSONSeguro(DESCUENTOS_FILE);
  const resto = lista.filter(d => d.codigo !== codigo);
  if (resto.length === lista.length) return false;
  guardarJSONSeguro(DESCUENTOS_FILE, resto);
  return true;
}

async function sumarUsoDescuento(codigo) {
  if (USA_REDIS) {
    const texto = await redis(['HGET', REDIS_DESCUENTOS, codigo]);
    if (!texto) return;
    const d = JSON.parse(texto);
    d.usos = (d.usos || 0) + 1;
    await redis(['HSET', REDIS_DESCUENTOS, codigo, JSON.stringify(d)]);
    return;
  }
  const lista = leerJSONSeguro(DESCUENTOS_FILE);
  const d = lista.find(x => x.codigo === codigo);
  if (d) {
    d.usos = (d.usos || 0) + 1;
    guardarJSONSeguro(DESCUENTOS_FILE, lista);
  }
}

// Mínimo de camisetas para poder hacer un pedido (si hay menos, no se guarda ni se envía nada).
const MIN_CAMISETAS_PEDIDO = 2;

function contarUnidades(pedido) {
  return obtenerItems(pedido).reduce((suma, item) => suma + normalizarProducto(item).cantidad, 0);
}

// Mínimo de camisetas que exige un código (0 = sin mínimo).
function minimoCamisetasCodigo(descuento) {
  return Math.max(0, parseInt(descuento && descuento.minCamisetas, 10) || 0);
}

function textoMinimoCodigo(descuento, unidades) {
  const min = minimoCamisetasCodigo(descuento);
  return `El código ${descuento.codigo} solo se puede usar en pedidos de ${min} camisetas o más. Ahora tienes ${unidades} en el pedido.`;
}

// Importe (en €) que descuenta un código sobre un subtotal. Nunca supera el subtotal.
function calcularImporteDescuento(descuento, subtotal) {
  const base = Math.max(0, Number(subtotal) || 0);
  const bruto = descuento.tipo === 'porcentaje'
    ? base * Number(descuento.valor) / 100
    : Number(descuento.valor);
  return redondear2(Math.min(Math.max(0, bruto), base));
}

function textoValorDescuento(tipo, valor) {
  return tipo === 'porcentaje' ? `-${Number(valor)}%` : `-${Number(valor).toFixed(2)}€`;
}

function descripcionDescuento(dc) {
  return `${dc.codigo} ${textoValorDescuento(dc.tipo, dc.valor)}`;
}

// --- Limitador simple por IP (frena adivinar códigos / contraseñas) ---
const intentos = new Map();

function superaLimite(clave, max, ventanaMs) {
  const ahora = Date.now();
  const reg = intentos.get(clave);
  if (!reg || reg.reinicio < ahora) {
    intentos.set(clave, { n: 1, reinicio: ahora + ventanaMs });
    return false;
  }
  reg.n += 1;
  return reg.n > max;
}

setInterval(() => {
  const ahora = Date.now();
  for (const [k, v] of intentos) if (v.reinicio < ahora) intentos.delete(k);
}, 10 * 60 * 1000).unref();

// --- Acceso de administrador (usuario + contraseña) ---
// Por defecto: usuario "trakeballer". La contraseña NO está en claro en el código,
// solo su hash. Puedes cambiarla poniendo ADMIN_USER y ADMIN_PASS en Render.
const sha256 = txt => crypto.createHash('sha256').update(String(txt)).digest();
const ADMIN_USER = process.env.ADMIN_USER || 'trakeballer';
const ADMIN_PASS_HASH = process.env.ADMIN_PASS
  ? sha256(process.env.ADMIN_PASS)
  : Buffer.from('99a849ebcf21976ff3d62d1af64f08666b92005a3e0ff7d7f0e6924dbb10f415', 'hex');

function iguales(a, b) {
  return crypto.timingSafeEqual(sha256(a), sha256(b));
}

const SESIONES_ADMIN = new Map(); // token -> caducidad
const DURACION_SESION_MS = 8 * 60 * 60 * 1000;

function comprobarSesionAdmin(req, res) {
  const cabecera = req.get('authorization') || '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : '';
  const caduca = SESIONES_ADMIN.get(token);

  if (!token || !caduca || caduca < Date.now()) {
    SESIONES_ADMIN.delete(token);
    res.status(401).json({ ok: false, error: 'Sesión no válida. Vuelve a entrar.' });
    return false;
  }
  return true;
}

app.post('/api/admin/login', (req, res) => {
  if (superaLimite('login:' + req.ip, 10, 15 * 60 * 1000)) {
    return res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' });
  }

  const { usuario, clave } = req.body || {};
  const userOk = iguales(usuario ?? '', ADMIN_USER);
  const passOk = crypto.timingSafeEqual(sha256(clave ?? ''), ADMIN_PASS_HASH);

  if (!userOk || !passOk) {
    return res.status(401).json({ ok: false, error: 'Usuario o contraseña incorrectos.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  SESIONES_ADMIN.set(token, Date.now() + DURACION_SESION_MS);
  res.json({ ok: true, token });
});

app.get('/api/admin/descuentos', async (req, res) => {
  if (!comprobarSesionAdmin(req, res)) return;
  res.json({ ok: true, descuentos: await leerDescuentos(), almacenamientoPersistente: USA_REDIS || ALMACENAMIENTO_PERSISTENTE });
});

app.post('/api/admin/descuentos', async (req, res) => {
  try {
    if (!comprobarSesionAdmin(req, res)) return;

    const codigo = normalizarCodigo(req.body?.codigo);
    const tipo = req.body?.tipo;
    const valor = Number(req.body?.valor);

    if (!/^[A-Z0-9_-]{3,30}$/.test(codigo)) {
      return res.status(400).json({ ok: false, error: 'El código debe tener 3-30 caracteres (letras, números, - o _).' });
    }
    if (tipo !== 'porcentaje' && tipo !== 'euros') {
      return res.status(400).json({ ok: false, error: 'Elige si el descuento es en % o en €.' });
    }
    if (!Number.isFinite(valor) || valor <= 0) {
      return res.status(400).json({ ok: false, error: 'El valor del descuento debe ser mayor que 0.' });
    }
    if (tipo === 'porcentaje' && valor > 100) {
      return res.status(400).json({ ok: false, error: 'El porcentaje no puede superar el 100%.' });
    }
    if (tipo === 'euros' && valor > 10000) {
      return res.status(400).json({ ok: false, error: 'El descuento en euros es demasiado alto.' });
    }

    const minCamisetas = req.body?.minCamisetas === undefined || req.body?.minCamisetas === ''
      ? 0
      : Number(req.body.minCamisetas);
    if (!Number.isInteger(minCamisetas) || minCamisetas < 0 || minCamisetas > 1000) {
      return res.status(400).json({ ok: false, error: 'El mínimo de camisetas debe ser un número entero (0 = sin mínimo).' });
    }

    const nuevo = {
      codigo,
      tipo,
      valor: redondear2(valor),
      minCamisetas,
      activo: true,
      usos: 0,
      creado: new Date().toLocaleString('es-ES'),
      creadoTs: Date.now()
    };

    if (!(await crearDescuento(nuevo))) {
      return res.status(409).json({ ok: false, error: 'Ese código ya existe. Elimínalo antes si quieres cambiarlo.' });
    }
    res.json({ ok: true, descuento: nuevo });
  } catch (error) {
    console.error('[descuentos] Error creando:', error);
    res.status(500).json({ ok: false, error: 'Error interno al crear el código.' });
  }
});

app.patch('/api/admin/descuentos/:codigo', async (req, res) => {
  try {
    if (!comprobarSesionAdmin(req, res)) return;

    const d = await actualizarDescuento(normalizarCodigo(req.params.codigo), { activo: !!req.body?.activo });
    if (!d) return res.status(404).json({ ok: false, error: 'Código no encontrado.' });

    res.json({ ok: true, descuento: d });
  } catch (error) {
    console.error('[descuentos] Error actualizando:', error);
    res.status(500).json({ ok: false, error: 'Error interno al actualizar el código.' });
  }
});

app.delete('/api/admin/descuentos/:codigo', async (req, res) => {
  try {
    if (!comprobarSesionAdmin(req, res)) return;

    if (!(await borrarDescuento(normalizarCodigo(req.params.codigo)))) {
      return res.status(404).json({ ok: false, error: 'Código no encontrado.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('[descuentos] Error eliminando:', error);
    res.status(500).json({ ok: false, error: 'Error interno al eliminar el código.' });
  }
});

// Público: la web comprueba un código antes de enviar el pedido.
app.post('/api/descuento/validar', async (req, res) => {
  if (superaLimite('validar:' + req.ip, 40, 10 * 60 * 1000)) {
    return res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' });
  }

  try {
    const d = await buscarDescuentoActivo(req.body?.codigo);
    if (!d) {
      return res.status(404).json({ ok: false, error: 'Ese código de descuento no es válido.' });
    }

    const min = minimoCamisetasCodigo(d);
    const unidades = Math.max(0, parseInt(req.body?.unidades, 10) || 0);
    if (min > 0 && unidades < min) {
      return res.status(400).json({ ok: false, minCamisetas: min, error: textoMinimoCodigo(d, unidades) });
    }

    res.json({
      ok: true,
      codigo: d.codigo,
      tipo: d.tipo,
      valor: d.valor,
      minCamisetas: min,
      importe: calcularImporteDescuento(d, req.body?.subtotal)
    });
  } catch (error) {
    console.error('[descuentos] Error validando:', error);
    res.status(500).json({ ok: false, error: 'No se pudo comprobar el código. Inténtalo de nuevo.' });
  }
});

// ============================================================
// CORREO PARA TRAKEBALLER
// ============================================================

function formatearPedidoTexto(pedido) {
  const cabecera =
    pedido.tipo === 'amigo-invisible'
      ? `NUEVO PEDIDO DE AMIGO INVISIBLE #${pedido.id}`
      : `NUEVO PEDIDO #${pedido.id}`;

  const avisoPanel = pedido.noGuardadoEnPanel
    ? `⚠️ ATENCIÓN: este pedido NO se pudo guardar en el panel trake_admin. Apúntalo desde este correo.\n\n`
    : '';

  return `${avisoPanel}${cabecera}

Fecha: ${pedido.fecha}

CLIENTE
------------------------------------------
Nombre: ${pedido.cliente?.nombre || ''}
Dirección: ${pedido.cliente?.direccion || ''}
Teléfono: ${pedido.cliente?.telefono || ''}
Email: ${pedido.cliente?.email || ''}
${pedido.notas ? `\nNotas: ${pedido.notas}\n` : ''}
PEDIDO
------------------------------------------
${formatearProductosTexto(pedido)}

${lineasTotalesTexto(pedido)}`;
}

// ============================================================
// CORREO PARA EL CLIENTE
// ============================================================

function formatearJustificanteCliente(pedido) {
  const total = Number(pedido.total || 0).toFixed(2);
  const nombreCliente = pedido.cliente?.nombre || 'cliente';

  return `¡Hola ${nombreCliente}!

Hemos recibido tu pedido #${pedido.id} en Trakeballer. Este es tu justificante:

Fecha: ${pedido.fecha}

TU PEDIDO
------------------------------------------
${formatearProductosTexto(pedido)}

${lineasTotalesTexto(pedido)}

------------------------------------------
CÓMO PAGAR (PAYPAL O TRANSFERENCIA)
------------------------------------------
OPCIÓN 1: PAYPAL
1. Envía ${total}€ por PayPal a:

   ${EMAIL_TIENDA}

2. Envíalo como AMIGOS Y FAMILIARES.

3. NO pongas ningún concepto ni mensaje en el pago.

OPCIÓN 2: TRANSFERENCIA BANCARIA
1. Haz una transferencia de ${total}€ al IBAN:

   ${IBAN_TIENDA}

2. En el concepto pon el número de tu pedido: #${pedido.id}

Después, sea cual sea el método, manda el comprobante de pago junto con la
captura o el número de pedido (#${pedido.id}) a este mismo correo: ${EMAIL_TIENDA}

El pedido no se tramita hasta que recibamos el pago y el comprobante.
------------------------------------------

Nos pondremos en contacto contigo para confirmar el pedido. ¡Gracias por tu compra!

Para cualquier duda sobre tu pedido, escríbenos a ${EMAIL_TIENDA}

- Trakeballer`;
}

// ============================================================
// ESCAPAR HTML
// ============================================================

function escapeHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// HTML DE LOS PRODUCTOS
// ============================================================

function crearHTMLProductos(pedido) {
  const items = obtenerItems(pedido);

  if (items.length === 0) {
    return `<p>No se recibieron artículos en el pedido.</p>`;
  }

  return items
    .map((item, index) => {
      const p = normalizarProducto(item);
      const tipoTexto = p.tipo.toLowerCase().includes('retro') ? 'Retro' : 'Actual';

      return `
        <div style="border:1px solid #dddddd;border-radius:10px;padding:15px;margin-bottom:12px;font-family:Arial,sans-serif;">
          <strong style="font-size:16px;">
            ${index + 1}. ${escapeHTML(p.nombre)}
          </strong>

          <div style="margin-top:8px;">Tipo: ${escapeHTML(tipoTexto)}</div>

          ${p.talla ? `<div>Talla: ${escapeHTML(p.talla)}</div>` : ''}
          ${p.dorsal ? `<div>Dorsal: ${escapeHTML(p.dorsal)}</div>` : ''}
          ${p.nombreCamiseta ? `<div>Nombre: ${escapeHTML(p.nombreCamiseta)}</div>` : ''}
          ${p.parches.length ? `<div>Parches: ${escapeHTML(p.parches.join(', '))}</div>` : ''}

          <div style="margin-top:8px;">Cantidad: ${p.cantidad}</div>
          <div>Precio unidad: ${p.precioUnidad.toFixed(2)}€</div>
          <strong>Total: ${(p.precioUnidad * p.cantidad).toFixed(2)}€</strong>
        </div>
      `;
    })
    .join('');
}

// ============================================================
// HTML COMPLETO DEL EMAIL
// ============================================================

function bloqueTotalesHTML(pedido) {
  const dCantidad = Number(pedido.descuentoCantidad) || 0;
  const hayDescuentos = dCantidad > 0.004 || !!pedido.descuentoCodigo;
  const verde = 'color:#1a7f37;';
  let html = '';

  if (hayDescuentos && typeof pedido.subtotalSinDescuentos === 'number') {
    html += `<p><strong>Artículos (precio sin descuentos):</strong> ${pedido.subtotalSinDescuentos.toFixed(2)}€</p>`;
  } else if (typeof pedido.subtotal === 'number') {
    html += `<p><strong>Subtotal:</strong> ${pedido.subtotal.toFixed(2)}€</p>`;
  }

  if (dCantidad > 0.004) {
    html += `<p style="${verde}"><strong>Descuento por oferta de cantidad:</strong> -${dCantidad.toFixed(2)}€</p>`;
  }

  if (pedido.descuentoCodigo) {
    html += `<p style="${verde}"><strong>Descuento por código ${escapeHTML(descripcionDescuento(pedido.descuentoCodigo))}:</strong> -${Number(pedido.descuentoCodigo.importe).toFixed(2)}€</p>`;
  }

  if (typeof pedido.envio === 'number') {
    html += `<p><strong>Envío:</strong> ${pedido.envio > 0 ? pedido.envio.toFixed(2) + '€' : 'Gratis'}</p>`;
  }

  return html;
}

function crearHTMLPedido(pedido, esCliente = false) {
  const productosHTML = crearHTMLProductos(pedido);
  const total = Number(pedido.total || 0).toFixed(2);
  const nombre = pedido.cliente?.nombre || 'cliente';

  const bloqueCliente = `
    <div style="background:#f7f7f7;border-radius:10px;padding:15px;margin-bottom:10px;">
      <p style="margin:4px 0;"><strong>Cliente:</strong> ${escapeHTML(nombre)}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${escapeHTML(pedido.cliente?.email || '')}</p>
      <p style="margin:4px 0;"><strong>Teléfono:</strong> ${escapeHTML(pedido.cliente?.telefono || '')}</p>
      <p style="margin:4px 0;"><strong>Dirección:</strong> ${escapeHTML(pedido.cliente?.direccion || '')}</p>
      ${pedido.notas ? `<p style="margin:4px 0;"><strong>Notas:</strong> ${escapeHTML(pedido.notas)}</p>` : ''}
    </div>
  `;

  const bloquePaypal = `
    <div style="margin-top:25px;border:2px solid #0070ba;border-radius:12px;padding:20px;background:#f0f7fd;">
      <h3 style="margin-top:0;color:#0070ba;">Cómo pagar (PayPal o transferencia)</h3>

      <p style="margin-bottom:4px;"><strong>Opción 1: PayPal</strong></p>
      <ol style="padding-left:20px;line-height:1.7;margin-top:4px;">
        <li>Envía <strong>${total}€</strong> por PayPal a:<br>
          <strong style="font-size:17px;">${EMAIL_TIENDA}</strong>
        </li>
        <li>Envíalo como <strong>AMIGOS Y FAMILIARES</strong>.</li>
        <li><strong>NO pongas ningún concepto ni mensaje</strong> en el pago.</li>
      </ol>

      <p style="margin-bottom:4px;"><strong>Opción 2: transferencia bancaria</strong></p>
      <ol style="padding-left:20px;line-height:1.7;margin-top:4px;">
        <li>Haz una transferencia de <strong>${total}€</strong> al IBAN:<br>
          <strong style="font-size:17px;letter-spacing:1px;">${escapeHTML(IBAN_TIENDA)}</strong>
        </li>
        <li>En el concepto pon el número de tu pedido: <strong>#${pedido.id}</strong></li>
      </ol>

      <p><strong>Después, con cualquiera de los dos métodos,</strong> manda el <strong>comprobante de pago</strong> y la captura o el número de pedido (<strong>#${pedido.id}</strong>) a este mismo correo: <strong>${EMAIL_TIENDA}</strong></p>
      <p style="margin-bottom:0;">
        <strong>El pedido no se tramita hasta que recibamos el pago y el comprobante.</strong>
      </p>
    </div>
    <p style="margin-top:25px;">Nos pondremos en contacto contigo para confirmar el pedido. ¡Gracias por tu compra!</p>
    <p style="color:#666;font-size:14px;">Para cualquier duda sobre tu pedido, escríbenos a <strong>${EMAIL_TIENDA}</strong><br>- Trakeballer</p>
  `;

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">
<div style="max-width:650px;margin:auto;background:#ffffff;padding:25px;border-radius:12px;">
  ${!esCliente && pedido.noGuardadoEnPanel ? `<p style="background:#fdecea;color:#b42318;padding:10px;border-radius:8px;"><strong>⚠️ Este pedido NO se pudo guardar en el panel trake_admin.</strong> Apúntalo desde este correo.</p>` : ''}
  <h2>${esCliente ? `¡Hola ${escapeHTML(nombre)}!` : `NUEVO PEDIDO #${pedido.id}`}</h2>
  ${
    esCliente
      ? `<p>Hemos recibido tu pedido <strong>#${pedido.id}</strong> en Trakeballer. Este es tu justificante.</p>
         <p style="color:#666;font-size:14px;">Fecha: ${escapeHTML(pedido.fecha || '')}</p>`
      : `<p style="color:#666;font-size:14px;">Fecha: ${escapeHTML(pedido.fecha || '')}</p>${bloqueCliente}`
  }
  <h3 style="margin-top:30px;">${esCliente ? 'TU PEDIDO' : 'PEDIDO'}</h3>
  ${productosHTML}
  ${bloqueTotalesHTML(pedido)}
  <h2>TOTAL: ${total}€</h2>
  ${esCliente ? bloquePaypal : ''}
</div>
</body>
</html>
`;
}

// ============================================================
// EMAIL (SMTP con Nodemailer)
// ============================================================

async function enviarEmail(destino, asunto, texto, nombreDestino = '', html = '') {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[email] Falta configuración SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)');
    return { ok: false, motivo: 'SMTP no configurado' };
  }

  if (!process.env.EMAIL_FROM) {
    console.warn('[email] Falta EMAIL_FROM');
    return { ok: false, motivo: 'EMAIL_FROM no configurada' };
  }

  try {
    const info = await transporter.sendMail({
      from: `Trakeballer <${process.env.EMAIL_FROM}>`,
      to: destino,
      subject: asunto,
      text: texto,
      ...(html ? { html } : {})
    });

    console.log(`[email] Enviado a ${destino} - ID: ${info.messageId}`);
    return { ok: true, id: info.messageId };
  } catch (error) {
    console.error(`[email] Error enviando email a ${destino}:`, error.message);
    return { ok: false, motivo: error.message };
  }
}

// ============================================================
// TWILIO (Manejo de error por si no está instalado)
// ============================================================

async function avisarPorTwilio(texto, { from, to }) {
  if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !from ||
    !to
  ) {
    return { ok: false, motivo: 'no configurado' };
  }

  try {
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const resultado = await client.messages.create({ body: texto, from, to });
    return { ok: true, sid: resultado.sid };
  } catch (error) {
    console.warn('[Twilio] No se envió mensaje:', error.message);
    return { ok: false, motivo: error.message };
  }
}

// ============================================================
// PEDIDO
// ============================================================

// Avisos al dueño y al cliente (email, SMS, WhatsApp). Se lanza DESPUÉS de guardar el
// pedido y de responder a la web: si algo falla aquí, el cliente ya no ve ningún error.
async function notificarPedido(pedido) {
  const esAmigoInvisible = pedido.tipo === 'amigo-invisible';

  const resultados = {};

  const intentar = async (nombre, fn) => {
    try {
      const resultado = await fn();
      resultados[nombre] = resultado;
      if (resultado && resultado.ok === false) {
        console.warn(`[aviso:${nombre}] No enviado:`, resultado.motivo || resultado);
      }
      return resultado;
    } catch (error) {
      console.error(`[aviso:${nombre}] Error:`, error);
      resultados[nombre] = { ok: false, motivo: error.message };
      return resultados[nombre];
    }
  };

  let textoAdmin = '';

  await intentar('email-tienda', async () => {
    textoAdmin = formatearPedidoTexto(pedido);
    const htmlAdmin = crearHTMLPedido(pedido, false);
    const prefijo = pedido.noGuardadoEnPanel ? '⚠️ NO GUARDADO EN EL PANEL - ' : '';
    const asuntoAdmin = esAmigoInvisible
      ? `${prefijo}Nuevo pedido de amigo invisible #${pedido.id} - ${Number(pedido.total || 0).toFixed(2)}€`
      : `${prefijo}Nuevo pedido #${pedido.id} - ${Number(pedido.total || 0).toFixed(2)}€`;

    return enviarEmail(process.env.EMAIL_TO || EMAIL_TIENDA, asuntoAdmin, textoAdmin, '', htmlAdmin);
  });

  if (pedido.cliente && pedido.cliente.email) {
    await intentar('email-cliente', async () => enviarEmail(
      pedido.cliente.email,
      `Tu pedido #${pedido.id} en Trakeballer`,
      formatearJustificanteCliente(pedido),
      pedido.cliente.nombre,
      crearHTMLPedido(pedido, true)
    ));
  }

  await intentar('sms', () => avisarPorTwilio(textoAdmin, {
    from: process.env.TWILIO_SMS_FROM,
    to: process.env.TWILIO_SMS_TO
  }));

  await intentar('whatsapp', () => avisarPorTwilio(textoAdmin, {
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.TWILIO_WHATSAPP_TO
  }));

  return resultados;
}

app.post('/api/pedido', async (req, res) => {
  let pedido;

  try {
    pedido = req.body;
    const items = obtenerItems(pedido);

    console.log('[pedido] Artículos recibidos:', items.length);

    if (!pedido || items.length === 0) {
      return res.status(400).json({ ok: false, error: 'El pedido no tiene artículos.' });
    }

    // Mínimo de camisetas: si hay menos, se rechaza ANTES de guardar y de enviar ningún correo.
    const unidadesPedido = contarUnidades(pedido);
    if (unidadesPedido < MIN_CAMISETAS_PEDIDO) {
      return res.status(400).json({
        ok: false,
        error: `El pedido mínimo es de ${MIN_CAMISETAS_PEDIDO} camisetas. Añade al menos otra camiseta para poder enviarlo.`
      });
    }

    const esAmigoInvisible = pedido.tipo === 'amigo-invisible';

    if (esAmigoInvisible) {
      if (!pedido.cliente || !pedido.cliente.nombre || (!pedido.cliente.telefono && !pedido.cliente.email)) {
        return res.status(400).json({ ok: false, error: 'Faltan datos de contacto.' });
      }
    } else {
      if (!pedido.cliente || !pedido.cliente.nombre || !pedido.cliente.direccion || !pedido.cliente.telefono) {
        return res.status(400).json({ ok: false, error: 'Faltan datos de contacto.' });
      }
    }

    // Identificador que genera la web en cada envío: si la web reintenta por un corte de
    // conexión, el pedido NO se duplica (se devuelve el que ya estaba guardado).
    const idCliente = typeof pedido.idCliente === 'string'
      ? pedido.idCliente.replace(/[^\w-]/g, '').slice(0, 64)
      : '';

    if (idCliente) {
      const existente = (await leerPedidos()).find(p => p.idCliente === idCliente);
      if (existente) {
        return res.json({ ok: true, pedidoId: existente.id, repetido: true, resumen: resumenPedido(existente) });
      }
      pedido.idCliente = idCliente;
    } else {
      delete pedido.idCliente;
    }

    // Código de descuento: se valida SIEMPRE en el servidor y se recalcula el total.
    delete pedido.descuentoCodigo;
    const codigoRecibido = normalizarCodigo(pedido.codigoDescuento);
    let descuentoUsado = null;

    if (codigoRecibido) {
      descuentoUsado = await buscarDescuentoActivo(codigoRecibido);
      if (!descuentoUsado) {
        return res.status(400).json({ ok: false, error: 'El código de descuento no es válido. Quítalo o revísalo e inténtalo de nuevo.' });
      }

      if (unidadesPedido < minimoCamisetasCodigo(descuentoUsado)) {
        return res.status(400).json({ ok: false, error: textoMinimoCodigo(descuentoUsado, unidadesPedido) + ' Quita el código o añade más camisetas.' });
      }

      const base = typeof pedido.subtotal === 'number' ? pedido.subtotal : Number(pedido.total) || 0;
      const importe = calcularImporteDescuento(descuentoUsado, base);
      const envio = typeof pedido.envio === 'number' ? pedido.envio : 0;

      pedido.codigoDescuento = descuentoUsado.codigo;
      pedido.subtotal = base;
      pedido.descuentoCodigo = {
        codigo: descuentoUsado.codigo,
        tipo: descuentoUsado.tipo,
        valor: descuentoUsado.valor,
        importe
      };
      pedido.total = redondear2(Math.max(0, base - importe) + envio);
    } else {
      delete pedido.codigoDescuento;
    }

    pedido.fecha = new Date().toLocaleString('es-ES');

    // Cuánto se ha descontado y por qué (oferta por cantidad y/o código)
    aplicarDesglose(pedido);
  } catch (error) {
    console.error('[pedido] Error preparando el pedido:', error);
    return res.status(500).json({ ok: false, error: 'No se pudo procesar el pedido.', detalle: error.message });
  }

  // 1) GUARDAR (aparece en trake_admin).
  //    Si el disco falla, el pedido NO se pierde: se manda igualmente por email a la tienda
  //    (con un aviso) y solo se da error al cliente si tampoco se puede enviar ese email.
  try {
    await guardarPedido(pedido);
  } catch (error) {
    console.error('[pedido] NO SE PUDO GUARDAR:', error);
    pedido.id = pedido.id || Date.now();
    pedido.noGuardadoEnPanel = true;

    const avisos = await notificarPedido(pedido).catch(e => ({ 'email-tienda': { ok: false, motivo: e.message } }));

    if (avisos['email-tienda'] && avisos['email-tienda'].ok) {
      return res.json({ ok: true, pedidoId: pedido.id, resumen: resumenPedido(pedido) });
    }

    return res.status(500).json({
      ok: false,
      error: 'No se pudo registrar el pedido por un fallo del servidor. Escríbenos a trakeballer@gmail.com con tu pedido.',
      detalle: error.message
    });
  }

  // 2) Contar el uso del código (si falla no afecta al pedido, que ya está guardado)
  try {
    if (pedido.descuentoCodigo) {
      await sumarUsoDescuento(pedido.descuentoCodigo.codigo);
    }
  } catch (error) {
    console.error('[pedido] No se pudo contar el uso del código:', error);
  }

  // 3) Responder YA a la web: el pedido está guardado.
  res.json({ ok: true, pedidoId: pedido.id, resumen: resumenPedido(pedido) });

  // 4) Avisos en segundo plano (nunca pueden provocar un error al cliente)
  notificarPedido(pedido).catch(error => console.error('[pedido] Error en avisos:', error));
});

// ============================================================
// SUGERENCIAS
// ============================================================

app.post('/api/sugerencia', async (req, res) => {
  try {
    const { mensaje, nombre, email } = req.body || {};

    if (!mensaje || !mensaje.trim()) {
      return res.status(400).json({ ok: false, error: 'Cuéntanos qué camiseta te falta.' });
    }

    const sugerencia = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      mensaje: mensaje.trim(),
      nombre: nombre?.trim() || '',
      email: email?.trim() || ''
    };

    await guardarSugerencia(sugerencia);

    const texto = `NUEVA SUGERENCIA DE CAMISETA\n\nFecha:\n${sugerencia.fecha}\n\nNombre:\n${sugerencia.nombre || 'No indicado'}\n\nEmail:\n${sugerencia.email || 'No indicado'}\n\nMensaje:\n${sugerencia.mensaje}`;

    const html = `
      <h2>Nueva sugerencia de camiseta</h2>
      <p><strong>Fecha:</strong> ${escapeHTML(sugerencia.fecha)}</p>
      <p><strong>Nombre:</strong> ${escapeHTML(sugerencia.nombre || 'No indicado')}</p>
      <p><strong>Email:</strong> ${escapeHTML(sugerencia.email || 'No indicado')}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHTML(sugerencia.mensaje)}</p>
    `;

    const resultado = await enviarEmail(
      process.env.EMAIL_TO || EMAIL_TIENDA,
      'Sugerencia de camiseta en Trakeballer',
      texto,
      '',
      html
    );

    res.json({ ok: true, aviso: resultado });
  } catch (error) {
    console.error('[sugerencia] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al enviar la sugerencia.' });
  }
});

// ============================================================
// RESEÑAS
// ============================================================

app.get('/api/resenas', async (req, res) => {
  try {
    const resenas = (await leerResenas())
      .filter(r => r.aprobada !== false)
      .sort((a, b) => b.id - a.id);

    res.json({ ok: true, resenas });
  } catch (error) {
    console.error('[resenas] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al leer las reseñas.' });
  }
});

app.post('/api/resena', async (req, res) => {
  try {
    const { nombre, valoracion, mensaje } = req.body || {};
    const estrellas = Math.round(Number(valoracion));

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ ok: false, error: 'Cuéntanos tu nombre.' });
    }

    if (!estrellas || estrellas < 1 || estrellas > 5) {
      return res.status(400).json({ ok: false, error: 'Elige una valoración de 1 a 5 estrellas.' });
    }

    if (!mensaje || !mensaje.trim()) {
      return res.status(400).json({ ok: false, error: 'Cuéntanos tu opinión.' });
    }

    const resena = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      nombre: nombre.trim().slice(0, 80),
      valoracion: estrellas,
      mensaje: mensaje.trim().slice(0, 600),
      aprobada: true
    };

    await guardarResena(resena);

    const texto = `NUEVA RESEÑA EN TRAKEBALLER\n\nFecha:\n${resena.fecha}\n\nNombre:\n${resena.nombre}\n\nValoración:\n${resena.valoracion} / 5 estrellas\n\nOpinión:\n${resena.mensaje}`;

    const html = `
      <h2>Nueva reseña en Trakeballer</h2>
      <p><strong>Fecha:</strong> ${escapeHTML(resena.fecha)}</p>
      <p><strong>Nombre:</strong> ${escapeHTML(resena.nombre)}</p>
      <p><strong>Valoración:</strong> ${resena.valoracion} / 5 estrellas</p>
      <p><strong>Opinión:</strong></p>
      <p>${escapeHTML(resena.mensaje)}</p>
    `;

    const resultado = await enviarEmail(
      process.env.EMAIL_TO || EMAIL_TIENDA,
      `Nueva reseña (${resena.valoracion}★) de ${resena.nombre} - Trakeballer`,
      texto,
      '',
      html
    );

    res.json({ ok: true, resena, aviso: resultado });
  } catch (error) {
    console.error('[resena] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al enviar la reseña.' });
  }
});

// ============================================================
// ADMIN: VER Y GESTIONAR PEDIDOS
// ============================================================

function comprobarAdmin(req, res) {
  const clave = req.query.clave || req.headers['x-admin-key'];

  if (!process.env.ADMIN_PASSWORD || clave !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ ok: false, error: 'No autorizado.' });
    return false;
  }

  return true;
}

app.get('/api/pedidos', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;
    const pedidos = (await leerPedidos()).sort((a, b) => b.id - a.id);
    res.json({ ok: true, pedidos, almacenamientoPersistente: USA_REDIS || ALMACENAMIENTO_PERSISTENTE });
  } catch (error) {
    console.error('[pedidos] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al leer los pedidos.' });
  }
});

app.post('/api/pedidos/:id/listo', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const id = Number(req.params.id);
    const listo = !!(req.body && req.body.listo);

    const pedido = await marcarPedidoListo(id, listo);

    if (!pedido) {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado.' });
    }

    res.json({ ok: true, pedido });
  } catch (error) {
    console.error('[pedidos/listo] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al actualizar el pedido.' });
  }
});

// ============================================================
// ADMIN: CÓDIGO DE SEGUIMIENTO DEL ENVÍO (+ correo al cliente)
// ============================================================

const TRANSPORTISTAS = {
  correos: { nombre: 'Correos', url: c => `https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=${encodeURIComponent(c)}` },
  seur: { nombre: 'SEUR', url: c => `https://www.seur.com/livetracking/?segOnlineIdentificador=${encodeURIComponent(c)}` },
  dhl: { nombre: 'DHL', url: c => `https://www.dhl.com/es-es/home/tracking.html?tracking-id=${encodeURIComponent(c)}` },
  ups: { nombre: 'UPS', url: c => `https://www.ups.com/track?tracknum=${encodeURIComponent(c)}` },
  '17track': { nombre: '17TRACK (internacional)', url: c => `https://t.17track.net/es#nums=${encodeURIComponent(c)}` },
  otro: { nombre: 'Otro', url: null }
};

function enlaceSeguimiento(transportistaId, codigo, enlacePropio) {
  if (enlacePropio) return enlacePropio;
  const t = TRANSPORTISTAS[transportistaId];
  return t && t.url ? t.url(codigo) : '';
}

function formatearSeguimientoTexto(pedido) {
  const sg = pedido.seguimiento;
  return `¡Hola ${pedido.cliente?.nombre || ''}!

Tu pedido #${pedido.id} de Trakeballer ya está en camino 📦

Transportista: ${sg.transportista}
Código de seguimiento: ${sg.codigo}
${sg.enlace ? `Seguir el envío: ${sg.enlace}\n` : ''}
Recuerda que el seguimiento puede tardar unas horas (a veces un par de días) en mostrar movimientos.

Si tienes cualquier duda, escríbenos a ${EMAIL_TIENDA} o por el chat de soporte de la web.

- Trakeballer`;
}

function formatearSeguimientoHTML(pedido) {
  const sg = pedido.seguimiento;
  const boton = sg.enlace
    ? `<p style="margin:22px 0;"><a href="${escapeHTML(sg.enlace)}" style="background:#0b1f3a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block;">Seguir mi envío</a></p>`
    : '';
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">
<div style="max-width:560px;margin:auto;background:#ffffff;padding:25px;border-radius:12px;">
  <h2 style="margin-top:0;">¡Hola ${escapeHTML(pedido.cliente?.nombre || '')}! 📦</h2>
  <p>Tu pedido <strong>#${pedido.id}</strong> de Trakeballer <strong>ya está en camino</strong>.</p>
  <div style="background:#f7f7f7;border-radius:10px;padding:15px;">
    <p style="margin:4px 0;"><strong>Transportista:</strong> ${escapeHTML(sg.transportista)}</p>
    <p style="margin:4px 0;"><strong>Código de seguimiento:</strong> <span style="font-size:17px;letter-spacing:1px;">${escapeHTML(sg.codigo)}</span></p>
  </div>
  ${boton}
  <p style="color:#666;font-size:14px;">El seguimiento puede tardar unas horas (a veces un par de días) en mostrar movimientos.</p>
  <p style="color:#666;font-size:14px;">Dudas: escríbenos a <strong>${EMAIL_TIENDA}</strong> o por el chat de soporte de la web.<br>- Trakeballer</p>
</div>
</body>
</html>`;
}

// Guarda (o cambia) el código de seguimiento y avisa al cliente por correo.
app.post('/api/pedidos/:id/seguimiento', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const id = Number(req.params.id);
    const codigo = String(req.body?.codigo || '').trim();
    const transportistaId = Object.prototype.hasOwnProperty.call(TRANSPORTISTAS, req.body?.transportista) ? req.body.transportista : 'otro';
    const enlacePropio = String(req.body?.enlace || '').trim();
    const enviarCorreo = req.body?.enviarCorreo !== false;

    if (!/^[A-Za-z0-9._\/ -]{4,60}$/.test(codigo)) {
      return res.status(400).json({ ok: false, error: 'El código de seguimiento debe tener entre 4 y 60 caracteres (letras, números, - . _ /).' });
    }
    if (enlacePropio && !/^https?:\/\/[^\s"'<>]{4,300}$/i.test(enlacePropio)) {
      return res.status(400).json({ ok: false, error: 'El enlace de seguimiento debe empezar por http:// o https://' });
    }

    const pedido = await actualizarPedido(id, p => {
      p.seguimiento = {
        codigo,
        transportista: TRANSPORTISTAS[transportistaId].nombre,
        transportistaId,
        enlace: enlaceSeguimiento(transportistaId, codigo, enlacePropio),
        fecha: new Date().toLocaleString('es-ES'),
        correoEnviado: false,
        correoFecha: (p.seguimiento && p.seguimiento.codigo === codigo) ? (p.seguimiento.correoFecha || '') : ''
      };
    });
    if (!pedido) return res.status(404).json({ ok: false, error: 'Pedido no encontrado.' });

    let correo = { ok: false, motivo: 'no se pidió enviar correo' };
    const email = pedido.cliente && pedido.cliente.email;

    if (enviarCorreo) {
      if (!email) {
        correo = { ok: false, motivo: 'Este pedido no tiene email del cliente.' };
      } else {
        correo = await enviarEmail(
          email,
          `Tu pedido #${pedido.id} ya está en camino 📦`,
          formatearSeguimientoTexto(pedido),
          pedido.cliente.nombre,
          formatearSeguimientoHTML(pedido)
        );
        if (correo.ok) {
          const fechaCorreo = new Date().toLocaleString('es-ES');
          await actualizarPedido(id, p => {
            p.seguimiento.correoEnviado = true;
            p.seguimiento.correoFecha = fechaCorreo;
          });
          pedido.seguimiento.correoEnviado = true;
          pedido.seguimiento.correoFecha = fechaCorreo;
        }
      }
    }

    res.json({ ok: true, pedido, correo });
  } catch (error) {
    console.error('[seguimiento] Error:', error);
    res.status(500).json({ ok: false, error: 'Error interno al guardar el seguimiento.' });
  }
});

app.delete('/api/pedidos/:id/seguimiento', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;
    const pedido = await actualizarPedido(Number(req.params.id), p => { delete p.seguimiento; });
    if (!pedido) return res.status(404).json({ ok: false, error: 'Pedido no encontrado.' });
    res.json({ ok: true, pedido });
  } catch (error) {
    console.error('[seguimiento] Error borrando:', error);
    res.status(500).json({ ok: false, error: 'Error interno al quitar el seguimiento.' });
  }
});

// ============================================================
// ADMIN: SUBIR CAMISETAS A CLOUDINARY
// Las fotos Y sus datos (sección, liga, equipo, normal/retro, nombre) se guardan
// en Cloudinary (tag + contexto), así NO se pierden al redesplegar en Render.
// Variable necesaria en Render: CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
// ============================================================

const CLD_CARPETA = 'trakeballer/camisetas';
const CLD_TAG = 'trk-camiseta';
const CLD_CATEGORIAS = ['mundial', 'liga'];
const CLD_TIPOS = ['normal', 'retro', 'escudo'];
const CLD_VARIANTES = ['local', 'visitante', 'otra'];

function leerConfigCloudinary() {
  const url = String(process.env.CLOUDINARY_URL || '').trim();
  const m = url.match(/^cloudinary:\/\/([^:@\/]+):([^@\/]+)@([^\/?#]+)/);
  if (m) return { apiKey: m[1], apiSecret: m[2], cloudName: m[3] };
  const { CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret, CLOUDINARY_CLOUD_NAME: cloudName } = process.env;
  if (apiKey && apiSecret && cloudName) return { apiKey, apiSecret, cloudName };
  return null;
}

function exigirCloudinary(res) {
  const cfg = leerConfigCloudinary();
  if (!cfg) {
    res.status(503).json({
      ok: false,
      error: 'Cloudinary no está configurado. En Render añade la variable CLOUDINARY_URL (cloudinary://API_KEY:API_SECRET@CLOUD_NAME) y redespliega.'
    });
    return null;
  }
  return cfg;
}

function firmarCloudinary(params, apiSecret) {
  const base = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== null && params[k] !== '')
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(base + apiSecret).digest('hex');
}

function limpiarTextoCloudinary(valor, max = 80) {
  return String(valor ?? '')
    .replace(/[\u0000-\u001f|=\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function authCloudinary(cfg) {
  return 'Basic ' + Buffer.from(`${cfg.apiKey}:${cfg.apiSecret}`).toString('base64');
}

function urlConTransformacion(url, transformacion) {
  return String(url || '').replace('/image/upload/', `/image/upload/${transformacion}/`);
}

let cacheCamisetasAdmin = { t: 0, datos: null };

async function listarCamisetasCloudinary(cfg, { fresco = false } = {}) {
  if (!fresco && cacheCamisetasAdmin.datos && Date.now() - cacheCamisetasAdmin.t < 60 * 1000) {
    return cacheCamisetasAdmin.datos;
  }

  const recursos = [];
  let cursor = '';
  for (let pagina = 0; pagina < 10; pagina++) {
    const qs = new URLSearchParams({ context: 'true', max_results: '500' });
    if (cursor) qs.set('next_cursor', cursor);
    const resp = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cfg.cloudName)}/resources/image/tags/${CLD_TAG}?${qs}`,
      { headers: { Authorization: authCloudinary(cfg) }, signal: AbortSignal.timeout(15000) }
    );
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data?.error?.message || `Cloudinary respondió ${resp.status}`);
    recursos.push(...(data.resources || []));
    cursor = data.next_cursor || '';
    if (!cursor) break;
  }

  const decodificar = v => {
    try { return decodeURIComponent(v ?? ''); } catch (_) { return String(v ?? ''); }
  };

  const camisetas = recursos
    .map(r => {
      const c = (r.context && r.context.custom) || {};
      return {
        id: r.public_id,
        categoria: decodificar(c.cat),
        ligaId: decodificar(c.liga),
        equipoId: decodificar(c.eqid),
        equipoNombre: decodificar(c.eq),
        tipo: ['retro', 'escudo'].includes(decodificar(c.tipo)) ? decodificar(c.tipo) : 'normal',
        variante: decodificar(c.var),
        nombre: decodificar(c.nom),
        img: urlConTransformacion(r.secure_url, 'f_auto,q_auto,w_900'),
        thumb: urlConTransformacion(r.secure_url, 'f_auto,q_auto,w_300,h_300,c_fit'),
        creado: r.created_at || ''
      };
    })
    .filter(c => CLD_CATEGORIAS.includes(c.categoria) && c.equipoNombre)
    .sort((a, b) => String(a.creado).localeCompare(String(b.creado)));

  cacheCamisetasAdmin = { t: Date.now(), datos: camisetas };
  return camisetas;
}

// Público: la web lo usa para añadir las camisetas subidas al catálogo.
app.get('/api/camisetas-admin', async (req, res) => {
  const cfg = leerConfigCloudinary();
  if (!cfg) return res.json({ ok: true, camisetas: [] });
  try {
    const camisetas = await listarCamisetasCloudinary(cfg);
    res.set('Cache-Control', 'public, max-age=30');
    res.json({ ok: true, camisetas });
  } catch (error) {
    console.error('[camisetas-admin] Error listando:', error.message);
    // Si Cloudinary falla, se sirve la última lista buena (si la hay) para no romper la tienda.
    res.json({ ok: true, camisetas: (cacheCamisetasAdmin.datos || []) });
  }
});

// Admin: lista fresca (con los precios vigentes para enseñarlos en el panel).
app.get('/api/admin/camisetas', async (req, res) => {
  if (!comprobarAdmin(req, res)) return;
  const cfg = exigirCloudinary(res);
  if (!cfg) return;
  try {
    const camisetas = await listarCamisetasCloudinary(cfg, { fresco: true });
    res.json({ ok: true, camisetas, precios: { normal: PRECIO_ACTUAL_BASE, retro: PRECIO_RETRO_BASE } });
  } catch (error) {
    console.error('[admin/camisetas] Error:', error.message);
    res.status(502).json({ ok: false, error: 'No se pudo leer Cloudinary: ' + error.message });
  }
});

// Admin: valida los datos y devuelve la firma para subir UNA foto directamente a Cloudinary
// (el secreto nunca sale del servidor y las fotos no pasan por Render).
app.post('/api/admin/camisetas/firma', (req, res) => {
  if (!comprobarAdmin(req, res)) return;
  const cfg = exigirCloudinary(res);
  if (!cfg) return;

  const b = req.body || {};
  const categoria = String(b.categoria || '');
  const tipo = String(b.tipo || '');
  if (!CLD_CATEGORIAS.includes(categoria)) return res.status(400).json({ ok: false, error: 'Elige la sección (Mundial o Liga).' });
  if (!CLD_TIPOS.includes(tipo)) return res.status(400).json({ ok: false, error: 'Elige si es camiseta normal, retro o escudo.' });

  const ligaId = categoria === 'liga' ? String(b.ligaId || '').toLowerCase() : '';
  if (categoria === 'liga' && !/^[a-z0-9-]{1,40}$/.test(ligaId)) {
    return res.status(400).json({ ok: false, error: 'Elige la liga.' });
  }

  const equipoNombre = limpiarTextoCloudinary(b.equipoNombre, 60);
  if (!equipoNombre) return res.status(400).json({ ok: false, error: 'Falta el equipo o selección.' });

  const equipoId = /^[a-z0-9-]{1,60}$/i.test(String(b.equipoId || '')) ? String(b.equipoId) : '';
  const variante = tipo === 'normal'
    ? (CLD_VARIANTES.includes(String(b.variante)) ? String(b.variante) : 'otra')
    : '';
  const nombre = tipo === 'escudo' ? '' : limpiarTextoCloudinary(b.nombre, 80);

  const pares = { cat: categoria, liga: ligaId, eqid: equipoId, eq: equipoNombre, tipo, var: variante, nom: nombre };
  const context = Object.entries(pares)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('|');

  const timestamp = Math.floor(Date.now() / 1000);
  const parametros = { context, folder: CLD_CARPETA, tags: CLD_TAG, timestamp };
  const signature = firmarCloudinary(parametros, cfg.apiSecret);

  res.json({
    ok: true,
    cloudName: cfg.cloudName,
    apiKey: cfg.apiKey,
    timestamp,
    signature,
    folder: CLD_CARPETA,
    tags: CLD_TAG,
    context
  });
});

// Admin: avisa de que ya se subieron fotos (refresca la lista de la tienda al momento).
app.post('/api/admin/camisetas/confirmar', (req, res) => {
  if (!comprobarAdmin(req, res)) return;
  cacheCamisetasAdmin = { t: 0, datos: null };
  res.json({ ok: true });
});

// Admin: convertir en ESCUDO una foto que se subió por error como camiseta (sin volver a subirla).
app.post('/api/admin/camisetas/tipo', async (req, res) => {
  if (!comprobarAdmin(req, res)) return;
  const cfg = exigirCloudinary(res);
  if (!cfg) return;

  const id = String(req.body?.id || '');
  if (!id.startsWith(CLD_CARPETA + '/') || id.includes('..') || req.body?.tipo !== 'escudo') {
    return res.status(400).json({ ok: false, error: 'Petición no válida.' });
  }

  try {
    const params = { command: 'add', context: 'tipo=escudo', public_ids: id, timestamp: Math.floor(Date.now() / 1000) };
    const body = new URLSearchParams({ ...params, api_key: cfg.apiKey, signature: firmarCloudinary(params, cfg.apiSecret) });
    const resp = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cfg.cloudName)}/image/context`,
      { method: 'POST', body, signal: AbortSignal.timeout(15000) }
    );
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data?.error?.message || `Cloudinary respondió ${resp.status}`);
    if (Array.isArray(data.public_ids) && !data.public_ids.includes(id)) {
      throw new Error('Cloudinary no encontró esa foto, así que no se cambió nada.');
    }
    cacheCamisetasAdmin = { t: 0, datos: null };
    res.json({ ok: true });
  } catch (error) {
    console.error('[admin/camisetas/tipo] Error:', error.message);
    res.status(502).json({ ok: false, error: 'No se pudo cambiar: ' + error.message });
  }
});

// Admin: borrar una camiseta subida.
app.post('/api/admin/camisetas/borrar', async (req, res) => {
  if (!comprobarAdmin(req, res)) return;
  const cfg = exigirCloudinary(res);
  if (!cfg) return;

  const id = String(req.body?.id || '');
  if (!id.startsWith(CLD_CARPETA + '/') || id.includes('..')) {
    return res.status(400).json({ ok: false, error: 'Identificador no válido.' });
  }

  try {
    const qs = new URLSearchParams();
    qs.append('public_ids[]', id);
    qs.set('invalidate', 'true');
    const resp = await fetch(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cfg.cloudName)}/resources/image/upload?${qs}`,
      { method: 'DELETE', headers: { Authorization: authCloudinary(cfg) }, signal: AbortSignal.timeout(15000) }
    );
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data?.error?.message || `Cloudinary respondió ${resp.status}`);
    cacheCamisetasAdmin = { t: 0, datos: null };
    res.json({ ok: true });
  } catch (error) {
    console.error('[admin/camisetas/borrar] Error:', error.message);
    res.status(502).json({ ok: false, error: 'No se pudo borrar: ' + error.message });
  }
});

// ============================================================
// SALUD Y SEO
// ============================================================

app.get('/api/salud', (req, res) => {
  let escribible = false;
  try {
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
    escribible = true;
  } catch (_) { /* sin permisos de escritura */ }

  res.json({
    ok: true,
    servicio: 'Trakeballer',
    datos: { persistente: ALMACENAMIENTO_PERSISTENTE, escribible, datosEnUpstash: USA_REDIS },
    email: { smtp: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS), remitente: !!process.env.EMAIL_FROM }
  });
});

function urlBase(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const host = req.get('host');
  const proto = /^localhost|^127\./.test(host)
    ? 'http'
    : (req.get('x-forwarded-proto') || 'https').split(',')[0];
  return `${proto}://${host}`;
}

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${urlBase(req)}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${urlBase(req)}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`);
});

// ============================================================
// CHAT DE SOPORTE (mensajes privados cliente <-> tienda)
// - Cada visitante tiene su propia conversación privada. La web guarda en el
//   navegador un código secreto (token) que solo conoce ese visitante.
// - Tú contestas desde trake_admin > pestaña "Mensajes".
// - Los datos van a Upstash (si está configurado) o a soporte.json.
// ============================================================

const SOPORTE_MAX_TEXTO = 1000;
const SOPORTE_MAX_MENSAJES = 300;
const SOPORTE_AVISO_CADA_MS = 15 * 60 * 1000; // como mucho 1 correo cada 15 min por conversación
const SOPORTE_VISTO_MS = 60 * 1000;           // si el cliente miró el chat hace menos de 1 min, no se le escribe por correo
const RE_ID_SOPORTE = /^[a-f0-9]{32}$/;
const RE_EMAIL = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,200}\.[^\s@<>"']{2,}$/;

// Evita que dos mensajes a la vez se pisen al guardar (una sola instancia del servidor).
let colaSoporte = Promise.resolve();
function enSerie(fn) {
  const r = colaSoporte.then(fn);
  colaSoporte = r.catch(() => {});
  return r;
}

// Última vez que cada cliente tuvo el chat abierto (solo en memoria, no hace falta guardarlo).
const SOPORTE_VISTOS = new Map();
setInterval(() => {
  const limite = Date.now() - 60 * 60 * 1000;
  for (const [k, v] of SOPORTE_VISTOS) if (v < limite) SOPORTE_VISTOS.delete(k);
}, 10 * 60 * 1000).unref();

async function leerConversaciones() {
  if (USA_REDIS) return parsearPedidosRedis(await redis(['HGETALL', REDIS_SOPORTE]));
  return leerJSONSeguro(SOPORTE_FILE);
}

async function leerConversacion(id) {
  if (!RE_ID_SOPORTE.test(String(id || ''))) return null;
  if (USA_REDIS) {
    const texto = await redis(['HGET', REDIS_SOPORTE, id]);
    return texto ? JSON.parse(texto) : null;
  }
  return leerJSONSeguro(SOPORTE_FILE).find(c => c.id === id) || null;
}

async function guardarConversacion(conv) {
  if (USA_REDIS) {
    await redis(['HSET', REDIS_SOPORTE, conv.id, JSON.stringify(conv)]);
    return;
  }
  const lista = leerJSONSeguro(SOPORTE_FILE);
  const i = lista.findIndex(c => c.id === conv.id);
  if (i >= 0) lista[i] = conv; else lista.push(conv);
  guardarJSONSeguro(SOPORTE_FILE, lista);
}

async function borrarConversacion(id) {
  if (!RE_ID_SOPORTE.test(String(id || ''))) return false;
  if (USA_REDIS) return (await redis(['HDEL', REDIS_SOPORTE, id])) === 1;
  const lista = leerJSONSeguro(SOPORTE_FILE);
  const resto = lista.filter(c => c.id !== id);
  if (resto.length === lista.length) return false;
  guardarJSONSeguro(SOPORTE_FILE, resto);
  return true;
}

function errorSoporte(status, mensaje) {
  const e = new Error(mensaje);
  e.status = status;
  return e;
}

function responderErrorSoporte(res, error, mensajePorDefecto) {
  if (error && error.status) return res.status(error.status).json({ ok: false, error: error.message });
  console.error('[soporte] Error:', error);
  res.status(500).json({ ok: false, error: mensajePorDefecto });
}

function mensajesPublicos(conv, desde = 0) {
  return (conv.mensajes || [])
    .filter(m => m.ts > desde)
    .map(m => ({ de: m.de, texto: m.texto, ts: m.ts }));
}

function urlWeb() {
  return String(process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL || '').replace(/\/$/, '');
}

// ---------------- Público: el cliente escribe y lee su conversación ----------------

app.post('/api/soporte/mensaje', async (req, res) => {
  try {
    if (superaLimite('soporte:' + req.ip, 30, 10 * 60 * 1000)) {
      return res.status(429).json({ ok: false, error: 'Estás enviando demasiados mensajes. Espera unos minutos.' });
    }

    const texto = String(req.body?.texto ?? '').trim().slice(0, SOPORTE_MAX_TEXTO);
    if (!texto) return res.status(400).json({ ok: false, error: 'Escribe un mensaje.' });

    const token = String(req.get('x-soporte-token') || req.body?.token || '');
    const nombre = String(req.body?.nombre ?? '').trim().slice(0, 60);
    const emailTexto = String(req.body?.email ?? '').trim().slice(0, 120);
    if (emailTexto && !RE_EMAIL.test(emailTexto)) {
      return res.status(400).json({ ok: false, error: 'Ese email no parece válido. Revísalo o déjalo en blanco.' });
    }

    const { conv, nueva, avisar } = await enSerie(async () => {
      let c = await leerConversacion(token);
      let esNueva = false;

      if (!c) {
        if (superaLimite('soporte-nuevo:' + req.ip, 5, 60 * 60 * 1000)) {
          throw errorSoporte(429, 'Has abierto demasiadas conversaciones seguidas. Inténtalo más tarde.');
        }
        c = { id: crypto.randomBytes(16).toString('hex'), creado: new Date().toLocaleString('es-ES'), creadoTs: Date.now(), nombre: '', email: '', noLeidos: 0, mensajes: [] };
        esNueva = true;
      }

      if ((c.mensajes || []).length >= SOPORTE_MAX_MENSAJES) {
        throw errorSoporte(400, 'Esta conversación es muy larga. Escríbenos a ' + EMAIL_TIENDA + '.');
      }

      if (nombre) c.nombre = nombre;
      if (emailTexto) c.email = emailTexto;

      const ahora = Date.now();
      c.mensajes.push({ de: 'cliente', texto, ts: ahora });
      c.ultimoTs = ahora;
      c.noLeidos = (c.noLeidos || 0) + 1;

      const debeAvisar = esNueva || ahora - (c.avisadoTs || 0) > SOPORTE_AVISO_CADA_MS;
      if (debeAvisar) c.avisadoTs = ahora;

      await guardarConversacion(c);
      SOPORTE_VISTOS.set(c.id, ahora);
      return { conv: c, nueva: esNueva, avisar: debeAvisar };
    });

    res.json({ ok: true, token: conv.id, nueva, mensajes: mensajesPublicos(conv) });

    // Aviso por correo a la tienda (en segundo plano: nunca afecta al cliente)
    if (avisar) {
      const quien = conv.nombre || 'Cliente sin nombre';
      const contacto = conv.email ? ` (${conv.email})` : '';
      const enlace = urlWeb() ? `${urlWeb()}/trake_admin.html` : 'trake_admin > Mensajes';
      enviarEmail(
        process.env.EMAIL_TO || EMAIL_TIENDA,
        `💬 Mensaje nuevo de ${quien} - Trakeballer`,
        `${quien}${contacto} te ha escrito en el chat de soporte:\n\n${texto}\n\nResponde desde: ${enlace} (pestaña Mensajes)`,
        '',
        `<p><strong>${escapeHTML(quien)}</strong>${escapeHTML(contacto)} te ha escrito en el chat de soporte:</p>
         <blockquote style="border-left:4px solid #0b1f3a;margin:12px 0;padding:6px 12px;background:#f5f5f5;">${escapeHTML(texto).replace(/\n/g, '<br>')}</blockquote>
         <p>Responde desde <strong>trake_admin → Mensajes</strong>.</p>`
      ).catch(e => console.error('[soporte] Aviso por correo fallido:', e.message));
    }
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudo enviar el mensaje. Inténtalo de nuevo.');
  }
});

app.get('/api/soporte/mensajes', async (req, res) => {
  try {
    if (superaLimite('soporte-leer:' + req.ip, 600, 10 * 60 * 1000)) {
      return res.status(429).json({ ok: false, error: 'Demasiadas consultas.' });
    }

    const token = String(req.get('x-soporte-token') || '');
    const desde = Math.max(0, Number(req.query.desde) || 0);
    const conv = await leerConversacion(token);

    // Si el token no existe (o se borró la conversación) el cliente empezará una nueva.
    if (!conv) return res.json({ ok: true, existe: false, mensajes: [] });

    // Solo anotamos que el cliente está mirando si la ventana está abierta (abierto=1).
    if (req.query.abierto === '1') SOPORTE_VISTOS.set(conv.id, Date.now());

    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, existe: true, mensajes: mensajesPublicos(conv, desde) });
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudieron leer los mensajes.');
  }
});

// ---------------- Admin: bandeja de mensajes ----------------

app.get('/api/admin/soporte', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const lista = (await leerConversaciones())
      .map(c => {
        const ultimo = (c.mensajes || [])[(c.mensajes || []).length - 1] || {};
        return {
          id: c.id,
          nombre: c.nombre || '',
          email: c.email || '',
          creado: c.creado || '',
          ultimoTs: c.ultimoTs || 0,
          noLeidos: c.noLeidos || 0,
          ultimoDe: ultimo.de || '',
          ultimoTexto: String(ultimo.texto || '').slice(0, 90)
        };
      })
      .sort((a, b) => b.ultimoTs - a.ultimoTs);

    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, conversaciones: lista, noLeidos: lista.reduce((s, c) => s + (c.noLeidos > 0 ? 1 : 0), 0) });
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudo leer la bandeja.');
  }
});

app.get('/api/admin/soporte/:id', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const conv = await enSerie(async () => {
      const c = await leerConversacion(req.params.id);
      if (c && c.noLeidos) {
        c.noLeidos = 0;
        await guardarConversacion(c);
      }
      return c;
    });
    if (!conv) return res.status(404).json({ ok: false, error: 'Conversación no encontrada.' });

    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, conversacion: conv });
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudo abrir la conversación.');
  }
});

app.post('/api/admin/soporte/:id/responder', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const texto = String(req.body?.texto ?? '').trim().slice(0, 2000);
    if (!texto) return res.status(400).json({ ok: false, error: 'Escribe la respuesta.' });

    const conv = await enSerie(async () => {
      const c = await leerConversacion(req.params.id);
      if (!c) throw errorSoporte(404, 'Conversación no encontrada (puede que se haya borrado).');
      const ahora = Date.now();
      c.mensajes.push({ de: 'tienda', texto, ts: ahora });
      c.ultimoTs = ahora;
      c.noLeidos = 0;
      await guardarConversacion(c);
      return c;
    });

    // Si el cliente dejó su email y no tiene el chat abierto, se le avisa por correo.
    let correo = { ok: false, motivo: conv.email ? 'el cliente tiene el chat abierto' : 'el cliente no dejó email' };
    const visto = SOPORTE_VISTOS.get(conv.id) || 0;
    if (conv.email && Date.now() - visto > SOPORTE_VISTO_MS) {
      const web = urlWeb();
      correo = await enviarEmail(
        conv.email,
        'Tienes una respuesta de Trakeballer 💬',
        `¡Hola${conv.nombre ? ' ' + conv.nombre : ''}!\n\nTe hemos respondido en el chat de soporte:\n\n${texto}\n\n${web ? 'Puedes seguir la conversación en ' + web + ' (botón de chat, abajo a la izquierda).' : 'Puedes seguir la conversación desde el chat de la web.'}\n\n- Trakeballer`,
        conv.nombre || '',
        `<p>¡Hola${conv.nombre ? ' ' + escapeHTML(conv.nombre) : ''}!</p>
         <p>Te hemos respondido en el chat de soporte:</p>
         <blockquote style="border-left:4px solid #0b1f3a;margin:12px 0;padding:6px 12px;background:#f5f5f5;">${escapeHTML(texto).replace(/\n/g, '<br>')}</blockquote>
         <p>${web ? `Puedes seguir la conversación en <a href="${escapeHTML(web)}">${escapeHTML(web)}</a> (botón de chat, abajo a la izquierda).` : 'Puedes seguir la conversación desde el chat de la web.'}</p>
         <p>- Trakeballer</p>`
      );
    }

    res.json({ ok: true, conversacion: conv, correo });
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudo enviar la respuesta.');
  }
});

app.delete('/api/admin/soporte/:id', async (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;
    const borrada = await enSerie(() => borrarConversacion(req.params.id));
    if (!borrada) return res.status(404).json({ ok: false, error: 'Conversación no encontrada.' });
    res.json({ ok: true });
  } catch (error) {
    responderErrorSoporte(res, error, 'No se pudo borrar la conversación.');
  }
});

// ============================================================
// RUTA PRINCIPAL
// ============================================================

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// INICIAR
// ============================================================

app.listen(PORT, () => {
  migrarARedis();
  console.log(`[datos] Pedidos, sugerencias, reseñas y descuentos: ${USA_REDIS ? 'Upstash Redis' : 'archivo orders.json'}`);
  console.log(`🚀 Trakeballer funcionando en puerto ${PORT}`);
  console.log(`[email] EMAIL_TO: ${process.env.EMAIL_TO || EMAIL_TIENDA}`);
  console.log(`[email] EMAIL_FROM: ${process.env.EMAIL_FROM || 'NO CONFIGURADO'}`);
  console.log(`[email] SMTP: ${process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS ? 'CONFIGURADO (' + process.env.SMTP_HOST + ')' : 'NO CONFIGURADO'}`);

  const URL_PUBLICA = process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_URL;
 
  if (URL_PUBLICA) {
    setInterval(async () => {
      try {
        const r = await fetch(`${URL_PUBLICA}/api/salud`);
        console.log(`[keep-alive] ping ${r.status}`);
      } catch (error) {
        console.warn('[keep-alive] error:', error.message);
      }
    }, 60 * 1000);
 
    console.log(`[keep-alive] Activo: ${URL_PUBLICA}`);
  } else {
    console.log('[keep-alive] Desactivado (no hay RENDER_EXTERNAL_URL)');
  }
});
