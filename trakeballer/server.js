require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const EMAIL_TIENDA = 'trakeballer@gmail.com';

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// ARCHIVOS
// ============================================================

const ORDERS_FILE = path.join(__dirname, 'orders.json');
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, '[]');
}

const SUGERENCIAS_FILE = path.join(__dirname, 'sugerencias.json');
if (!fs.existsSync(SUGERENCIAS_FILE)) {
  fs.writeFileSync(SUGERENCIAS_FILE, '[]');
}

const RESENAS_FILE = path.join(__dirname, 'resenas.json');
if (!fs.existsSync(RESENAS_FILE)) {
  fs.writeFileSync(RESENAS_FILE, '[]');
}

// ============================================================
// FUNCIONES ARCHIVOS
// ============================================================

function leerJSON(archivo) {
  try {
    return JSON.parse(fs.readFileSync(archivo, 'utf8'));
  } catch (error) {
    console.error(`Error leyendo ${archivo}:`, error);
    return [];
  }
}

function guardarPedido(pedido) {
  const pedidos = leerJSON(ORDERS_FILE);
  pedidos.push(pedido);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(pedidos, null, 2), 'utf8');
}

function guardarSugerencia(sugerencia) {
  const sugerencias = leerJSON(SUGERENCIAS_FILE);
  sugerencias.push(sugerencia);
  fs.writeFileSync(SUGERENCIAS_FILE, JSON.stringify(sugerencias, null, 2), 'utf8');
}

