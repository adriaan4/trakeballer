require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const ORDERS_FILE = path.join(__dirname, 'orders.json');
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');

const SUGERENCIAS_FILE = path.join(__dirname, 'sugerencias.json');
if (!fs.existsSync(SUGERENCIAS_FILE)) fs.writeFileSync(SUGERENCIAS_FILE, '[]');

const RESENAS_FILE = path.join(__dirname, 'resenas.json');
if (!fs.existsSync(RESENAS_FILE)) fs.writeFileSync(RESENAS_FILE, '[]');

function guardarPedido(pedido) {
  const pedidos = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  pedidos.push(pedido);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(pedidos, null, 2));
}

function guardarSugerencia(sugerencia) {
  const sugerencias = JSON.parse(fs.readFileSync(SUGERENCIAS_FILE, 'utf8'));
  sugerencias.push(sugerencia);
  fs.writeFileSync(SUGERENCIAS_FILE, JSON.stringify(sugerencias, null, 2));
}

function leerResenas() {
  return JSON.parse(fs.readFileSync(RESENAS_FILE, 'utf8'));
}

function guardarResena(resena) {
  const resenas = leerResenas();
  resenas.push(resena);
  fs.writeFileSync(RESENAS_FILE, JSON.stringify(resenas, null, 2));
  return resenas;
}

function formatearPedidoTexto(pedido) {
  const lineas = pedido.items.map((it, i) =>
    `  ${i + 1}. ${it.equipo} (${it.tipo === 'retro' ? 'Retro' : 'Actual'}) - Talla ${it.talla} - Dorsal: ${it.dorsal || '-'} - Nombre: ${it.nombreCamiseta || '-'}${it.parches && it.parches.length ? ' - Parches: ' + it.parches.join(', ') : ' - Parches: ninguno'} - Cant: ${it.cantidad} - ${it.precioUnidad}€/u`
  ).join('\n');

  const cabecera = pedido.tipo === 'amigo-invisible'
    ? `NUEVO PEDIDO DE AMIGO INVISIBLE #${pedido.id}`
    : `NUEVO PEDIDO #${pedido.id}`;

  return `${cabecera}
Fecha: ${pedido.fecha}

Cliente: ${pedido.cliente.nombre}
Direccion de envio: ${pedido.cliente.direccion}
${pedido.cliente.telefono ? 'Telefono de contacto: ' + pedido.cliente.telefono : ''}
${pedido.cliente.email ? 'Email: ' + pedido.cliente.email : ''}
${pedido.notas ? '\nNotas: ' + pedido.notas + '\n' : ''}
Articulos:
${lineas}
${typeof pedido.envio === 'number' ? `\nSubtotal: ${(pedido.subtotal != null ? pedido.subtotal : pedido.total - pedido.envio).toFixed(2)}€\nEnvio: ${pedido.envio > 0 ? pedido.envio.toFixed(2) + '€' : 'Gratis'}` : ''}
TOTAL: ${pedido.total.toFixed(2)}€`;
}

function formatearJustificanteCliente(pedido) {
  const lineas = pedido.items.map((it, i) =>
    `  ${i + 1}. ${it.equipo} (${it.tipo === 'retro' ? 'Retro' : 'Actual'}) - Talla ${it.talla}${it.dorsal ? ' - Dorsal: ' + it.dorsal : ''}${it.nombreCamiseta ? ' - Nombre: ' + it.nombreCamiseta : ''}${it.parches && it.parches.length ? ' - Parches: ' + it.parches.join(', ') : ''} - Cant: ${it.cantidad} - ${(it.precioUnidad * it.cantidad).toFixed(2)}€`
  ).join('\n');

  return `¡Hola ${pedido.cliente.nombre}!

Hemos recibido tu pedido #${pedido.id} en Trakeballer. Este es tu justificante:

Fecha: ${pedido.fecha}

Articulos:
${lineas}
${typeof pedido.envio === 'number' ? `\nSubtotal: ${(pedido.subtotal != null ? pedido.subtotal : pedido.total - pedido.envio).toFixed(2)}€\nEnvio: ${pedido.envio > 0 ? pedido.envio.toFixed(2) + '€' : 'Gratis'}` : ''}
TOTAL: ${pedido.total.toFixed(2)}€

------------------------------------------
PAGO: UNICAMENTE POR PAYPAL
------------------------------------------
Recuerda enviar el dinero (${pedido.total.toFixed(2)}€) por PayPal a:

  trakeballer@gmail.com

IMPORTANTE: al enviar el dinero NO pongas ningun concepto ni mensaje.

Despues, manda el comprobante de pago y la captura o el numero de pedido
(#${pedido.id}) a ese mismo correo: trakeballer@gmail.com

El pedido no se tramita hasta que recibamos el pago y el comprobante.
------------------------------------------

Nos pondremos en contacto contigo para confirmar el pedido. ¡Gracias por tu compra!

Para cualquier duda sobre tu pedido, escribenos a trakeballer@gmail.com
- Trakeballer`;
}

function crearTransporter() {
  const nodemailer = require('nodemailer');

  // Si defines EMAIL_HOST, se usa un servidor SMTP a medida (Brevo, Mailgun, un hosting propio, etc.).
  // Si no, se usa el modo "service" de nodemailer, pensado para Gmail con contraseña de aplicación.
  return process.env.EMAIL_HOST
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true', // true para el puerto 465, false para 587/25
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      })
    : nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
}

