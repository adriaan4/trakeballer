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

function guardarPedido(pedido) {
  const pedidos = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  pedidos.push(pedido);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(pedidos, null, 2));
}

function formatearPedidoTexto(pedido) {
  const lineas = pedido.items.map((it, i) =>
    `  ${i + 1}. ${it.equipo} (${it.tipo === 'retro' ? 'Retro' : 'Actual'}) - Talla ${it.talla} - Dorsal: ${it.dorsal || '-'} - Nombre: ${it.nombreCamiseta || '-'} - Cant: ${it.cantidad} - ${it.precioUnidad}€/u`
  ).join('\n');

  return `NUEVO PEDIDO #${pedido.id}
Fecha: ${pedido.fecha}

Cliente: ${pedido.cliente.nombre}
Direccion de envio: ${pedido.cliente.direccion}
Telefono de contacto: ${pedido.cliente.telefono}
${pedido.cliente.email ? 'Email: ' + pedido.cliente.email : ''}

Articulos:
${lineas}

TOTAL: ${pedido.total.toFixed(2)}€`;
}

async function avisarPorEmail(texto, asunto) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return { ok: false, motivo: 'no configurado' };
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: asunto,
      text: texto
    });
    return { ok: true };
  } catch (err) {
    console.error('Error enviando email:', err.message);
    return { ok: false, motivo: err.message };
  }
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
    if (!pedido.cliente || !pedido.cliente.nombre || !pedido.cliente.direccion || !pedido.cliente.telefono) {
      return res.status(400).json({ ok: false, error: 'Faltan datos de contacto (nombre, direccion o telefono).' });
    }

    pedido.id = Date.now();
    pedido.fecha = new Date().toLocaleString('es-ES');
    guardarPedido(pedido);

    const texto = formatearPedidoTexto(pedido);

    const resultados = await Promise.all([
      avisarPorEmail(texto, `Nuevo pedido #${pedido.id} - ${pedido.total.toFixed(2)}€`),
      avisarPorTwilio(texto, { from: process.env.TWILIO_SMS_FROM, to: process.env.TWILIO_SMS_TO }),
      avisarPorTwilio(texto, { from: process.env.TWILIO_WHATSAPP_FROM, to: process.env.TWILIO_WHATSAPP_TO })
    ]);

    res.json({
      ok: true,
      pedidoId: pedido.id,
      avisos: {
        email: resultados[0],
        sms: resultados[1],
        whatsapp: resultados[2]
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error interno al procesar el pedido.' });
  }
});

app.get('/api/salud', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Tienda de futbol escuchando en el puerto ${PORT}`);
});