function guardarResena(resena) {
  const resenas = leerJSON(RESENAS_FILE);
  resenas.push(resena);
  fs.writeFileSync(RESENAS_FILE, JSON.stringify(resenas, null, 2), 'utf8');
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
// LINEAS DE SUBTOTAL / ENVIO (texto)
// ============================================================

function lineasTotalesTexto(pedido) {
  const total = Number(pedido.total || 0).toFixed(2);

  const subtotal =
    typeof pedido.subtotal === 'number' ? pedido.subtotal.toFixed(2) : null;

  const envio = typeof pedido.envio === 'number' ? pedido.envio : null;

  return (
    (subtotal !== null ? `Subtotal: ${subtotal}€\n` : '') +
    (envio !== null
      ? `Envío: ${envio > 0 ? envio.toFixed(2) + '€' : 'Gratis'}\n`
      : '') +
    `TOTAL: ${total}€`
  );
}

// ============================================================
// CORREO PARA TRAKEBALLER (SOLO LO QUE HA PEDIDO EL CLIENTE)
// ============================================================

function formatearPedidoTexto(pedido) {
  const cabecera =
    pedido.tipo === 'amigo-invisible'
      ? `NUEVO PEDIDO DE AMIGO INVISIBLE #${pedido.id}`
      : `NUEVO PEDIDO #${pedido.id}`;

  return `${cabecera}

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
// CORREO PARA EL CLIENTE (DETALLES + COMO PAGAR)
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
CÓMO PAGAR (ÚNICAMENTE POR PAYPAL)
------------------------------------------
1. Envía ${total}€ por PayPal a:

   ${EMAIL_TIENDA}

2. Envíalo como AMIGOS Y FAMILIARES.

3. NO pongas ningún concepto ni mensaje en el pago.

4. Después, manda el comprobante de pago junto con la captura o el número
   de pedido (#${pedido.id}) a este mismo correo: ${EMAIL_TIENDA}

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
//   esCliente = false -> correo para Trakeballer (solo el pedido)
//   esCliente = true  -> correo para el cliente (pedido + pago PayPal)
// ============================================================

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
      <h3 style="margin-top:0;color:#0070ba;">
        Cómo pagar (únicamente por PayPal)
      </h3>

      <ol style="padding-left:20px;line-height:1.7;">
        <li>Envía <strong>${total}€</strong> por PayPal a:<br>
          <strong style="font-size:17px;">${EMAIL_TIENDA}</strong>
        </li>
        <li>Envíalo como <strong>AMIGOS Y FAMILIARES</strong>.</li>
        <li><strong>NO pongas ningún concepto ni mensaje</strong> en el pago.</li>
        <li>Después, manda el <strong>comprobante de pago</strong> y la captura
          o el número de pedido (<strong>#${pedido.id}</strong>) a este mismo
          correo: <strong>${EMAIL_TIENDA}</strong>
        </li>
      </ol>

      <p style="margin-bottom:0;">
        <strong>El pedido no se tramita hasta que recibamos el pago y el comprobante.</strong>
      </p>
    </div>

    <p style="margin-top:25px;">
      Nos pondremos en contacto contigo para confirmar el pedido. ¡Gracias por tu compra!
    </p>

    <p style="color:#666;font-size:14px;">
      Para cualquier duda sobre tu pedido, escríbenos a
      <strong>${EMAIL_TIENDA}</strong><br>
      - Trakeballer
    </p>
  `;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">

<div style="max-width:650px;margin:auto;background:#ffffff;padding:25px;border-radius:12px;">

  <h2>
    ${esCliente
      ? `¡Hola ${escapeHTML(nombre)}!`
      : `NUEVO PEDIDO #${pedido.id}`}
  </h2>

  ${
    esCliente
      ? `<p>Hemos recibido tu pedido <strong>#${pedido.id}</strong> en Trakeballer. Este es tu justificante.</p>
         <p style="color:#666;font-size:14px;">Fecha: ${escapeHTML(pedido.fecha || '')}</p>`
      : `<p style="color:#666;font-size:14px;">Fecha: ${escapeHTML(pedido.fecha || '')}</p>
         ${bloqueCliente}`
  }

  <h3 style="margin-top:30px;">
    ${esCliente ? 'TU PEDIDO' : 'PEDIDO'}
  </h3>

  ${productosHTML}

  ${
    typeof pedido.subtotal === 'number'
      ? `<p><strong>Subtotal:</strong> ${pedido.subtotal.toFixed(2)}€</p>`
      : ''
  }

  ${
    typeof pedido.envio === 'number'
      ? `<p><strong>Envío:</strong> ${pedido.envio > 0 ? pedido.envio.toFixed(2) + '€' : 'Gratis'}</p>`
      : ''
  }

  <h2>TOTAL: ${total}€</h2>

  ${esCliente ? bloquePaypal : ''}

</div>

</body>
</html>
`;
}

// ============================================================
// BREVO
// ============================================================

async function enviarEmail(destino, asunto, texto, nombreDestino = '', html = '') {
  if (!process.env.BREVO_API_KEY) {
    console.warn('[email] Falta BREVO_API_KEY');

    return { ok: false, motivo: 'BREVO_API_KEY no configurada' };
  }

  if (!process.env.EMAIL_FROM) {
    console.warn('[email] Falta EMAIL_FROM');

    return { ok: false, motivo: 'EMAIL_FROM no configurada' };
  }

  try {
    const respuesta = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',

      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },

      body: JSON.stringify({
        sender: {
          name: 'Trakeballer',
          email: process.env.EMAIL_FROM
        },

        to: [
          {
            email: destino,
            ...(nombreDestino ? { name: nombreDestino } : {})
          }
        ],

        subject: asunto,

        textContent: texto,

        ...(html ? { htmlContent: html } : {})
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.error('[email] Error Brevo:', datos);

      return {
        ok: false,
        motivo: datos.message || 'Error enviando email con Brevo',
        statusCode: respuesta.status
      };
    }

    console.log(`[email] Enviado a ${destino} - ID: ${datos.messageId}`);

    return { ok: true, id: datos.messageId };

  } catch (error) {
    console.error(`[email] Error enviando email a ${destino}:`, error.message);

    return { ok: false, motivo: error.message };
  }
}

// ============================================================
// TWILIO
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
    console.error('Error enviando por Twilio:', error.message);

    return { ok: false, motivo: error.message };
  }
}

// ============================================================
// PEDIDO
// ============================================================

app.post('/api/pedido', async (req, res) => {

  try {

    const pedido = req.body;

    const items = obtenerItems(pedido);

    console.log('[pedido] Artículos recibidos:', items.length);

    if (items.length > 0) {
      console.log('[pedido] Primer artículo:', JSON.stringify(items[0]));
    }

    // VALIDACIÓN

    if (!pedido || items.length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'El pedido no tiene artículos.'
      });
    }

    const esAmigoInvisible = pedido.tipo === 'amigo-invisible';

    if (esAmigoInvisible) {

      if (
        !pedido.cliente ||
        !pedido.cliente.nombre ||
        (!pedido.cliente.telefono && !pedido.cliente.email)
      ) {
        return res.status(400).json({
          ok: false,
          error: 'Faltan datos de contacto.'
        });
      }

    } else {

      if (
        !pedido.cliente ||
        !pedido.cliente.nombre ||
        !pedido.cliente.direccion ||
        !pedido.cliente.telefono
      ) {
        return res.status(400).json({
          ok: false,
          error: 'Faltan datos de contacto.'
        });
      }
    }

    // ID Y FECHA

    pedido.id = Date.now();

    pedido.fecha = new Date().toLocaleString('es-ES');

    // GUARDAR

    guardarPedido(pedido);

    // EMAIL PARA TRAKEBALLER (solo el pedido)

    const textoAdmin = formatearPedidoTexto(pedido);

    const htmlAdmin = crearHTMLPedido(pedido, false);

    const asuntoAdmin = esAmigoInvisible
      ? `Nuevo pedido de amigo invisible #${pedido.id} - ${Number(pedido.total || 0).toFixed(2)}€`
      : `Nuevo pedido #${pedido.id} - ${Number(pedido.total || 0).toFixed(2)}€`;

    // EMAIL PARA EL CLIENTE (detalles + cómo pagar)

    let emailCliente = { ok: false, motivo: 'No enviado' };

    if (pedido.cliente && pedido.cliente.email) {

      const textoCliente = formatearJustificanteCliente(pedido);

      const htmlCliente = crearHTMLPedido(pedido, true);

      emailCliente = await enviarEmail(
        pedido.cliente.email,
        `Tu pedido #${pedido.id} en Trakeballer`,
        textoCliente,
        pedido.cliente.nombre,
        htmlCliente
      );
    }

    // ENVIAR EL DE TRAKEBALLER

    const emailAdmin = await enviarEmail(
      process.env.EMAIL_TO || EMAIL_TIENDA,
      asuntoAdmin,
      textoAdmin,
      '',
      htmlAdmin
    );

    // SMS

    const sms = await avisarPorTwilio(textoAdmin, {
      from: process.env.TWILIO_SMS_FROM,
      to: process.env.TWILIO_SMS_TO
    });

    // WHATSAPP

    const whatsapp = await avisarPorTwilio(textoAdmin, {
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO
    });

    // RESPUESTA

    return res.json({
      ok: true,
      pedidoId: pedido.id,
      avisos: {
        email: emailAdmin,
        justificanteCliente: emailCliente,
        sms,
        whatsapp
      }
    });

  } catch (error) {

    console.error('[pedido] Error:', error);

    return res.status(500).json({
      ok: false,
      error: 'Error interno al procesar el pedido.'
    });
  }
});

