/* =========================================================
   DATOS DEL CATÁLOGO
   Colores aproximados de las equipaciones habituales.
   Puedes ampliar/editar libremente esta lista.
========================================================= */
const SELECCIONES = [
  { id: 'sel-espana', nombre: 'España', c1: '#C60B1E', c2: '#FFC400' },
  { id: 'sel-argentina', nombre: 'Argentina', c1: '#75AADB', c2: '#FFFFFF' },
  { id: 'sel-brasil', nombre: 'Brasil', c1: '#FFDF00', c2: '#009739' },
  { id: 'sel-francia', nombre: 'Francia', c1: '#0055A4', c2: '#FFFFFF' },
  { id: 'sel-alemania', nombre: 'Alemania', c1: '#FFFFFF', c2: '#1A1A1A' },
  { id: 'sel-italia', nombre: 'Italia', c1: '#0066CC', c2: '#FFFFFF' },
  { id: 'sel-portugal', nombre: 'Portugal', c1: '#C8102E', c2: '#046A38' },
  { id: 'sel-inglaterra', nombre: 'Inglaterra', c1: '#FFFFFF', c2: '#1E2A5E' },
  { id: 'sel-holanda', nombre: 'Países Bajos', c1: '#F36C21', c2: '#1E2A5E' },
  { id: 'sel-croacia', nombre: 'Croacia', c1: '#FFFFFF', c2: '#C60B1E' },
  { id: 'sel-uruguay', nombre: 'Uruguay', c1: '#75AADB', c2: '#1A1A1A' },
  { id: 'sel-mexico', nombre: 'México', c1: '#006341', c2: '#FFFFFF' },
  { id: 'sel-marruecos', nombre: 'Marruecos', c1: '#C1272D', c2: '#006233' },
  { id: 'sel-japon', nombre: 'Japón', c1: '#1E2A5E', c2: '#FFFFFF' },
];