async function enviarEmail(destino, asunto, texto) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[email] No enviado: faltan EMAIL_USER y/o EMAIL_PASS en las variables de entorno.');
    return { ok: false, motivo: 'no configurado' };
  }
  try {
    const transporter = crearTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: destino,
      subject: asunto,
      text: texto
    });
    console.log(`[email] Enviado a ${destino}`);
    return { ok: true };
  } catch (err) {
    console.error(`[email] Error enviando email a ${destino}:`, err.message);
    return { ok: false, motivo: err.message };
  }
}

async function avisarPorEmail(texto, asunto) {
  return enviarEmail(process.env.EMAIL_TO || 'garrogarrez@gmail.com', asunto, texto);
}

async function enviarJustificanteCliente(pedido) {
  if (!pedido.cliente.email) return { ok: false, motivo: 'cliente sin email' };
  const texto = formatearJustificanteCliente(pedido);
  return enviarEmail(pedido.cliente.email, `Tu pedido #${pedido.id} en Trakeballer`, texto);
}

async function avisarPorTwilio(texto, { from, to }) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !from || !to) {
    return { ok: false, motivo: 'no configurado' };
  }
  try {
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({ body: texto, from, to });
    return { ok: true };
  } catch (err) {
    console.error('Error enviando por Twilio:', err.message);
    return { ok: false, motivo: err.message };
  }
}

app.post('/api/pedido', async (req, res) => {
  try {
    const pedido = req.body;

    if (!pedido || !Array.isArray(pedido.items) || pedido.items.length === 0) {
      return res.status(400).json({ ok: false, error: 'El pedido no tiene articulos.' });
    }

    const esAmigoInvisible = pedido.tipo === 'amigo-invisible';

    if (esAmigoInvisible) {
      if (!pedido.cliente || !pedido.cliente.nombre || (!pedido.cliente.telefono && !pedido.cliente.email)) {
        return res.status(400).json({ ok: false, error: 'Faltan datos de contacto (nombre y telefono o email).' });
      }
    } else if (!pedido.cliente || !pedido.cliente.nombre || !pedido.cliente.direccion || !pedido.cliente.telefono) {
      return res.status(400).json({ ok: false, error: 'Faltan datos de contacto (nombre, direccion o telefono).' });
    }

    pedido.id = Date.now();
    pedido.fecha = new Date().toLocaleString('es-ES');
    guardarPedido(pedido);

    const texto = formatearPedidoTexto(pedido);
    const asunto = esAmigoInvisible
      ? `Nuevo pedido de amigo invisible #${pedido.id} - ${pedido.total.toFixed(2)}€`
      : `Nuevo pedido #${pedido.id} - ${pedido.total.toFixed(2)}€`;

    const resultados = await Promise.all([
      avisarPorEmail(texto, asunto),
      enviarJustificanteCliente(pedido),
      avisarPorTwilio(texto, { from: process.env.TWILIO_SMS_FROM, to: process.env.TWILIO_SMS_TO }),
      avisarPorTwilio(texto, { from: process.env.TWILIO_WHATSAPP_FROM, to: process.env.TWILIO_WHATSAPP_TO })
    ]);

    res.json({
      ok: true,
      pedidoId: pedido.id,
      avisos: {
        email: resultados[0],
        justificanteCliente: resultados[1],
        sms: resultados[2],
        whatsapp: resultados[3]
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error interno al procesar el pedido.' });
  }
});

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
      nombre: nombre && nombre.trim() ? nombre.trim() : '',
      email: email && email.trim() ? email.trim() : ''
    };
    guardarSugerencia(sugerencia);

    const texto = `NUEVA SUGERENCIA DE CAMISETA
Fecha: ${sugerencia.fecha}
${sugerencia.nombre ? 'Nombre: ' + sugerencia.nombre + '\n' : ''}${sugerencia.email ? 'Email: ' + sugerencia.email + '\n' : ''}
Mensaje:
${sugerencia.mensaje}`;

    const resultado = await avisarPorEmail(texto, 'Sugerencia de camiseta en Trakeballer');

    res.json({ ok: true, aviso: resultado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error interno al enviar la sugerencia.' });
  }
});

app.get('/api/resenas', (req, res) => {
  try {
    const resenas = leerResenas()
      .filter(r => r.aprobada !== false)
      .sort((a, b) => b.id - a.id);
    res.json({ ok: true, resenas });
  } catch (err) {
    console.error(err);
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
    guardarResena(resena);

    const texto = `NUEVA RESEÑA EN TRAKEBALLER
Fecha: ${resena.fecha}
Nombre: ${resena.nombre}
Valoración: ${resena.valoracion} / 5 estrellas

Opinión:
${resena.mensaje}`;

    const resultado = await avisarPorEmail(texto, `Nueva reseña (${resena.valoracion}★) de ${resena.nombre} - Trakeballer`);

    res.json({ ok: true, resena, aviso: resultado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error interno al enviar la reseña.' });
  }
});

app.get('/api/salud', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Tienda de futbol escuchando en el puerto ${PORT}`);
});