// ============================================================
// SUGERENCIAS
// ============================================================

app.post('/api/sugerencia', async (req, res) => {

  try {

    const { mensaje, nombre, email } = req.body || {};

    if (!mensaje || !mensaje.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Cuéntanos qué camiseta te falta.'
      });
    }

    const sugerencia = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      mensaje: mensaje.trim(),
      nombre: nombre?.trim() || '',
      email: email?.trim() || ''
    };

    guardarSugerencia(sugerencia);

    const texto =
`NUEVA SUGERENCIA DE CAMISETA

Fecha:
${sugerencia.fecha}

Nombre:
${sugerencia.nombre || 'No indicado'}

Email:
${sugerencia.email || 'No indicado'}

Mensaje:
${sugerencia.mensaje}`;

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

    res.status(500).json({
      ok: false,
      error: 'Error interno al enviar la sugerencia.'
    });
  }
});

// ============================================================
// RESEÑAS
// ============================================================

app.get('/api/resenas', (req, res) => {

  try {

    const resenas = leerJSON(RESENAS_FILE)
      .filter(r => r.aprobada !== false)
      .sort((a, b) => b.id - a.id);

    res.json({ ok: true, resenas });

  } catch (error) {

    console.error('[resenas] Error:', error);

    res.status(500).json({
      ok: false,
      error: 'Error interno al leer las reseñas.'
    });
  }
});

