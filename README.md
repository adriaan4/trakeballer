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

## 4. Despliegue en Suga

La tienda está publicada en Suga: https://kzgklji1u038-production-0phliq16.europe-west1.suga.run/

- El servicio se despliega desde el repositorio de GitHub `trakeballer`: cada vez que subes cambios a `main`, hay que esperar a que termine el despliegue.
- Arranque: `npm start` (el proyecto incluye un `Dockerfile` en la raíz).
- Las variables de entorno (las mismas de tu `.env`: SMTP_*, EMAIL_FROM, EMAIL_TO, CLOUDINARY_URL, UPSTASH_*, ADMIN_*, etc.) se configuran en el panel de Suga, nunca en GitHub.
- Opcional: `SITE_URL` con la dirección pública de la web (si cambia, por ejemplo con un dominio propio). Por defecto se usa la dirección de Suga de arriba.

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

## Dónde se guardan los pedidos y los códigos de descuento

Los pedidos (panel `/trake_admin.html`) y los códigos (`/admin-descuentos.html`) se guardan en
`orders.json` y `descuentos.json` dentro de la carpeta de datos:

- Si existe la variable `DATA_DIR`, se usa esa carpeta.
- Si no, y existe `/var/data` y se puede escribir, se usa esa.
- Si no, se usa la carpeta del código, que **se borra en cada redespliegue**. En ese caso los dos paneles
  muestran un aviso en rojo.

Para que no se pierdan nunca: usa almacenamiento persistente en Suga (y pon su ruta en `DATA_DIR`) o configura Upstash.
Cada guardado es atómico y deja una copia `.bak` por si el archivo se corrompe.

## 6. Seguimiento de envíos y chat de soporte

**Código de seguimiento** (trake_admin → Pedidos): en cada pedido hay un apartado "Código de seguimiento".
Eliges el transportista, pegas el código y pulsas *Guardar y avisar al cliente por correo*: el cliente recibe un
email con el código y un botón para seguir el envío (si el pedido no tiene email, se guarda sin avisar).
Se puede reenviar el correo, cambiar el código o quitarlo.

**Chat de soporte** (reemplaza al asistente con IA, que ya no existe; `GROQ_API_KEY` ya no hace falta):
- En la web, el botón 💬 abre un chat privado: cada visitante solo ve su propia conversación (la identifica un código
  secreto guardado en su navegador). Puede dejar nombre y email de forma opcional.
- En trake_admin → pestaña **Mensajes** ves todas las conversaciones, con contador de sin leer, y respondes.
- Te llega un correo (a `EMAIL_TO`) cuando alguien escribe (como mucho uno cada 15 min por conversación).
- Si el cliente dejó su email y no tiene el chat abierto, tu respuesta también le llega por correo.
- Se guarda en Upstash (si está configurado) o en `soporte.json` dentro de `DATA_DIR` (necesita almacenamiento persistente, como los pedidos).
- Variable opcional `SITE_URL` (p. ej. `https://tutienda.com`) para los enlaces de los correos.

## 7. Imágenes

Las imágenes de la tienda están en formato **WebP**, excepto: los SVG, el logo (`img/marca/*.png`) y los escudos de
Mundiales (`img/escudos/mundial/*.jpg`), que se han dejado en su formato original. La carpeta `public/camis`
(descargas de proveedores) se ha eliminado del proyecto.
