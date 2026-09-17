# Trakeballer — Tienda de camisetas de fútbol

Tienda online con:
- Sección de **Selecciones** y sección de **Equipos**.
- Personalización de cada camiseta: **nombre (+1€), dorsal (+1€), talla y cantidad**, con versión **actual (25€)** o **retro (30€)**.
- **Amigo invisible**: sorteo entre los participantes que quieras para organizar el regalo de camisetas en grupo.
- Al enviar el pedido, el cliente indica **dirección y teléfono**, y tú (el dueño de la tienda) recibes un **aviso por email, SMS y/o WhatsApp**.

## 1. Probarlo en tu ordenador

Necesitas tener instalado [Node.js](https://nodejs.org) (versión 18 o superior).

```bash
cd trakeballer
npm install
cp .env.example .env
npm start
```

Abre `http://localhost:3000` en el navegador.

Si no configuras nada en `.env`, la tienda funciona igual, pero no se enviará ningún aviso al hacer un pedido (solo se guardará en `orders.json`).

## 2. Configurar los avisos de pedido

Edita el archivo `.env` (créalo copiando `.env.example`):

### Aviso por correo (Gmail)
1. Activa la verificación en dos pasos en tu cuenta de Gmail.
2. Crea una "contraseña de aplicación" en https://myaccount.google.com/apppasswords
3. Rellena en `.env`:
   ```
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=la_contraseña_de_16_letras
   EMAIL_TO=tu_correo@gmail.com
   ```

### Aviso por SMS y WhatsApp (Twilio)
1. Crea una cuenta gratuita en https://www.twilio.com
2. Copia tu `Account SID` y `Auth Token` desde el panel principal.
3. Para SMS: compra/usa un número de Twilio y ponlo en `TWILIO_SMS_FROM`. Pon tu móvil en `TWILIO_SMS_TO` (formato `+34...`).
4. Para WhatsApp: activa el "WhatsApp Sandbox" de Twilio (gratis para pruebas) y sigue sus instrucciones para vincular tu número. Pon el número de Twilio en `TWILIO_WHATSAPP_FROM` con el prefijo `whatsapp:` (ej: `whatsapp:+14155238886`) y el tuyo en `TWILIO_WHATSAPP_TO` (ej: `whatsapp:+34600000000`).

Puedes configurar solo el correo, solo Twilio, o los tres a la vez: la tienda usará todo lo que esté configurado y no fallará por lo que dejes vacío.

## 3. Subir el proyecto a GitHub

```bash
cd trakeballer
git init
git add .
git commit -m "Primera version de la tienda"
```

Crea un repositorio nuevo y vacío en https://github.com/new (por ejemplo, `trakeballer`) y luego:

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/trakeballer.git
git push -u origin main
```

> El archivo `.gitignore` ya excluye `node_modules`, `.env` y `orders.json`, así que nunca subirás tus contraseñas ni pedidos por error.

## 4. Desplegar en Render

1. Entra en https://render.com y crea una cuenta (puedes registrarte con tu cuenta de GitHub).
2. Pulsa **New +** → **Web Service**.
3. Conecta tu repositorio de GitHub `trakeballer`.
4. Configura:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. En la pestaña **Environment**, añade las mismas variables que tienes en tu `.env` (EMAIL_USER, EMAIL_PASS, EMAIL_TO, TWILIO_..., etc.). No subas nunca el archivo `.env` real a GitHub; en Render se configuran ahí directamente.
6. Pulsa **Create Web Service**. Render instalará todo y te dará una URL pública, por ejemplo `https://trakeballer.onrender.com`.

### Dominio propio (opcional)
Si tienes un dominio comprado (Namecheap, GoDaddy, etc.):
1. En Render, dentro de tu servicio, ve a **Settings → Custom Domains** y añade tu dominio.
2. Render te dará un registro CNAME (o A) que debes añadir en el panel de tu proveedor de dominio.
3. Espera unos minutos/horas a que se propague el DNS y Render activará el HTTPS automáticamente.

## 5. Estructura del proyecto

```
trakeballer/
├── server.js            # Backend: recibe pedidos y envía avisos
├── package.json
├── .env.example
├── public/
│   ├── index.html        # Toda la web (selecciones, equipos, ofertas, carrito)
│   ├── css/style.css
│   └── js/app.js         # Catálogo, carrito, personalización, amigo invisible
└── orders.json            # Se crea solo; guarda un histórico local de pedidos
```

## 6. Personalizar el catálogo

Las selecciones están en el array `SELECCIONES` de `public/js/app.js`. Los equipos están agrupados por liga en el array `LIGAS`: cada liga tiene un `id`, `nombre` y una lista `equipos`, y cada equipo tiene `id`, `nombre` y dos colores (`c1`, `c2`) usados para dibujar el icono de la camiseta. Puedes añadir o quitar ligas, equipos o cambiar colores libremente; no hace falta subir imágenes.

Los precios (`PRECIO_ACTUAL` = 25€ y `PRECIO_RETRO` = 30€) y los extras por personalización (`EXTRA_DORSAL` = 1€ y `EXTRA_NOMBRE` = 1€) están en ese mismo archivo, en las primeras líneas.

## Notas

- El pedido se guarda siempre en `orders.json` en el servidor, aunque los avisos por email/SMS/WhatsApp fallen o no estén configurados — así nunca pierdes un pedido.
- Esta versión no incluye pago online (tarjeta, Bizum, etc.): el pedido se cierra por contacto directo con el cliente, tal como se pedía (dirección + teléfono).