// ============================================================
// CREAR RESEÑA
// ============================================================

app.post('/api/resena', async (req, res) => {

  try {

    const { nombre, valoracion, mensaje } = req.body || {};

    const estrellas = Math.round(Number(valoracion));

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Cuéntanos tu nombre.'
      });
    }

    if (!estrellas || estrellas < 1 || estrellas > 5) {
      return res.status(400).json({
        ok: false,
        error: 'Elige una valoración de 1 a 5 estrellas.'
      });
    }

    if (!mensaje || !mensaje.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'Cuéntanos tu opinión.'
      });
    }

    const resena = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES'),
      nombre: nombre.trim().slice(0, 80),
      valoracion: estrellas,
      mensaje: mensaje.trim().slice(0, 600),
      aprobada: true
    };

    guardarResena(resena);

    const texto =
`NUEVA RESEÑA EN TRAKEBALLER

Fecha:
${resena.fecha}

Nombre:
${resena.nombre}

Valoración:
${resena.valoracion} / 5 estrellas

Opinión:
${resena.mensaje}`;

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

    res.status(500).json({
      ok: false,
      error: 'Error interno al enviar la reseña.'
    });
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

app.get('/api/pedidos', (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const pedidos = leerJSON(ORDERS_FILE).sort((a, b) => b.id - a.id);

    res.json({ ok: true, pedidos });

  } catch (error) {
    console.error('[pedidos] Error:', error);

    res.status(500).json({
      ok: false,
      error: 'Error interno al leer los pedidos.'
    });
  }
});

app.post('/api/pedidos/:id/listo', (req, res) => {
  try {
    if (!comprobarAdmin(req, res)) return;

    const id = Number(req.params.id);
    const listo = !!(req.body && req.body.listo);

    const pedidos = leerJSON(ORDERS_FILE);
    const pedido = pedidos.find(p => p.id === id);

    if (!pedido) {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado.' });
    }

    pedido.listo = listo;

    fs.writeFileSync(ORDERS_FILE, JSON.stringify(pedidos, null, 2), 'utf8');

    res.json({ ok: true, pedido });

  } catch (error) {
    console.error('[pedidos/listo] Error:', error);

    res.status(500).json({
      ok: false,
      error: 'Error interno al actualizar el pedido.'
    });
  }
});

// ============================================================
// SALUD
// ============================================================

app.get('/api/salud', (req, res) => {
  res.json({ ok: true, servicio: 'Trakeballer' });
});

// ============================================================
// SEO: ROBOTS.TXT Y SITEMAP.XML (para Google)
// ============================================================