const LIGAS = [
  {
    id: 'premier-league',
    nombre: 'Premier League',
    equipos: [
      { id: 'pl-manutd', nombre: 'Manchester United', c1: '#DA291C', c2: '#1A1A1A' },
      { id: 'pl-mancity', nombre: 'Manchester City', c1: '#6CABDD', c2: '#FFFFFF' },
      { id: 'pl-liverpool', nombre: 'Liverpool', c1: '#C8102E', c2: '#FFFFFF' },
      { id: 'pl-chelsea', nombre: 'Chelsea', c1: '#034694', c2: '#FFFFFF' },
      { id: 'pl-arsenal', nombre: 'Arsenal', c1: '#EF0107', c2: '#FFFFFF' },
      { id: 'pl-tottenham', nombre: 'Tottenham Hotspur', c1: '#132257', c2: '#FFFFFF' },
      { id: 'pl-newcastle', nombre: 'Newcastle United', c1: '#1A1A1A', c2: '#FFFFFF' },
      { id: 'pl-astonvilla', nombre: 'Aston Villa', c1: '#95BFE5', c2: '#670E36' },
    ],
  },
  {
    id: 'laliga',
    nombre: 'Spanish La Liga',
    equipos: [
      { id: 'll-realmadrid', nombre: 'Real Madrid', c1: '#FFFFFF', c2: '#F2B705' },
      { id: 'll-barcelona', nombre: 'FC Barcelona', c1: '#004D98', c2: '#A50044' },
      { id: 'll-atletico', nombre: 'Atlético de Madrid', c1: '#C60B1E', c2: '#1E2A5E' },
      { id: 'll-sevilla', nombre: 'Sevilla FC', c1: '#FFFFFF', c2: '#D2001C' },
      { id: 'll-realsociedad', nombre: 'Real Sociedad', c1: '#004C9F', c2: '#FFFFFF' },
      { id: 'll-betis', nombre: 'Real Betis', c1: '#00954C', c2: '#FFFFFF' },
      { id: 'll-athletic', nombre: 'Athletic Club', c1: '#EE2523', c2: '#FFFFFF' },
      { id: 'll-valencia', nombre: 'Valencia CF', c1: '#FFFFFF', c2: '#EE7203' },
    ],
  },
  {
    id: 'serie-a',
    nombre: 'Serie A',
    equipos: [
      { id: 'sa-juventus', nombre: 'Juventus', c1: '#FFFFFF', c2: '#1A1A1A' },
      { id: 'sa-milan', nombre: 'AC Milan', c1: '#FB090B', c2: '#1A1A1A' },
      { id: 'sa-inter', nombre: 'Inter de Milán', c1: '#004A9F', c2: '#1A1A1A' },
      { id: 'sa-napoli', nombre: 'Napoli', c1: '#12A0D7', c2: '#FFFFFF' },
      { id: 'sa-roma', nombre: 'AS Roma', c1: '#8E1F2F', c2: '#F0BC42' },
      { id: 'sa-lazio', nombre: 'Lazio', c1: '#A0D8EF', c2: '#FFFFFF' },
      { id: 'sa-fiorentina', nombre: 'Fiorentina', c1: '#6F2DA8', c2: '#FFFFFF' },
      { id: 'sa-atalanta', nombre: 'Atalanta', c1: '#1A1A1A', c2: '#0066B2' },
    ],
  },
  {
    id: 'bundesliga',
    nombre: 'Bundesliga',
    equipos: [
      { id: 'bl-bayern', nombre: 'Bayern de Múnich', c1: '#DC052D', c2: '#0066B2' },
      { id: 'bl-dortmund', nombre: 'Borussia Dortmund', c1: '#FDE100', c2: '#1A1A1A' },
      { id: 'bl-leipzig', nombre: 'RB Leipzig', c1: '#FFFFFF', c2: '#DA291C' },
      { id: 'bl-leverkusen', nombre: 'Bayer Leverkusen', c1: '#E32219', c2: '#1A1A1A' },
      { id: 'bl-frankfurt', nombre: 'Eintracht Frankfurt', c1: '#1A1A1A', c2: '#E1000F' },
      { id: 'bl-gladbach', nombre: 'Borussia Mönchengladbach', c1: '#1A1A1A', c2: '#FFFFFF' },
      { id: 'bl-stuttgart', nombre: 'VfB Stuttgart', c1: '#FFFFFF', c2: '#E32219' },
      { id: 'bl-wolfsburg', nombre: 'VfL Wolfsburg', c1: '#65B32E', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'ligue-1',
    nombre: 'Ligue 1',
    equipos: [
      { id: 'l1-psg', nombre: 'Paris Saint-Germain', c1: '#004170', c2: '#DA291C' },
      { id: 'l1-marsella', nombre: 'Olympique de Marsella', c1: '#3399FF', c2: '#FFFFFF' },
      { id: 'l1-lyon', nombre: 'Olympique de Lyon', c1: '#DA291C', c2: '#00285E' },
      { id: 'l1-monaco', nombre: 'AS Mónaco', c1: '#E30613', c2: '#FFFFFF' },
      { id: 'l1-lille', nombre: 'LOSC Lille', c1: '#C8102E', c2: '#FFFFFF' },
      { id: 'l1-nice', nombre: 'OGC Nice', c1: '#C8102E', c2: '#1A1A1A' },
      { id: 'l1-rennes', nombre: 'Stade Rennais', c1: '#E30613', c2: '#1A1A1A' },
      { id: 'l1-lens', nombre: 'RC Lens', c1: '#C8102E', c2: '#FFD700' },
    ],
  },
  {
    id: 'brasileirao',
    nombre: 'Campeonato Brasileiro Série A',
    equipos: [
      { id: 'br-flamengo', nombre: 'Flamengo', c1: '#C60C30', c2: '#1A1A1A' },
      { id: 'br-palmeiras', nombre: 'Palmeiras', c1: '#006437', c2: '#FFFFFF' },
      { id: 'br-corinthians', nombre: 'Corinthians', c1: '#FFFFFF', c2: '#1A1A1A' },
      { id: 'br-saopaulo', nombre: 'São Paulo', c1: '#FFFFFF', c2: '#C60C30' },
      { id: 'br-santos', nombre: 'Santos', c1: '#FFFFFF', c2: '#1A1A1A' },
      { id: 'br-gremio', nombre: 'Grêmio', c1: '#0033A0', c2: '#1A1A1A' },
      { id: 'br-internacional', nombre: 'Internacional', c1: '#C60C30', c2: '#FFFFFF' },
      { id: 'br-fluminense', nombre: 'Fluminense', c1: '#7A1E3C', c2: '#006437' },
    ],
  },
  {
    id: 'efl-championship',
    nombre: 'EFL Championship',
    equipos: [
      { id: 'ch-leeds', nombre: 'Leeds United', c1: '#FFFFFF', c2: '#1D428A' },
      { id: 'ch-leicester', nombre: 'Leicester City', c1: '#003090', c2: '#FDBE11' },
      { id: 'ch-southampton', nombre: 'Southampton', c1: '#D71920', c2: '#FFFFFF' },
      { id: 'ch-norwich', nombre: 'Norwich City', c1: '#FFF200', c2: '#00A650' },
      { id: 'ch-westbrom', nombre: 'West Bromwich Albion', c1: '#122F67', c2: '#FFFFFF' },
      { id: 'ch-sunderland', nombre: 'Sunderland', c1: '#EB172B', c2: '#FFFFFF' },
      { id: 'ch-middlesbrough', nombre: 'Middlesbrough', c1: '#E03A3E', c2: '#FFFFFF' },
      { id: 'ch-sheffieldunited', nombre: 'Sheffield United', c1: '#EE2737', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'laliga2',
    nombre: 'La Liga 2',
    equipos: [
      { id: 'l2-racing', nombre: 'Racing de Santander', c1: '#00994D', c2: '#FFFFFF' },
      { id: 'l2-zaragoza', nombre: 'Real Zaragoza', c1: '#FFFFFF', c2: '#004C9F' },
      { id: 'l2-sporting', nombre: 'Sporting de Gijón', c1: '#EE2523', c2: '#FFFFFF' },
      { id: 'l2-eibar', nombre: 'SD Eibar', c1: '#004C9F', c2: '#6F2DA8' },
      { id: 'l2-almeria', nombre: 'UD Almería', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'l2-albacete', nombre: 'Albacete Balompié', c1: '#FFFFFF', c2: '#004C9F' },
      { id: 'l2-levante', nombre: 'Levante UD', c1: '#004C9F', c2: '#D2001C' },
      { id: 'l2-mirandes', nombre: 'CD Mirandés', c1: '#D2001C', c2: '#1A1A1A' },
    ],
  },
  {
    id: 'mls',
    nombre: 'MLS',
    equipos: [
      { id: 'mls-lagalaxy', nombre: 'LA Galaxy', c1: '#00245D', c2: '#FDB927' },
      { id: 'mls-intermiami', nombre: 'Inter Miami', c1: '#F7B5CD', c2: '#1A1A1A' },
      { id: 'mls-seattle', nombre: 'Seattle Sounders', c1: '#5D9741', c2: '#1A1A1A' },
      { id: 'mls-atlanta', nombre: 'Atlanta United', c1: '#80000A', c2: '#A29061' },
      { id: 'mls-lafc', nombre: 'LAFC', c1: '#1A1A1A', c2: '#C39E6D' },
      { id: 'mls-nycfc', nombre: 'New York City FC', c1: '#6CABDD', c2: '#F15A22' },
      { id: 'mls-columbus', nombre: 'Columbus Crew', c1: '#FFF200', c2: '#1A1A1A' },
      { id: 'mls-orlando', nombre: 'Orlando City', c1: '#633492', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'j1-league',
    nombre: 'J1 League',
    equipos: [
      { id: 'j1-kashima', nombre: 'Kashima Antlers', c1: '#C8102E', c2: '#1A1A1A' },
      { id: 'j1-urawa', nombre: 'Urawa Red Diamonds', c1: '#C8102E', c2: '#FFFFFF' },
      { id: 'j1-yokohama', nombre: 'Yokohama F. Marinos', c1: '#0057A8', c2: '#FFFFFF' },
      { id: 'j1-vissel', nombre: 'Vissel Kobe', c1: '#8B1E3F', c2: '#FFFFFF' },
      { id: 'j1-kawasaki', nombre: 'Kawasaki Frontale', c1: '#0057A8', c2: '#1A1A1A' },
      { id: 'j1-gamba', nombre: 'Gamba Osaka', c1: '#0057A8', c2: '#1A1A1A' },
      { id: 'j1-cerezo', nombre: 'Cerezo Osaka', c1: '#EE619C', c2: '#1A1A1A' },
      { id: 'j1-fctokyo', nombre: 'FC Tokyo', c1: '#1A2E6B', c2: '#D2001C' },
    ],
  },
  {
    id: 'liga-mx',
    nombre: 'Liga MX',
    equipos: [
      { id: 'mx-america', nombre: 'Club América', c1: '#FFD200', c2: '#0033A0' },
      { id: 'mx-chivas', nombre: 'Chivas Guadalajara', c1: '#D2001C', c2: '#0033A0' },
      { id: 'mx-cruzazul', nombre: 'Cruz Azul', c1: '#0033A0', c2: '#FFFFFF' },
      { id: 'mx-pumas', nombre: 'Pumas UNAM', c1: '#003D7C', c2: '#FDB927' },
      { id: 'mx-monterrey', nombre: 'Monterrey', c1: '#003DA5', c2: '#FFFFFF' },
      { id: 'mx-tigres', nombre: 'Tigres UANL', c1: '#F4A400', c2: '#1A1A1A' },
      { id: 'mx-toluca', nombre: 'Toluca', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'mx-santoslaguna', nombre: 'Santos Laguna', c1: '#00954C', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'argentina-lpf',
    nombre: 'Argentina LPF League',
    equipos: [
      { id: 'ar-boca', nombre: 'Boca Juniors', c1: '#003DA5', c2: '#FDB927' },
      { id: 'ar-river', nombre: 'River Plate', c1: '#FFFFFF', c2: '#D2001C' },
      { id: 'ar-racing', nombre: 'Racing Club', c1: '#75AADB', c2: '#FFFFFF' },
      { id: 'ar-independiente', nombre: 'Independiente', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'ar-sanlorenzo', nombre: 'San Lorenzo', c1: '#003DA5', c2: '#D2001C' },
      { id: 'ar-velez', nombre: 'Vélez Sarsfield', c1: '#FFFFFF', c2: '#003DA5' },
      { id: 'ar-estudiantes', nombre: 'Estudiantes de La Plata', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'ar-talleres', nombre: 'Talleres', c1: '#003DA5', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'liga-portugal',
    nombre: 'Liga Portugal',
    equipos: [
      { id: 'pt-benfica', nombre: 'Benfica', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'pt-porto', nombre: 'FC Porto', c1: '#003DA5', c2: '#FFFFFF' },
      { id: 'pt-sporting', nombre: 'Sporting CP', c1: '#00954C', c2: '#FFFFFF' },
      { id: 'pt-braga', nombre: 'SC Braga', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'pt-guimaraes', nombre: 'Vitória de Guimarães', c1: '#FFFFFF', c2: '#1A1A1A' },
      { id: 'pt-boavista', nombre: 'Boavista', c1: '#1A1A1A', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'eredivisie',
    nombre: 'Dutch Eredivisie',
    equipos: [
      { id: 'nl-ajax', nombre: 'Ajax', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'nl-psv', nombre: 'PSV Eindhoven', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'nl-feyenoord', nombre: 'Feyenoord', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'nl-az', nombre: 'AZ Alkmaar', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'nl-utrecht', nombre: 'FC Utrecht', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'nl-twente', nombre: 'FC Twente', c1: '#D2001C', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'saudi-league',
    nombre: 'Saudi Arabian League',
    equipos: [
      { id: 'sau-alhilal', nombre: 'Al Hilal', c1: '#003DA5', c2: '#FFFFFF' },
      { id: 'sau-alnassr', nombre: 'Al Nassr', c1: '#FDE100', c2: '#003DA5' },
      { id: 'sau-alittihad', nombre: 'Al Ittihad', c1: '#1A1A1A', c2: '#C39E6D' },
      { id: 'sau-alahli', nombre: 'Al Ahli', c1: '#00954C', c2: '#FFFFFF' },
      { id: 'sau-alshabab', nombre: 'Al Shabab', c1: '#FFFFFF', c2: '#1A1A1A' },
      { id: 'sau-alettifaq', nombre: 'Al Ettifaq', c1: '#1A1A1A', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'serie-b',
    nombre: 'Serie B',
    equipos: [
      { id: 'sb-parma', nombre: 'Parma', c1: '#FDE100', c2: '#003DA5' },
      { id: 'sb-palermo', nombre: 'Palermo', c1: '#F7A8C4', c2: '#1A1A1A' },
      { id: 'sb-bari', nombre: 'Bari', c1: '#FFFFFF', c2: '#D2001C' },
      { id: 'sb-sampdoria', nombre: 'Sampdoria', c1: '#0057A8', c2: '#FFFFFF' },
      { id: 'sb-venezia', nombre: 'Venezia', c1: '#1A1A1A', c2: '#00954C' },
      { id: 'sb-cremonese', nombre: 'Cremonese', c1: '#9B9B9B', c2: '#D2001C' },
    ],
  },
  {
    id: '2-bundesliga',
    nombre: '2. Bundesliga',
    equipos: [
      { id: 'b2-hamburgo', nombre: 'Hamburger SV', c1: '#0057A8', c2: '#FFFFFF' },
      { id: 'b2-dusseldorf', nombre: 'Fortuna Düsseldorf', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'b2-nuremberg', nombre: 'FC Nürnberg', c1: '#D2001C', c2: '#FFFFFF' },
      { id: 'b2-hertha', nombre: 'Hertha BSC', c1: '#0057A8', c2: '#FFFFFF' },
      { id: 'b2-stpauli', nombre: 'FC St. Pauli', c1: '#5C3A21', c2: '#FFFFFF' },
      { id: 'b2-karlsruher', nombre: 'Karlsruher SC', c1: '#0057A8', c2: '#FFFFFF' },
    ],
  },
  {
    id: 'ligue-2',
    nombre: 'Ligue 2',
    equipos: [
      { id: 'lg2-metz', nombre: 'FC Metz', c1: '#7A1E3C', c2: '#FFFFFF' },
      { id: 'lg2-guingamp', nombre: 'En Avant Guingamp', c1: '#D2001C', c2: '#1A1A1A' },
      { id: 'lg2-amiens', nombre: 'Amiens SC', c1: '#6CABDD', c2: '#FFFFFF' },
      { id: 'lg2-bastia', nombre: 'SC Bastia', c1: '#003DA5', c2: '#FFFFFF' },
      { id: 'lg2-grenoble', nombre: 'Grenoble Foot 38', c1: '#D2001C', c2: '#003DA5' },
      { id: 'lg2-parisfc', nombre: 'Paris FC', c1: '#003DA5', c2: '#D2001C' },
    ],
  },
];

const PRECIO_ACTUAL = 25;
const PRECIO_RETRO = 30;

/* =========================================================
   SVG de camiseta simple, coloreado con los colores del equipo
========================================================= */
function svgCamiseta(c1, c2, claseExtra) {
  return `
  <svg class="${claseExtra}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 8 L10 22 L18 38 L28 32 L28 92 L72 92 L72 32 L82 38 L90 22 L70 8
             C70 8 64 16 50 16 C36 16 30 8 30 8 Z"
          fill="${c1}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5"/>
    <path d="M30 8 C30 8 36 16 50 16 C64 16 70 8 70 8 L64 4 C64 4 58 12 50 12 C42 12 36 4 36 4 Z"
          fill="${c2}"/>
    <rect x="46" y="30" width="8" height="44" fill="${c2}" opacity="0.55"/>
  </svg>`;
}

/* =========================================================
   ESTADO
========================================================= */
let carrito = JSON.parse(localStorage.getItem('carritoFutbol') || '[]');
let productoActivo = null;
let tipoActivo = 'actual';
let amigos = [];
let sorteoAmigo = null; // { "Nombre": "NombreAsignado", ... }
let ligaActiva = LIGAS[0].id;

function guardarCarrito() {
  localStorage.setItem('carritoFutbol', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/* =========================================================
   RENDER CATÁLOGO
========================================================= */
function renderGrid(lista, contenedorId, categoria) {
  const cont = document.getElementById(contenedorId);
  cont.innerHTML = lista.map(p => `
    <div class="tarjeta" data-id="${p.id}" data-categoria="${categoria}">
      <div class="tarjeta__top" style="background:${p.c1}"></div>
      <div class="tarjeta__visual">${svgCamiseta(p.c1, p.c2, 'mini-camiseta')}</div>
      <div class="tarjeta__cuerpo">
        <h4>${p.nombre}</h4>
        <p class="tarjeta__precio">Desde ${PRECIO_ACTUAL}€</p>
      </div>
    </div>
  `).join('');

  cont.querySelectorAll('.tarjeta').forEach(el => {
    el.addEventListener('click', () => {
      const producto = lista.find(p => p.id === el.dataset.id);
      abrirModalProducto(producto, categoria);
    });
  });
}

renderGrid(SELECCIONES, 'gridSelecciones', 'Selección');

/* =========================================================
   LIGAS Y EQUIPOS
========================================================= */
function renderLigasTabs() {
  const cont = document.getElementById('ligasTabs');
  cont.innerHTML = LIGAS.map(l => `
    <button type="button" class="liga-tab ${l.id === ligaActiva ? 'activo' : ''}" data-id="${l.id}">
      ${l.nombre}
    </button>
  `).join('');

  cont.querySelectorAll('.liga-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      ligaActiva = btn.dataset.id;
      renderLigasTabs();
      renderEquiposGrid();
    });
  });
}

function renderEquiposGrid() {
  const liga = LIGAS.find(l => l.id === ligaActiva);
  renderGrid(liga.equipos, 'gridEquipos', liga.nombre);
}

renderLigasTabs();
renderEquiposGrid();

/* =========================================================
   MODAL PRODUCTO
========================================================= */
const overlayProducto = document.getElementById('overlayProducto');

function abrirModalProducto(producto, categoria) {
  productoActivo = producto;
  tipoActivo = 'actual';

  document.getElementById('prodCategoria').textContent = categoria;
  document.getElementById('prodNombre').textContent = producto.nombre;
  document.getElementById('previewCamiseta').innerHTML = svgCamiseta(producto.c1, producto.c2, 'camiseta-preview');
  document.getElementById('prodNombreTexto').value = '';
  document.getElementById('prodDorsal').value = '';
  document.getElementById('prodTalla').value = 'M';
  document.getElementById('prodCantidad').value = 1;

  document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b.dataset.tipo === 'actual'));

  actualizarPrecioModal();
  overlayProducto.classList.add('abierto');
}

document.querySelectorAll('#prodTipo button').forEach(btn => {
  btn.addEventListener('click', () => {
    tipoActivo = btn.dataset.tipo;
    document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b === btn));
    actualizarPrecioModal();
  });
});

document.getElementById('prodMenos').addEventListener('click', () => {
  const input = document.getElementById('prodCantidad');
  input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
  actualizarPrecioModal();
});
document.getElementById('prodMas').addEventListener('click', () => {
  const input = document.getElementById('prodCantidad');
  input.value = parseInt(input.value || '1', 10) + 1;
  actualizarPrecioModal();
});
document.getElementById('prodCantidad').addEventListener('input', actualizarPrecioModal);

function calcularPrecioUnidad() {
  const precioBase = tipoActivo === 'retro' ? PRECIO_RETRO : PRECIO_ACTUAL;
  const tieneNombre = document.getElementById('prodNombreTexto').value.trim() !== '';
  const tieneDorsal = document.getElementById('prodDorsal').value !== '';
  let precio = precioBase;
  if (tieneNombre) precio += EXTRA_NOMBRE;
  if (tieneDorsal) precio += EXTRA_DORSAL;
  return precio;
}

function actualizarPrecioModal() {
  const cantidad = Math.max(1, parseInt(document.getElementById('prodCantidad').value || '1', 10));
  const precioUnidad = calcularPrecioUnidad();

  document.getElementById('prodPrecioTotal').textContent = (precioUnidad * cantidad).toFixed(2) + ' €';
  document.getElementById('prodPrecioUnidad').textContent = `(${precioUnidad.toFixed(2)} €/ud)`;
}

document.getElementById('prodNombreTexto').addEventListener('input', actualizarPrecioModal);
document.getElementById('prodDorsal').addEventListener('input', actualizarPrecioModal);

document.getElementById('btnAnadirCarrito').addEventListener('click', () => {
  const cantidad = Math.max(1, parseInt(document.getElementById('prodCantidad').value || '1', 10));
  const precioUnidad = calcularPrecioUnidad();

  carrito.push({
    idLinea: 'l' + Date.now() + Math.random().toString(16).slice(2),
    equipoId: productoActivo.id,
    equipo: productoActivo.nombre,
    c1: productoActivo.c1,
    c2: productoActivo.c2,
    tipo: tipoActivo,
    nombreCamiseta: document.getElementById('prodNombreTexto').value.trim().toUpperCase(),
    dorsal: document.getElementById('prodDorsal').value,
    talla: document.getElementById('prodTalla').value,
    cantidad,
    precioUnidad
  });

  guardarCarrito();
  overlayProducto.classList.remove('abierto');
  abrirCarrito();
});

/* =========================================================
   CARRITO
========================================================= */
const overlayCarrito = document.getElementById('overlayCarrito');

function abrirCarrito() {
  renderCarrito();
  overlayCarrito.classList.add('abierto');
}

document.getElementById('btnAbrirCarrito').addEventListener('click', abrirCarrito);

function actualizarContadorCarrito() {
  const total = carrito.reduce((s, it) => s + it.cantidad, 0);
  document.getElementById('cartCount').textContent = total;
}

function renderCarrito() {
  const lista = document.getElementById('listaCarrito');
  const vacio = document.getElementById('carritoVacioMsg');

  if (carrito.length === 0) {
    lista.innerHTML = '';
    lista.appendChild(vacio);
  } else {
    lista.innerHTML = carrito.map(it => `
      <div class="item-carrito">
        <div class="item-carrito__icono">${svgCamiseta(it.c1, it.c2, 'item-carrito__icono')}</div>
        <div class="item-carrito__info">
          <h5>${it.equipo} · ${it.tipo === 'retro' ? 'Retro' : 'Actual'}</h5>
          <p>Talla ${it.talla} ${it.nombreCamiseta ? '· ' + it.nombreCamiseta : ''} ${it.dorsal ? '· Nº' + it.dorsal : ''} · x${it.cantidad}</p>
          <button class="item-carrito__quitar" data-id="${it.idLinea}">Quitar</button>
        </div>
        <div class="item-carrito__precio">${(it.precioUnidad * it.cantidad).toFixed(2)} €</div>
      </div>
    `).join('');

    lista.querySelectorAll('.item-carrito__quitar').forEach(btn => {
      btn.addEventListener('click', () => {
        carrito = carrito.filter(it => it.idLinea !== btn.dataset.id);
        guardarCarrito();
        renderCarrito();
      });
    });
  }

  const total = carrito.reduce((s, it) => s + it.precioUnidad * it.cantidad, 0);
  document.getElementById('resTotal').textContent = total.toFixed(2) + ' €';

  actualizarContadorCarrito();
}

document.getElementById('btnIrEnvio').addEventListener('click', () => {
  if (carrito.length === 0) return;
  document.getElementById('formEnvio').classList.add('mostrar');
  document.getElementById('btnIrEnvio').style.display = 'none';
});

/* Envío del pedido */
document.getElementById('formEnvio').addEventListener('submit', async (e) => {
  e.preventDefault();

  const estado = document.getElementById('estadoPedido');
  const boton = document.getElementById('btnEnviarPedido');

  const total = carrito.reduce((s, it) => s + it.precioUnidad * it.cantidad, 0);

  const pedido = {
    items: carrito,
    total,
    cliente: {
      nombre: document.getElementById('clienteNombre').value.trim(),
      direccion: document.getElementById('clienteDireccion').value.trim(),
      telefono: document.getElementById('clienteTelefono').value.trim(),
      email: document.getElementById('clienteEmail').value.trim()
    }
  };

  boton.disabled = true;
  estado.className = 'form-envio__estado';
  estado.textContent = 'Enviando pedido...';

  try {
    const resp = await fetch('/api/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    const data = await resp.json();

    if (data.ok) {
      estado.className = 'form-envio__estado ok';
      estado.textContent = `¡Pedido #${data.pedidoId} enviado! Te contactaremos para confirmar.`;
      carrito = [];
      guardarCarrito();
      document.getElementById('formEnvio').reset();
      setTimeout(() => {
        document.getElementById('formEnvio').classList.remove('mostrar');
        document.getElementById('btnIrEnvio').style.display = 'block';
        overlayCarrito.classList.remove('abierto');
        estado.textContent = '';
      }, 2500);
    } else {
      estado.className = 'form-envio__estado error';
      estado.textContent = data.error || 'No se pudo enviar el pedido.';
    }
  } catch (err) {
    estado.className = 'form-envio__estado error';
    estado.textContent = 'Error de conexión. Inténtalo de nuevo.';
  } finally {
    boton.disabled = false;
    renderCarrito();
  }
});

/* =========================================================
   AMIGO INVISIBLE
========================================================= */
const overlayAmigo = document.getElementById('overlayAmigo');

document.getElementById('btnAbrirAmigoInvisible').addEventListener('click', () => {
  overlayAmigo.classList.add('abierto');
});

document.getElementById('btnAmigoAnadir').addEventListener('click', anadirAmigo);
document.getElementById('amigoNombreInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); anadirAmigo(); }
});

function anadirAmigo() {
  const input = document.getElementById('amigoNombreInput');
  const nombre = input.value.trim();
  if (!nombre || amigos.includes(nombre)) { input.value = ''; return; }
  amigos.push(nombre);
  input.value = '';
  renderAmigoLista();
}

function renderAmigoLista() {
  const ul = document.getElementById('amigoLista');
  ul.innerHTML = amigos.map(n => `<li>${n} <button data-n="${n}">✕</button></li>`).join('');
  ul.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      amigos = amigos.filter(n => n !== b.dataset.n);
      renderAmigoLista();
    });
  });
}

document.getElementById('btnAmigoSortear').addEventListener('click', () => {
  if (amigos.length < 3) {
    alert('Añade al menos 3 participantes para hacer el sorteo.');
    return;
  }

  // Sorteo tipo "derangement": nadie se toca a sí mismo
  let asignados;
  do {
    asignados = [...amigos];
    for (let i = asignados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [asignados[i], asignados[j]] = [asignados[j], asignados[i]];
    }
  } while (asignados.some((n, i) => n === amigos[i]));

  sorteoAmigo = {};
  amigos.forEach((n, i) => sorteoAmigo[n] = asignados[i]);

  const select = document.getElementById('amigoSelectYo');
  select.innerHTML = amigos.map(n => `<option value="${n}">${n}</option>`).join('');

  document.getElementById('amigoResultadoBloque').style.display = 'block';
  document.getElementById('amigoRevelado').textContent = '';
});

document.getElementById('btnAmigoVer').addEventListener('click', () => {
  const yo = document.getElementById('amigoSelectYo').value;
  document.getElementById('amigoRevelado').textContent = `Le regalas la camiseta a: ${sorteoAmigo[yo]}`;
});

/* =========================================================
   CIERRE DE OVERLAYS
========================================================= */
document.querySelectorAll('[data-cerrar]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.cerrar).classList.remove('abierto');
  });
});
document.querySelectorAll('.overlay').forEach(ov => {
  ov.addEventListener('click', (e) => {
    if (e.target === ov) ov.classList.remove('abierto');
  });
});

/* Estado inicial */
actualizarContadorCarrito();