function urlBase(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const host = req.get('host');
  const proto = /^localhost|^127\./.test(host)
    ? 'http'
    : (req.get('x-forwarded-proto') || 'https').split(',')[0];
  return `${proto}://${host}`;
}

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(
`User-agent: *
Allow: /

Sitemap: ${urlBase(req)}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${urlBase(req)}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);
});

// ============================================================
// CATÁLOGO PARA LA IA
// ============================================================

const CATALOGO_IA_FILE = path.join(__dirname, 'catalogo_trakeballers_ia.json');

let CATALOGO_IA_TEXTO = '';
try {
  const catalogoIA = JSON.parse(fs.readFileSync(CATALOGO_IA_FILE, 'utf8'));

  CATALOGO_IA_TEXTO = `
CATÁLOGO OFICIAL DE TRAKEBALLER:
${JSON.stringify(catalogoIA, null, 2)}

IMPORTANTE:
- Usa este catálogo como fuente para comprobar si existe un club, selección o camiseta.
- Respeta las instrucciones incluidas en "instrucciones_ia".
- Ignora mayúsculas, minúsculas y acentos al buscar coincidencias.
- No inventes camisetas, temporadas, tallas ni stock.
- Si "tallas_disponibles" está vacío, no confirmes ninguna talla concreta.
`;
} catch (error) {
  console.error('[chat] No se pudo cargar catalogo_trakeballers_ia.json:', error.message);
  CATALOGO_IA_TEXTO = `
CATÁLOGO OFICIAL DE TRAKEBALLER:
No se pudo cargar el archivo de catálogo. No inventes información del catálogo.
`;
}

// ============================================================
// CHAT CON IA (widget de la web)
// ============================================================

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const CHAT_MODEL = 'openai/gpt-oss-120b';

// Edita este texto cuando cambien precios, plazos o condiciones.
// El bot responde SOLO con esta información + sentido común.
const KNOWLEDGE_BASE = `
Eres el asistente virtual de Trakeballer, una tienda online de camisetas de
fútbol personalizadas (actuales y retro), de clubes y selecciones de todo
el mundo (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, MLS, Liga MX,
Brasileirao, Liga Portugal, Eredivisie, liga saudí, J1 League, etc.).

PRODUCTO Y PERSONALIZACIÓN
- Camiseta versión actual: 25€. Versión retro: 30€.
- Se puede elegir versión local, visitante o modelo retro.
- Incluye personalización con nombre y dorsal sin coste extra.
- Se pueden añadir parches opcionales, también sin coste extra.
- Tallas disponibles: XS, S, M, L, XL, XXL, y tallas de niño (8, 10, 12).
- Pedido mínimo: 2 camisetas.

ENVÍO
- Coste de envío: 5€ en pedidos de menos de 6 camisetas.
- Envío gratis a partir de 6 camisetas.
- Plazo de entrega habitual: unos 15 días. En casos puntuales (mucha demanda,
  aduanas, festivos como Navidad, Black Friday o Año Nuevo Chino, o grandes
  torneos como Mundial/Eurocopa/Copa América) puede llegar hasta 20-25 días.

OFERTAS POR CANTIDAD
- 6 camisetas: 135€ normales / 150€ retro (envío gratis incluido).
- 10 camisetas: 200€ normales / 225€ retro.
- 15 camisetas: 250€ normales / 275€ retro.

AMIGO INVISIBLE FUTBOLERO
- Se puede organizar un "amigo invisible" de camisetas para grupos: el
  cliente indica cuántas personas son y cuántas camisetas por talla quieren
  (sin elegir equipo, nombre ni dorsal), y Trakeballer las elige al azar
  y las prepara.

CÓMO SE COMPRA (proceso en 5 pasos)
1. Elegir selección o club en el catálogo.
2. Personalizar: versión actual/retro, talla, nombre, dorsal y parches.
3. Añadir al carrito (se puede repetir para varias camisetas y aprovechar
   descuentos por cantidad).
4. Confirmar el pedido con los datos de envío y contacto.
5. Pagar por PayPal (único método de pago) enviando el importe a
   trakeballer@gmail.com como "Amigos y familiares", SIN poner concepto ni
   mensaje en el pago, y luego enviar el comprobante de pago y el
   número/captura del pedido a ese mismo correo para que preparen el envío.

DEVOLUCIONES
- Al ser productos personalizados (nombre y dorsal a elección del cliente),
  no se admiten devoluciones salvo defecto de fabricación.

CONTACTO Y SUGERENCIAS
- Dudas o incidencias con un pedido: trakeballer@gmail.com.
- Si un cliente busca una camiseta que no está en el catálogo, puede dejar
  una sugerencia en la web (o decírtelo a ti) indicando qué camiseta quiere.

PRIVACIDAD
- Solo se recogen los datos necesarios para el pedido (nombre, dirección,
  teléfono y, si se indica, email). No se comparten con terceros salvo
  obligación legal ni se usan con fines publicitarios.
- La web usa localStorage solo para recordar el carrito en el propio
  navegador del cliente; no hay cookies de publicidad ni de seguimiento.

INSTRUCCIONES PARA TI (el asistente)
- Responde siempre en español, de forma breve, cercana y clara.
- Si te preguntan por un equipo o camiseta concreta que no aparece aquí,
  dile al usuario que lo consulte en el catálogo de la web o que deje una
  sugerencia, y ofrécete a ayudarle con cualquier otra duda (precio, tallas,
  envío, personalización, pago...).
- No inventes plazos, precios ni políticas que no estén en esta información.
- Si preguntan algo que no tiene que ver con la tienda, responde con
  amabilidad y redirige la conversación hacia cómo puedes ayudarles con su
  pedido.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!GROQ_API_KEY) {
      console.error('[chat] ERROR: GROQ_API_KEY no está configurada en Render.');

      return res.status(500).json({
        error: 'Falta configurar GROQ_API_KEY en Render.'
      });
    }

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Formato inválido: se esperaba 'messages'."
      });
    }

    console.log('[chat] Enviando petición a Groq...');
    console.log('[chat] Modelo:', CHAT_MODEL);
    console.log('[chat] Catálogo encontrado:', fs.existsSync(CATALOGO_IA_FILE));

    const respuesta = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`
        },

        body: JSON.stringify({
          model: CHAT_MODEL,

          messages: [
            {
              role: 'system',
              content: KNOWLEDGE_BASE + CATALOGO_IA_TEXTO
            },
            ...messages
          ],

          max_tokens: 500
        })
      }
    );

    // Si Groq devuelve un error
    if (!respuesta.ok) {
      const errText = await respuesta.text();

      console.error('[chat] ERROR DE GROQ');
      console.error('[chat] Status:', respuesta.status);
      console.error('[chat] Respuesta:', errText);

      let detalle = 'Error desconocido de Groq.';

      try {
        const errorGroq = JSON.parse(errText);

        detalle =
          errorGroq?.error?.message ||
          errorGroq?.message ||
          detalle;

      } catch (e) {
        if (errText) {
          detalle = errText.substring(0, 500);
        }
      }

      return res.status(502).json({
        error: 'Error al contactar con la IA.',
        detalle: detalle
      });
    }

    const data = await respuesta.json();

    console.log('[chat] Respuesta recibida correctamente de Groq.');

    if (!data?.choices?.[0]?.message?.content) {
      console.error(
        '[chat] Respuesta inesperada de Groq:',
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: 'La IA devolvió una respuesta inesperada.'
      });
    }

    const reply = data.choices[0].message.content;

    return res.json({
      reply: reply
    });

  } catch (error) {

    console.error('[chat] ERROR INTERNO:', error);

    return res.status(500).json({
      error: 'Error interno del servidor.',
      detalle: error.message
    });
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

  console.log(`🚀 Trakeballer funcionando en puerto ${PORT}`);

  console.log(`[email] EMAIL_TO: ${process.env.EMAIL_TO || EMAIL_TIENDA}`);

  console.log(`[email] EMAIL_FROM: ${process.env.EMAIL_FROM || 'NO CONFIGURADO'}`);

  console.log(`[email] Brevo: ${process.env.BREVO_API_KEY ? 'CONFIGURADO' : 'NO CONFIGURADO'}`);

  // ----------------------------------------------------------
  // MANTENER DESPIERTA LA WEB EN RENDER
  // Render pone RENDER_EXTERNAL_URL solo. Cada minuto la web
  // se llama a sí misma para que no se duerma por inactividad.
  // ----------------------------------------------------------
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
