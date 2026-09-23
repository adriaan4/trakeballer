/* =========================================================
   DATOS DEL CATÁLOGO
   Colores aproximados de las equipaciones habituales.
   Puedes ampliar/editar libremente esta lista.
========================================================= */
// Camisetas reales del Mundial 2026 (foto local/visitante). Si un país no
// tiene una de las dos versiones, ese campo queda en null y el selector de
// versión no se muestra o se ajusta automáticamente en el modal.
const SELECCIONES = [
  { id: 'mundial-alemania', nombre: 'Alemania', imgLocal: 'img/mundial/alemania-local.png', imgVisitante: 'img/mundial/alemania-visitante.png' },
  { id: 'mundial-arabia-saudi', nombre: 'Arabia Saudí', imgLocal: 'img/mundial/arabia-saudi-local.png', imgVisitante: null },
  { id: 'mundial-argelia', nombre: 'Argelia', imgLocal: 'img/mundial/argelia-local.png', imgVisitante: null },
  { id: 'mundial-argentina', nombre: 'Argentina', imgLocal: 'img/mundial/argentina-local.png', imgVisitante: 'img/mundial/argentina-visitante.png' },
  { id: 'mundial-austria', nombre: 'Austria', imgLocal: 'img/mundial/austria-local.png', imgVisitante: null },
  { id: 'mundial-belgica', nombre: 'Bélgica', imgLocal: 'img/mundial/belgica-local.png', imgVisitante: 'img/mundial/belgica-visitante.png' },
  { id: 'mundial-brasil', nombre: 'Brasil', imgLocal: 'img/mundial/brasil-local.png', imgVisitante: 'img/mundial/brasil-visitante.png' },
  { id: 'mundial-cabo-verde', nombre: 'Cabo Verde', imgLocal: 'img/mundial/cabo-verde-local.webp', imgVisitante: null },
  { id: 'mundial-canada', nombre: 'Canadá', imgLocal: 'img/mundial/canada-local.png', imgVisitante: 'img/mundial/canada-visitante.png' },
  { id: 'mundial-chequia', nombre: 'Chequia', imgLocal: 'img/mundial/chequia-local.png', imgVisitante: null },
  { id: 'mundial-chile', nombre: 'Chile', imgLocal: 'img/mundial/chile-local.png', imgVisitante: 'img/mundial/chile-visitante.png' },
  { id: 'mundial-colombia', nombre: 'Colombia', imgLocal: 'img/mundial/colombia-local.png', imgVisitante: 'img/mundial/colombia-visitante.png' },
  { id: 'mundial-corea-del-sur', nombre: 'Corea del Sur', imgLocal: 'img/mundial/corea-del-sur-local.png', imgVisitante: 'img/mundial/corea-del-sur-visitante.png' },
  { id: 'mundial-costa-rica', nombre: 'Costa Rica', imgLocal: 'img/mundial/costa-rica-local.png', imgVisitante: null },
  { id: 'mundial-croacia', nombre: 'Croacia', imgLocal: 'img/mundial/croacia-local.png', imgVisitante: 'img/mundial/croacia-visitante.png' },
  { id: 'mundial-curazao', nombre: 'Curazao', imgLocal: 'img/mundial/curazao-local.png', imgVisitante: 'img/mundial/curazao-visitante.png' },
  { id: 'mundial-egipto', nombre: 'Egipto', imgLocal: 'img/mundial/egipto-local.webp', imgVisitante: 'img/mundial/egipto-visitante.png' },
  { id: 'mundial-escocia', nombre: 'Escocia', imgLocal: 'img/mundial/escocia-local.webp', imgVisitante: 'img/mundial/escocia-visitante.png' },
  { id: 'mundial-espana', nombre: 'España', imgLocal: 'img/mundial/espana-local.png', imgVisitante: 'img/mundial/espana-visitante.png' },
  { id: 'mundial-estados-unidos', nombre: 'Estados Unidos', imgLocal: null, imgVisitante: 'img/mundial/estados-unidos-visitante.png' },
  { id: 'mundial-francia', nombre: 'Francia', imgLocal: 'img/mundial/francia-local.webp', imgVisitante: 'img/mundial/francia-visitante.png' },
  { id: 'mundial-gales', nombre: 'Gales', imgLocal: 'img/mundial/gales-local.png', imgVisitante: null },
  { id: 'mundial-ghana', nombre: 'Ghana', imgLocal: 'img/mundial/ghana-local.png', imgVisitante: null },
  { id: 'mundial-hungria', nombre: 'Hungría', imgLocal: 'img/mundial/hungria-local.png', imgVisitante: 'img/mundial/hungria-visitante.png' },
  { id: 'mundial-inglaterra', nombre: 'Inglaterra', imgLocal: 'img/mundial/inglaterra-local.png', imgVisitante: 'img/mundial/inglaterra-visitante.png' },
  { id: 'mundial-islandia', nombre: 'Islandia', imgLocal: 'img/mundial/islandia-local.png', imgVisitante: null },
  { id: 'mundial-italia', nombre: 'Italia', imgLocal: 'img/mundial/italia-local.png', imgVisitante: 'img/mundial/italia-visitante.png' },
  { id: 'mundial-jamaica', nombre: 'Jamaica', imgLocal: 'img/mundial/jamaica-local.webp', imgVisitante: null },
  { id: 'mundial-japon', nombre: 'Japón', imgLocal: 'img/mundial/japon-local.png', imgVisitante: 'img/mundial/japon-visitante.png' },
  { id: 'mundial-jordania', nombre: 'Jordania', imgLocal: 'img/mundial/jordania-local.png', imgVisitante: 'img/mundial/jordania-visitante.png' },
  { id: 'mundial-mali', nombre: 'Malí', imgLocal: 'img/mundial/mali-local.png', imgVisitante: 'img/mundial/mali-visitante.png' },
  { id: 'mundial-marruecos', nombre: 'Marruecos', imgLocal: 'img/mundial/marruecos-local.webp', imgVisitante: 'img/mundial/marruecos-visitante.png' },
  { id: 'mundial-mexico', nombre: 'México', imgLocal: 'img/mundial/mexico-local.png', imgVisitante: 'img/mundial/mexico-visitante.png' },
  { id: 'mundial-noruega', nombre: 'Noruega', imgLocal: 'img/mundial/noruega-local.png', imgVisitante: 'img/mundial/noruega-visitante.png' },
  { id: 'mundial-paises-bajos', nombre: 'Países Bajos', imgLocal: 'img/mundial/paises-bajos-local.png', imgVisitante: 'img/mundial/paises-bajos-visitante.png' },
  { id: 'mundial-paraguay', nombre: 'Paraguay', imgLocal: 'img/mundial/paraguay-local.png', imgVisitante: 'img/mundial/paraguay-visitante.png' },
  { id: 'mundial-peru', nombre: 'Perú', imgLocal: 'img/mundial/peru-local.png', imgVisitante: null },
  { id: 'mundial-portugal', nombre: 'Portugal', imgLocal: 'img/mundial/portugal-local.png', imgVisitante: 'img/mundial/portugal-visitante.png' },
  { id: 'mundial-qatar', nombre: 'Qatar', imgLocal: 'img/mundial/qatar-local.webp', imgVisitante: null },
  { id: 'mundial-senegal', nombre: 'Senegal', imgLocal: 'img/mundial/senegal-local.webp', imgVisitante: 'img/mundial/senegal-visitante.png' },
  { id: 'mundial-sudafrica', nombre: 'Sudáfrica', imgLocal: 'img/mundial/sudafrica-local.png', imgVisitante: 'img/mundial/sudafrica-visitante.png' },
  { id: 'mundial-suecia', nombre: 'Suecia', imgLocal: 'img/mundial/suecia-local.png', imgVisitante: 'img/mundial/suecia-visitante.png' },
  { id: 'mundial-suiza', nombre: 'Suiza', imgLocal: 'img/mundial/suiza-local.png', imgVisitante: null },
  { id: 'mundial-tunez', nombre: 'Túnez', imgLocal: 'img/mundial/tunez-local.webp', imgVisitante: null },
  { id: 'mundial-turquia', nombre: 'Turquía', imgLocal: 'img/mundial/turquia-local.png', imgVisitante: null },
  { id: 'mundial-ucrania', nombre: 'Ucrania', imgLocal: 'img/mundial/ucrania-local.png', imgVisitante: null },
  { id: 'mundial-uruguay', nombre: 'Uruguay', imgLocal: 'img/mundial/uruguay-local.png', imgVisitante: 'img/mundial/uruguay-visitante.png' },
  { id: 'mundial-venezuela', nombre: 'Venezuela', imgLocal: 'img/mundial/venezuela-local.webp', imgVisitante: 'img/mundial/venezuela-visitante.png' },
];

const LIGAS = [
  {
    id: 'premier-league',
    nombre: 'Premier League',
    equipos: [
      { id: 'pl-manutd', nombre: 'Manchester United', c1: '#DA291C', c2: '#1A1A1A', imgLocal: 'img/equipos/premier-league/pl-manutd.jpg', imgVisitante: 'img/equipos/premier-league/pl-manutd-visitante.jpg' },
      { id: 'pl-mancity', nombre: 'Manchester City', c1: '#6CABDD', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-mancity.jpg' },
      { id: 'pl-liverpool', nombre: 'Liverpool', c1: '#C8102E', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-liverpool.jpg', imgVisitante: 'img/equipos/premier-league/pl-liverpool-visitante.jpg' },
      { id: 'pl-chelsea', nombre: 'Chelsea', c1: '#034694', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-chelsea.jpg', imgVisitante: 'img/equipos/premier-league/pl-chelsea-visitante.jpg' },
      { id: 'pl-arsenal', nombre: 'Arsenal', c1: '#EF0107', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-arsenal.jpg', imgVisitante: 'img/equipos/premier-league/pl-arsenal-visitante.jpg' },
      { id: 'pl-tottenham', nombre: 'Tottenham Hotspur', c1: '#132257', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-tottenham.jpg' },
      { id: 'pl-newcastle', nombre: 'Newcastle United', c1: '#1A1A1A', c2: '#FFFFFF', imgLocal: 'img/equipos/premier-league/pl-newcastle.jpg', imgVisitante: 'img/equipos/premier-league/pl-newcastle-visitante.jpg' },
      { id: 'pl-astonvilla', nombre: 'Aston Villa', c1: '#95BFE5', c2: '#670E36', imgLocal: 'img/equipos/premier-league/pl-astonvilla.jpg', imgVisitante: 'img/equipos/premier-league/pl-astonvilla-visitante.jpg' },
    ],
  },
  {
    id: 'laliga',
    nombre: 'Spanish La Liga',
    equipos: [
      { id: 'll-realmadrid', nombre: 'Real Madrid', c1: '#FFFFFF', c2: '#F2B705', imgLocal: 'img/laliga/real-madrid.webp', imgVisitante: 'img/laliga/real-madrid-visitante.jpg' },
      { id: 'll-barcelona', nombre: 'FC Barcelona', c1: '#004D98', c2: '#A50044', imgLocal: 'img/laliga/barcelona.webp', imgVisitante: 'img/laliga/barcelona-visitante.jpg' },
      { id: 'll-atletico', nombre: 'Atlético de Madrid', c1: '#C60B1E', c2: '#1E2A5E', imgLocal: 'img/laliga/atletico.webp', imgVisitante: 'img/laliga/atletico-visitante.jpg' },
      { id: 'll-sevilla', nombre: 'Sevilla FC', c1: '#FFFFFF', c2: '#D2001C', imgLocal: 'img/equipos/laliga/ll-sevilla.jpg', imgVisitante: 'img/equipos/laliga/ll-sevilla-visitante.jpg' },
      { id: 'll-espanyol', nombre: 'RCD Espanyol', c1: '#007FC8', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga/ll-espanyol.jpg', imgVisitante: 'img/equipos/laliga/ll-espanyol-visitante.jpg' },
      { id: 'll-realsociedad', nombre: 'Real Sociedad', c1: '#004C9F', c2: '#FFFFFF', imgLocal: 'img/laliga/real-sociedad.webp', imgVisitante: 'img/laliga/real-sociedad-visitante.jpg' },
      { id: 'll-betis', nombre: 'Real Betis', c1: '#00954C', c2: '#FFFFFF', imgLocal: 'img/laliga/betis.webp', imgVisitante: 'img/laliga/betis-visitante.jpg' },
      { id: 'll-athletic', nombre: 'Athletic Club', c1: '#EE2523', c2: '#FFFFFF', imgLocal: 'img/laliga/athletic.webp', imgVisitante: 'img/laliga/athletic-visitante.jpg' },
      { id: 'll-valencia', nombre: 'Valencia CF', c1: '#FFFFFF', c2: '#EE7203', imgLocal: 'img/laliga/valencia.webp', imgVisitante: 'img/laliga/valencia-visitante.jpg' },
      { id: 'll-alaves', nombre: 'Deportivo Alavés', c1: '#0047AB', c2: '#FFFFFF', imgLocal: 'img/laliga/alaves.webp', imgVisitante: 'img/laliga/alaves-visitante.jpg' },
      { id: 'll-celta', nombre: 'RC Celta de Vigo', c1: '#8AC3EE', c2: '#FFFFFF', imgLocal: 'img/laliga/celta.webp', imgVisitante: 'img/laliga/celta-visitante.jpg' },
      { id: 'll-deportivo', nombre: 'Deportivo de La Coruña', c1: '#0057A8', c2: '#FFFFFF', imgLocal: 'img/laliga/deportivo.webp', imgVisitante: 'img/laliga/deportivo-visitante.jpg' },
      { id: 'll-getafe', nombre: 'Getafe CF', c1: '#0A5CA8', c2: '#FFFFFF', imgLocal: 'img/laliga/getafe.webp', imgVisitante: 'img/laliga/getafe-visitante.jpg' },
      { id: 'll-levante', nombre: 'Levante UD', c1: '#0055A4', c2: '#B0092B', imgLocal: 'img/laliga/levante.webp', imgVisitante: 'img/laliga/levante-visitante.jpg' },
      { id: 'll-malaga', nombre: 'Málaga CF', c1: '#0067B1', c2: '#FFFFFF', imgLocal: 'img/laliga/malaga.webp', imgVisitante: 'img/laliga/malaga-visitante.jpg' },
      { id: 'll-osasuna', nombre: 'CA Osasuna', c1: '#D2001C', c2: '#0A2240', imgLocal: 'img/laliga/osasuna.webp', imgVisitante: 'img/laliga/osasuna-visitante.jpg' },
      { id: 'll-villarreal', nombre: 'Villarreal CF', c1: '#FFE667', c2: '#0053A0', imgLocal: 'img/laliga/villarreal.webp', imgVisitante: 'img/laliga/villarreal-visitante.jpg' },
      { id: 'll-elche', nombre: 'Elche CF', c1: '#00954C', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga/ll-elche.jpg', imgVisitante: 'img/equipos/laliga/ll-elche-visitante.jpg' },
    ],
  },
  {
    id: 'serie-a',
    nombre: 'Serie A',
    equipos: [
      { id: 'sa-juventus', nombre: 'Juventus', c1: '#FFFFFF', c2: '#1A1A1A', imgLocal: 'img/equipos/serie-a/sa-juventus.jpg', imgVisitante: 'img/equipos/serie-a/sa-juventus-visitante.jpg' },
      { id: 'sa-milan', nombre: 'AC Milan', c1: '#FB090B', c2: '#1A1A1A', imgLocal: 'img/equipos/serie-a/sa-milan.jpg', imgVisitante: 'img/equipos/serie-a/sa-milan-visitante.jpg' },
      { id: 'sa-inter', nombre: 'Inter de Milán', c1: '#004A9F', c2: '#1A1A1A', imgLocal: 'img/equipos/serie-a/sa-inter.jpg', imgVisitante: 'img/equipos/serie-a/sa-inter-visitante.jpg' },
      { id: 'sa-napoli', nombre: 'Napoli', c1: '#12A0D7', c2: '#FFFFFF', imgLocal: 'img/equipos/serie-a/sa-napoli.jpg', imgVisitante: 'img/equipos/serie-a/sa-napoli-visitante.jpg' },
      { id: 'sa-roma', nombre: 'AS Roma', c1: '#8E1F2F', c2: '#F0BC42', imgLocal: 'img/equipos/serie-a/sa-roma.jpg', imgVisitante: 'img/equipos/serie-a/sa-roma-visitante.jpg' },
      { id: 'sa-lazio', nombre: 'Lazio', c1: '#A0D8EF', c2: '#FFFFFF', imgLocal: 'img/equipos/serie-a/sa-lazio.jpg' },
      { id: 'sa-fiorentina', nombre: 'Fiorentina', c1: '#6F2DA8', c2: '#FFFFFF', imgLocal: 'img/equipos/serie-a/sa-fiorentina.jpg' },
      { id: 'sa-torino', nombre: 'Torino FC', c1: '#7A1E3C', c2: '#FFFFFF', imgLocal: 'img/equipos/serie-a/sa-torino.jpg' },
      { id: 'sa-cagliari', nombre: 'Cagliari Calcio', c1: '#B71234', c2: '#003DA5', imgLocal: 'img/equipos/serie-a/sa-cagliari.jpg' },
      { id: 'sa-bologna', nombre: 'Bologna FC', c1: '#B71234', c2: '#0033A0', imgLocal: 'img/equipos/serie-a/sa-bologna.jpg', imgVisitante: 'img/equipos/serie-a/sa-bologna-visitante.jpg' },
      { id: 'sa-atalanta', nombre: 'Atalanta', c1: '#1A1A1A', c2: '#0066B2', imgLocal: 'img/equipos/serie-a/sa-atalanta.jpg' },
    ],
  },
  {
    id: 'bundesliga',
    nombre: 'Bundesliga',
    equipos: [
      { id: 'bl-bayern', nombre: 'Bayern de Múnich', c1: '#DC052D', c2: '#0066B2', imgLocal: 'img/equipos/bundesliga/bl-bayern.jpg', imgVisitante: 'img/equipos/bundesliga/bl-bayern-visitante.jpg' },
      { id: 'bl-dortmund', nombre: 'Borussia Dortmund', c1: '#FDE100', c2: '#1A1A1A', imgLocal: 'img/equipos/bundesliga/bl-dortmund.jpg', imgVisitante: 'img/equipos/bundesliga/bl-dortmund-visitante.jpg' },
      { id: 'bl-leipzig', nombre: 'RB Leipzig', c1: '#FFFFFF', c2: '#DA291C', imgLocal: 'img/equipos/bundesliga/bl-leipzig.jpg', imgVisitante: 'img/equipos/bundesliga/bl-leipzig-visitante.jpg' },
      { id: 'bl-leverkusen', nombre: 'Bayer Leverkusen', c1: '#E32219', c2: '#1A1A1A', imgLocal: 'img/equipos/bundesliga/bl-leverkusen.jpg' },
      { id: 'bl-frankfurt', nombre: 'Eintracht Frankfurt', c1: '#1A1A1A', c2: '#E1000F', imgLocal: 'img/equipos/bundesliga/bl-frankfurt.jpg', imgVisitante: 'img/equipos/bundesliga/bl-frankfurt-visitante.jpg' },
      { id: 'bl-gladbach', nombre: 'Borussia Mönchengladbach', c1: '#1A1A1A', c2: '#FFFFFF', imgLocal: 'img/equipos/bundesliga/bl-gladbach.jpg' },
      { id: 'bl-stuttgart', nombre: 'VfB Stuttgart', c1: '#FFFFFF', c2: '#E32219', imgLocal: 'img/equipos/bundesliga/bl-stuttgart.jpg', imgVisitante: 'img/equipos/bundesliga/bl-stuttgart-visitante.jpg' },
      { id: 'bl-koln', nombre: '1. FC Köln', c1: '#1A1A1A', c2: '#D2001C', imgLocal: 'img/equipos/bundesliga/bl-koln.jpg' },
    ],
  },
  {
    id: 'ligue-1',
    nombre: 'Ligue 1',
    equipos: [
      { id: 'l1-psg', nombre: 'Paris Saint-Germain', c1: '#004170', c2: '#DA291C', imgLocal: 'img/equipos/ligue-1/l1-psg.jpg', imgVisitante: 'img/equipos/ligue-1/l1-psg-visitante.jpg' },
      { id: 'l1-marsella', nombre: 'Olympique de Marsella', c1: '#3399FF', c2: '#FFFFFF', imgLocal: 'img/equipos/ligue-1/l1-marsella.jpg', imgVisitante: 'img/equipos/ligue-1/l1-marsella-visitante.jpg' },
      { id: 'l1-lyon', nombre: 'Olympique de Lyon', c1: '#DA291C', c2: '#00285E', imgLocal: 'img/equipos/ligue-1/l1-lyon.jpg', imgVisitante: 'img/equipos/ligue-1/l1-lyon-visitante.jpg' },
      { id: 'l1-monaco', nombre: 'AS Mónaco', c1: '#E30613', c2: '#FFFFFF', imgLocal: 'img/equipos/ligue-1/l1-monaco.jpg', imgVisitante: 'img/equipos/ligue-1/l1-monaco-visitante.jpg' },
      { id: 'l1-lille', nombre: 'LOSC Lille', c1: '#C8102E', c2: '#FFFFFF', imgLocal: 'img/equipos/ligue-1/l1-lille.jpg' },
      { id: 'l1-nice', nombre: 'OGC Nice', c1: '#C8102E', c2: '#1A1A1A', imgLocal: 'img/equipos/ligue-1/l1-nice.jpg' },
      { id: 'l1-rennes', nombre: 'Stade Rennais', c1: '#E30613', c2: '#1A1A1A', imgLocal: 'img/equipos/ligue-1/l1-rennes.jpg' },
      { id: 'l1-lens', nombre: 'RC Lens', c1: '#C8102E', c2: '#FFD700', imgLocal: 'img/equipos/ligue-1/l1-lens.jpg', imgVisitante: 'img/equipos/ligue-1/l1-lens-visitante.jpg' },
    ],
  },
  {
    id: 'brasileirao',
    nombre: 'Campeonato Brasileiro Série A',
    equipos: [
      { id: 'br-flamengo', nombre: 'Flamengo', c1: '#C60C30', c2: '#1A1A1A', imgLocal: 'img/equipos/brasileirao/br-flamengo.jpg' },
      { id: 'br-palmeiras', nombre: 'Palmeiras', c1: '#006437', c2: '#FFFFFF', imgLocal: 'img/equipos/brasileirao/br-palmeiras.jpg' },
      { id: 'br-corinthians', nombre: 'Corinthians', c1: '#FFFFFF', c2: '#1A1A1A', imgLocal: 'img/equipos/brasileirao/br-corinthians.jpg' },
      { id: 'br-saopaulo', nombre: 'São Paulo', c1: '#FFFFFF', c2: '#C60C30', imgLocal: 'img/equipos/brasileirao/br-saopaulo.jpg' },
      { id: 'br-santos', nombre: 'Santos', c1: '#FFFFFF', c2: '#1A1A1A', imgLocal: 'img/equipos/brasileirao/br-santos.jpg' },
      { id: 'br-gremio', nombre: 'Grêmio', c1: '#0033A0', c2: '#1A1A1A', imgLocal: 'img/equipos/brasileirao/br-gremio.jpg' },
      { id: 'br-internacional', nombre: 'Internacional', c1: '#C60C30', c2: '#FFFFFF', imgLocal: 'img/equipos/brasileirao/br-internacional.jpg' },
      { id: 'br-fluminense', nombre: 'Fluminense', c1: '#7A1E3C', c2: '#006437', imgLocal: 'img/equipos/brasileirao/br-fluminense.jpg' },
      { id: 'br-cruzeiro', nombre: 'Cruzeiro', c1: '#003DA5', c2: '#FFFFFF', imgLocal: 'img/equipos/brasileirao/br-cruzeiro.png' },
      { id: 'br-botafogo', nombre: 'Botafogo', c1: '#1A1A1A', c2: '#FFFFFF', imgLocal: 'img/equipos/brasileirao/br-botafogo.jpg' },
    ],
  },
  {
    id: 'efl-championship',
    nombre: 'EFL Championship',
    equipos: [
      { id: 'ch-sunderland', nombre: 'Sunderland', c1: '#EB172B', c2: '#FFFFFF', imgLocal: 'img/equipos/efl-championship/ch-sunderland.jpg' },
      { id: 'ch-portsmouth', nombre: 'Portsmouth', c1: '#001489', c2: '#FFD200', imgLocal: 'img/equipos/efl-championship/ch-portsmouth.jpg' },
    ],
  },
  {
    id: 'scottish-premiership',
    nombre: 'Scottish Premiership',
    equipos: [
      { id: 'sco-celtic', nombre: 'Celtic FC', c1: '#018749', c2: '#FFFFFF', imgLocal: 'img/equipos/scottish-premiership/sco-celtic.jpg' },
      { id: 'sco-rangers', nombre: 'Rangers FC', c1: '#1D428A', c2: '#FFFFFF', imgLocal: 'img/equipos/scottish-premiership/sco-rangers.jpg' },
      { id: 'sco-hearts', nombre: 'Heart of Midlothian', c1: '#7A1E3C', c2: '#FFFFFF', imgLocal: 'img/equipos/scottish-premiership/sco-hearts.jpg' },
      { id: 'sco-aberdeen', nombre: 'Aberdeen FC', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/scottish-premiership/sco-aberdeen.jpg' },
    ],
  },
  {
    id: 'laliga2',
    nombre: 'La Liga 2',
    equipos: [
      { id: 'l2-racing', nombre: 'Racing de Santander', c1: '#00994D', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga2/l2-racing.jpg' },
      { id: 'l2-zaragoza', nombre: 'Real Zaragoza', c1: '#FFFFFF', c2: '#004C9F', imgLocal: 'img/equipos/laliga2/l2-zaragoza.jpg', imgVisitante: 'img/equipos/laliga2/l2-zaragoza-visitante.jpg' },
      { id: 'l2-sporting', nombre: 'Sporting de Gijón', c1: '#EE2523', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga2/l2-sporting.jpg' },
      { id: 'l2-eibar', nombre: 'SD Eibar', c1: '#004C9F', c2: '#6F2DA8', imgLocal: 'img/equipos/laliga2/l2-eibar.jpg' },
      { id: 'l2-albacete', nombre: 'Albacete Balompié', c1: '#FFFFFF', c2: '#004C9F', imgLocal: 'img/equipos/laliga2/l2-albacete.jpg' },
      { id: 'l2-tenerife', nombre: 'CD Tenerife', c1: '#004C9F', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga2/l2-tenerife.jpg' },
      { id: 'l2-granada', nombre: 'Granada CF', c1: '#C60B1E', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga2/l2-granada.jpg' },
      { id: 'l2-valladolid', nombre: 'Real Valladolid', c1: '#663399', c2: '#FFFFFF', imgLocal: 'img/equipos/laliga2/l2-valladolid.jpg' },
    ],
  },
  {
    id: 'mls',
    nombre: 'MLS',
    equipos: [
      { id: 'mls-lagalaxy', nombre: 'LA Galaxy', c1: '#00245D', c2: '#FDB927', imgLocal: 'img/equipos/mls/mls-lagalaxy.jpg' },
      { id: 'mls-lafc', nombre: 'LAFC', c1: '#1A1A1A', c2: '#C39E6D', imgLocal: 'img/equipos/mls/mls-lafc.jpg' },
      { id: 'mls-nycfc', nombre: 'New York City FC', c1: '#6CABDD', c2: '#F15A22', imgLocal: 'img/equipos/mls/mls-nycfc.jpg' },
      { id: 'mls-montreal', nombre: 'CF Montréal', c1: '#0033A0', c2: '#1A1A1A', imgLocal: 'img/equipos/mls/mls-montreal.jpg' },
      { id: 'mls-toronto', nombre: 'Toronto FC', c1: '#B81137', c2: '#FFFFFF', imgLocal: 'img/equipos/mls/mls-toronto.jpg' },
    ],
  },
  {
    id: 'otras-sudamerica',
    nombre: 'Otras Ligas de Sudamérica',
    equipos: [
      { id: 'uy-penarol', nombre: 'Club Atlético Peñarol', c1: '#FFD200', c2: '#1A1A1A', imgLocal: 'img/equipos/otras-sudamerica/uy-penarol.jpg' },
      { id: 'py-olimpia', nombre: 'Club Olimpia', c1: '#1A1A1A', c2: '#FFFFFF', imgLocal: 'img/equipos/otras-sudamerica/py-olimpia.jpg' },
      { id: 'pe-sportingcristal', nombre: 'Sporting Cristal', c1: '#004C9F', c2: '#FFFFFF', imgLocal: 'img/equipos/otras-sudamerica/pe-sportingcristal.jpg' },
    ],
  },
  {
    id: 'liga-mx',
    nombre: 'Liga MX',
    equipos: [
      { id: 'mx-america', nombre: 'Club América', c1: '#FFD200', c2: '#0033A0', imgLocal: 'img/equipos/liga-mx/mx-america.jpg' },
      { id: 'mx-tijuana', nombre: 'Club Tijuana', c1: '#1A1A1A', c2: '#D2001C', imgLocal: 'img/equipos/liga-mx/mx-tijuana.jpg' },
    ],
  },
  {
    id: 'argentina-lpf',
    nombre: 'Argentina LPF League',
    equipos: [
      { id: 'ar-boca', nombre: 'Boca Juniors', c1: '#003DA5', c2: '#FDB927', imgLocal: 'img/equipos/argentina-lpf/ar-boca.jpg' },
      { id: 'ar-river', nombre: 'River Plate', c1: '#FFFFFF', c2: '#D2001C', imgLocal: 'img/equipos/argentina-lpf/ar-river.jpg' },
    ],
  },
  {
    id: 'liga-portugal',
    nombre: 'Liga Portugal',
    equipos: [
      { id: 'pt-benfica', nombre: 'Benfica', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/liga-portugal/pt-benfica.jpg', imgVisitante: 'img/equipos/liga-portugal/pt-benfica-visitante.jpg' },
      { id: 'pt-porto', nombre: 'FC Porto', c1: '#003DA5', c2: '#FFFFFF', imgLocal: 'img/equipos/liga-portugal/pt-porto.jpg', imgVisitante: 'img/equipos/liga-portugal/pt-porto-visitante.jpg' },
      { id: 'pt-sporting', nombre: 'Sporting CP', c1: '#00954C', c2: '#FFFFFF', imgLocal: 'img/equipos/liga-portugal/pt-sporting.jpg', imgVisitante: 'img/equipos/liga-portugal/pt-sporting-visitante.jpg' },
      { id: 'pt-braga', nombre: 'SC Braga', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/liga-portugal/pt-braga.jpg' },
    ],
  },
  {
    id: 'eredivisie',
    nombre: 'Dutch Eredivisie',
    equipos: [
      { id: 'nl-ajax', nombre: 'Ajax', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/eredivisie/nl-ajax.jpg', imgVisitante: 'img/equipos/eredivisie/nl-ajax-visitante.jpg' },
      { id: 'nl-psv', nombre: 'PSV Eindhoven', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/eredivisie/nl-psv.jpg' },
      { id: 'nl-feyenoord', nombre: 'Feyenoord', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/eredivisie/nl-feyenoord.jpg' },
    ],
  },
  {
    id: 'saudi-league',
    nombre: 'Saudi Arabian League',
    equipos: [
      { id: 'sau-alhilal', nombre: 'Al Hilal', c1: '#003DA5', c2: '#FFFFFF', imgLocal: 'img/equipos/saudi-league/sau-alhilal.jpg' },
      { id: 'sau-alnassr', nombre: 'Al Nassr', c1: '#FDE100', c2: '#003DA5', imgLocal: 'img/equipos/saudi-league/sau-alnassr.jpg' },
      { id: 'sau-alittihad', nombre: 'Al Ittihad', c1: '#1A1A1A', c2: '#C39E6D', imgLocal: 'img/equipos/saudi-league/sau-alittihad.jpg' },
      { id: 'sau-alshabab', nombre: 'Al Shabab', c1: '#FFFFFF', c2: '#1A1A1A', imgLocal: 'img/equipos/saudi-league/sau-alshabab.jpg' },
    ],
  },
  {
    id: 'serie-b',
    nombre: 'Serie B',
    equipos: [
      { id: 'sb-parma', nombre: 'Parma', c1: '#FDE100', c2: '#003DA5', imgLocal: 'img/equipos/serie-b/sb-parma.jpg' },
      { id: 'sb-palermo', nombre: 'Palermo', c1: '#F7A8C4', c2: '#1A1A1A', imgLocal: 'img/equipos/serie-b/sb-palermo.jpg' },
      { id: 'sb-sampdoria', nombre: 'Sampdoria', c1: '#0057A8', c2: '#FFFFFF', imgLocal: 'img/equipos/serie-b/sb-sampdoria.jpg' },
      { id: 'sb-venezia', nombre: 'Venezia', c1: '#1A1A1A', c2: '#00954C', imgLocal: 'img/equipos/serie-b/sb-venezia.jpg' },
      { id: 'sb-cremonese', nombre: 'Cremonese', c1: '#9B9B9B', c2: '#D2001C', imgLocal: 'img/equipos/serie-b/sb-cremonese.jpg' },
    ],
  },
  {
    id: '2-bundesliga',
    nombre: '2. Bundesliga',
    equipos: [
      { id: 'b2-hamburgo', nombre: 'Hamburger SV', c1: '#0057A8', c2: '#FFFFFF', imgLocal: 'img/equipos/2-bundesliga/b2-hamburgo.jpg', imgVisitante: 'img/equipos/2-bundesliga/b2-hamburgo-visitante.jpg' },
      { id: 'b2-dusseldorf', nombre: 'Fortuna Düsseldorf', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/2-bundesliga/b2-dusseldorf.jpg', imgVisitante: 'img/equipos/2-bundesliga/b2-dusseldorf-visitante.jpg' },
      { id: 'b2-nuremberg', nombre: 'FC Nürnberg', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/2-bundesliga/b2-nuremberg.jpg', imgVisitante: 'img/equipos/2-bundesliga/b2-nuremberg-visitante.jpg' },
      { id: 'b2-hertha', nombre: 'Hertha BSC', c1: '#0057A8', c2: '#FFFFFF', imgLocal: 'img/equipos/2-bundesliga/b2-hertha.jpg' },
      { id: 'b2-stpauli', nombre: 'FC St. Pauli', c1: '#5C3A21', c2: '#FFFFFF', imgLocal: 'img/equipos/2-bundesliga/b2-stpauli.jpg', imgVisitante: 'img/equipos/2-bundesliga/b2-stpauli-visitante.jpg' },
    ],
  },
  {
    id: 'mas',
    nombre: 'Más',
    equipos: [
      { id: 'mas-olympiacos', nombre: 'Olympiacos', c1: '#D2001C', c2: '#FFFFFF', imgLocal: 'img/equipos/mas/olympiacos.jpg' },
      { id: 'mas-fenerbahce', nombre: 'Fenerbahçe', c1: '#FFE100', c2: '#0A2240', imgLocal: 'img/equipos/mas/fenerbahce.jpg' },
      { id: 'mas-besiktas', nombre: 'Beşiktaş', c1: '#1A1A1A', c2: '#FFFFFF', imgLocal: 'img/equipos/mas/besiktas.jpg' },
      { id: 'mas-galatasaray', nombre: 'Galatasaray', c1: '#E8792D', c2: '#A6192E', imgLocal: 'img/equipos/mas/galatasaray.jpg' },
    ],
  },
];

/* =========================================================
   PREFIJOS TELEFÓNICOS (para el desplegable de "país" del teléfono)
========================================================= */
const PREFIJOS_TELEFONO = [
  { pais: 'Afganistán', codigo: '+93' },
  { pais: 'Albania', codigo: '+355' },
  { pais: 'Alemania', codigo: '+49' },
  { pais: 'Andorra', codigo: '+376' },
  { pais: 'Angola', codigo: '+244' },
  { pais: 'Antigua y Barbuda', codigo: '+1' },
  { pais: 'Arabia Saudí', codigo: '+966' },
  { pais: 'Argelia', codigo: '+213' },
  { pais: 'Argentina', codigo: '+54' },
  { pais: 'Armenia', codigo: '+374' },
  { pais: 'Australia', codigo: '+61' },
  { pais: 'Austria', codigo: '+43' },
  { pais: 'Azerbaiyán', codigo: '+994' },
  { pais: 'Bahamas', codigo: '+1' },
  { pais: 'Bangladés', codigo: '+880' },
  { pais: 'Barbados', codigo: '+1' },
  { pais: 'Baréin', codigo: '+973' },
  { pais: 'Bélgica', codigo: '+32' },
  { pais: 'Belice', codigo: '+501' },
  { pais: 'Benín', codigo: '+229' },
  { pais: 'Bielorrusia', codigo: '+375' },
  { pais: 'Birmania (Myanmar)', codigo: '+95' },
  { pais: 'Bolivia', codigo: '+591' },
  { pais: 'Bosnia y Herzegovina', codigo: '+387' },
  { pais: 'Botsuana', codigo: '+267' },
  { pais: 'Brasil', codigo: '+55' },
  { pais: 'Brunéi', codigo: '+673' },
  { pais: 'Bulgaria', codigo: '+359' },
  { pais: 'Burkina Faso', codigo: '+226' },
  { pais: 'Burundi', codigo: '+257' },
  { pais: 'Bután', codigo: '+975' },
  { pais: 'Cabo Verde', codigo: '+238' },
  { pais: 'Camboya', codigo: '+855' },
  { pais: 'Camerún', codigo: '+237' },
  { pais: 'Canadá', codigo: '+1' },
  { pais: 'Catar', codigo: '+974' },
  { pais: 'Chad', codigo: '+235' },
  { pais: 'Chile', codigo: '+56' },
  { pais: 'China', codigo: '+86' },
  { pais: 'Chipre', codigo: '+357' },
  { pais: 'Ciudad del Vaticano', codigo: '+379' },
  { pais: 'Colombia', codigo: '+57' },
  { pais: 'Comoras', codigo: '+269' },
  { pais: 'Corea del Norte', codigo: '+850' },
  { pais: 'Corea del Sur', codigo: '+82' },
  { pais: 'Costa de Marfil', codigo: '+225' },
  { pais: 'Costa Rica', codigo: '+506' },
  { pais: 'Croacia', codigo: '+385' },
  { pais: 'Cuba', codigo: '+53' },
  { pais: 'Dinamarca', codigo: '+45' },
  { pais: 'Dominica', codigo: '+1' },
  { pais: 'Ecuador', codigo: '+593' },
  { pais: 'Egipto', codigo: '+20' },
  { pais: 'El Salvador', codigo: '+503' },
  { pais: 'Emiratos Árabes Unidos', codigo: '+971' },
  { pais: 'Eritrea', codigo: '+291' },
  { pais: 'Eslovaquia', codigo: '+421' },
  { pais: 'Eslovenia', codigo: '+386' },
  { pais: 'España', codigo: '+34' },
  { pais: 'Estados Unidos', codigo: '+1' },
  { pais: 'Estonia', codigo: '+372' },
  { pais: 'Esuatini', codigo: '+268' },
  { pais: 'Etiopía', codigo: '+251' },
  { pais: 'Filipinas', codigo: '+63' },
  { pais: 'Finlandia', codigo: '+358' },
  { pais: 'Fiyi', codigo: '+679' },
  { pais: 'Francia', codigo: '+33' },
  { pais: 'Gabón', codigo: '+241' },
  { pais: 'Gambia', codigo: '+220' },
  { pais: 'Georgia', codigo: '+995' },
  { pais: 'Ghana', codigo: '+233' },
  { pais: 'Granada', codigo: '+1' },
  { pais: 'Grecia', codigo: '+30' },
  { pais: 'Guatemala', codigo: '+502' },
  { pais: 'Guinea', codigo: '+224' },
  { pais: 'Guinea Ecuatorial', codigo: '+240' },
  { pais: 'Guinea-Bisáu', codigo: '+245' },
  { pais: 'Guyana', codigo: '+592' },
  { pais: 'Haití', codigo: '+509' },
  { pais: 'Honduras', codigo: '+504' },
  { pais: 'Hungría', codigo: '+36' },
  { pais: 'India', codigo: '+91' },
  { pais: 'Indonesia', codigo: '+62' },
  { pais: 'Irak', codigo: '+964' },
  { pais: 'Irán', codigo: '+98' },
  { pais: 'Irlanda', codigo: '+353' },
  { pais: 'Islandia', codigo: '+354' },
  { pais: 'Islas Marshall', codigo: '+692' },
  { pais: 'Islas Salomón', codigo: '+677' },
  { pais: 'Israel', codigo: '+972' },
  { pais: 'Italia', codigo: '+39' },
  { pais: 'Jamaica', codigo: '+1' },
  { pais: 'Japón', codigo: '+81' },
  { pais: 'Jordania', codigo: '+962' },
  { pais: 'Kazajistán', codigo: '+7' },
  { pais: 'Kenia', codigo: '+254' },
  { pais: 'Kirguistán', codigo: '+996' },
  { pais: 'Kiribati', codigo: '+686' },
  { pais: 'Kuwait', codigo: '+965' },
  { pais: 'Laos', codigo: '+856' },
  { pais: 'Lesoto', codigo: '+266' },
  { pais: 'Letonia', codigo: '+371' },
  { pais: 'Líbano', codigo: '+961' },
  { pais: 'Liberia', codigo: '+231' },
  { pais: 'Libia', codigo: '+218' },
  { pais: 'Liechtenstein', codigo: '+423' },
  { pais: 'Lituania', codigo: '+370' },
  { pais: 'Luxemburgo', codigo: '+352' },
  { pais: 'Macedonia del Norte', codigo: '+389' },
  { pais: 'Madagascar', codigo: '+261' },
  { pais: 'Malasia', codigo: '+60' },
  { pais: 'Malaui', codigo: '+265' },
  { pais: 'Maldivas', codigo: '+960' },
  { pais: 'Malí', codigo: '+223' },
  { pais: 'Malta', codigo: '+356' },
  { pais: 'Marruecos', codigo: '+212' },
  { pais: 'Mauricio', codigo: '+230' },
  { pais: 'Mauritania', codigo: '+222' },
  { pais: 'México', codigo: '+52' },
  { pais: 'Micronesia', codigo: '+691' },
  { pais: 'Moldavia', codigo: '+373' },
  { pais: 'Mónaco', codigo: '+377' },
  { pais: 'Mongolia', codigo: '+976' },
  { pais: 'Montenegro', codigo: '+382' },
  { pais: 'Mozambique', codigo: '+258' },
  { pais: 'Namibia', codigo: '+264' },
  { pais: 'Nauru', codigo: '+674' },
  { pais: 'Nepal', codigo: '+977' },
  { pais: 'Nicaragua', codigo: '+505' },
  { pais: 'Níger', codigo: '+227' },
  { pais: 'Nigeria', codigo: '+234' },
  { pais: 'Noruega', codigo: '+47' },
  { pais: 'Nueva Zelanda', codigo: '+64' },
  { pais: 'Omán', codigo: '+968' },
  { pais: 'Países Bajos', codigo: '+31' },
  { pais: 'Pakistán', codigo: '+92' },
  { pais: 'Palaos', codigo: '+680' },
  { pais: 'Panamá', codigo: '+507' },
  { pais: 'Papúa Nueva Guinea', codigo: '+675' },
  { pais: 'Paraguay', codigo: '+595' },
  { pais: 'Perú', codigo: '+51' },
  { pais: 'Polonia', codigo: '+48' },
  { pais: 'Portugal', codigo: '+351' },
  { pais: 'Reino Unido', codigo: '+44' },
  { pais: 'República Centroafricana', codigo: '+236' },
  { pais: 'República Checa (Chequia)', codigo: '+420' },
  { pais: 'República del Congo', codigo: '+242' },
  { pais: 'República Democrática del Congo', codigo: '+243' },
  { pais: 'República Dominicana', codigo: '+1' },
  { pais: 'Ruanda', codigo: '+250' },
  { pais: 'Rumanía', codigo: '+40' },
  { pais: 'Rusia', codigo: '+7' },
  { pais: 'Samoa', codigo: '+685' },
  { pais: 'San Cristóbal y Nieves', codigo: '+1' },
  { pais: 'San Marino', codigo: '+378' },
  { pais: 'San Vicente y las Granadinas', codigo: '+1' },
  { pais: 'Santa Lucía', codigo: '+1' },
  { pais: 'Santo Tomé y Príncipe', codigo: '+239' },
  { pais: 'Senegal', codigo: '+221' },
  { pais: 'Serbia', codigo: '+381' },
  { pais: 'Seychelles', codigo: '+248' },
  { pais: 'Sierra Leona', codigo: '+232' },
  { pais: 'Singapur', codigo: '+65' },
  { pais: 'Siria', codigo: '+963' },
  { pais: 'Somalia', codigo: '+252' },
  { pais: 'Sri Lanka', codigo: '+94' },
  { pais: 'Sudáfrica', codigo: '+27' },
  { pais: 'Sudán', codigo: '+249' },
  { pais: 'Sudán del Sur', codigo: '+211' },
  { pais: 'Suecia', codigo: '+46' },
  { pais: 'Suiza', codigo: '+41' },
  { pais: 'Surinam', codigo: '+597' },
  { pais: 'Tailandia', codigo: '+66' },
  { pais: 'Tanzania', codigo: '+255' },
  { pais: 'Tayikistán', codigo: '+992' },
  { pais: 'Timor Oriental', codigo: '+670' },
  { pais: 'Togo', codigo: '+228' },
  { pais: 'Tonga', codigo: '+676' },
  { pais: 'Trinidad y Tobago', codigo: '+1' },
  { pais: 'Túnez', codigo: '+216' },
  { pais: 'Turkmenistán', codigo: '+993' },
  { pais: 'Turquía', codigo: '+90' },
  { pais: 'Tuvalu', codigo: '+688' },
  { pais: 'Ucrania', codigo: '+380' },
  { pais: 'Uganda', codigo: '+256' },
  { pais: 'Uruguay', codigo: '+598' },
  { pais: 'Uzbekistán', codigo: '+998' },
  { pais: 'Vanuatu', codigo: '+678' },
  { pais: 'Venezuela', codigo: '+58' },
  { pais: 'Vietnam', codigo: '+84' },
  { pais: 'Yemen', codigo: '+967' },
  { pais: 'Yibuti', codigo: '+253' },
  { pais: 'Zambia', codigo: '+260' },
  { pais: 'Zimbabue', codigo: '+263' },
];

// Rellena un <select> con todos los prefijos telefónicos, ordenados por país.
function poblarSelectorPrefijos(id, prefijoPorDefecto) {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.innerHTML = PREFIJOS_TELEFONO.map(p =>
    `<option value="${p.codigo}">${p.pais} (${p.codigo})</option>`
  ).join('');
  if (prefijoPorDefecto) sel.value = prefijoPorDefecto;
}

// Deja el input de teléfono solo con dígitos y lo limita a 9 cifras.
function limitarNumeroTelefono(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(0, 9);
  });
}

const PRECIO_ACTUAL = 25;
const PRECIO_RETRO = 30;

/* =========================================================
   OFERTAS POR CANTIDAD
   Precio de lote por nº de camisetas del MISMO tipo (normal/retro).
   Se calcula con programación dinámica para que también beneficie a
   cantidades intermedias/mayores combinando lotes (p. ej. 21 = 15+6).
========================================================= */
const OFERTAS_CANTIDAD = [
  { cantidad: 6, normal: 135, retro: 150 },
  { cantidad: 10, normal: 200, retro: 225 },
  { cantidad: 15, normal: 250, retro: 275 },
];

function calcularPrecioPorTipo(cantidad, tipo) {
  const precioUnidad = tipo === 'retro' ? PRECIO_RETRO : PRECIO_ACTUAL;
  if (!cantidad || cantidad <= 0) return 0;

  const costes = new Array(cantidad + 1).fill(0);
  for (let n = 1; n <= cantidad; n++) {
    let mejor = costes[n - 1] + precioUnidad;
    OFERTAS_CANTIDAD.forEach(oferta => {
      if (n >= oferta.cantidad) {
        const precioLote = tipo === 'retro' ? oferta.retro : oferta.normal;
        mejor = Math.min(mejor, costes[n - oferta.cantidad] + precioLote);
      }
    });
    costes[n] = mejor;
  }
  return costes[cantidad];
}

// Agrupa los artículos del carrito por tipo (actual/retro) y aplica las
// ofertas por cantidad a cada grupo. Devuelve el subtotal ya con descuento.
function calcularSubtotalConOfertas(items) {
  const unidadesPorTipo = {};
  items.forEach(it => {
    unidadesPorTipo[it.tipo] = (unidadesPorTipo[it.tipo] || 0) + it.cantidad;
  });
  return Object.keys(unidadesPorTipo).reduce(
    (total, tipo) => total + calcularPrecioPorTipo(unidadesPorTipo[tipo], tipo),
    0
  );
}


/* =========================================================
   PARCHES
   - Equipos de club: parche de su propia liga + Champions / Europa
     League / Conference League (todos opcionales, el cliente marca
     los que quiera).
   - Selecciones: parche del Mundial (opcional).
========================================================= */

const PARCHES_COMPETICIONES_EUROPEAS = [
  { id: 'champions', nombre: 'UEFA Champions League' },
  { id: 'europa-league', nombre: 'UEFA Europa League' },
  { id: 'conference-league', nombre: 'UEFA Conference League' },
];

/* Ligas cuyos equipos no juegan competiciones europeas UEFA:
   solo llevan el parche de su propia liga (sin Champions/Europa/Conference). */
const LIGAS_SIN_COMPETICIONES_EUROPEAS = [
  'Campeonato Brasileiro Série A',
  'EFL Championship',
  'La Liga 2',
  'MLS',
  'J1 League',
  'Liga MX',
  'Argentina LPF League',
  'Saudi Arabian League',
  'Serie B',
  '2. Bundesliga',
];

/* =========================================================
   CAMISETAS RETRO REALES (fotos de producto reales, sin filtro).
   Por cada id de equipo que tenga modelos retro disponibles, se
   listan como opciones seleccionables al elegir "Retro".
========================================================= */
const RETRO_PRODUCTOS = {
  'ar-boca': [
    { nombre: 'Boca Juniors 99-00 visitante', img: 'img/retro/ar-boca/boca-juniors-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Boca Juniors 13-14 visitante', img: 'img/retro/ar-boca/boca-juniors-retro-away-s-xxl.jpg' },
    { nombre: 'Boca Juniors 13-14 local', img: 'img/retro/ar-boca/boca-juniors-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Boca Juniors 99-00 local', img: 'img/retro/ar-boca/boca-juniors-retro-home-s-xxl.jpg' },
  ],
  'ar-river': [
    { nombre: 'River Plate 91-92', img: 'img/retro/ar-river/river-plate-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'River Plate 96-97', img: 'img/retro/ar-river/river-plate-retro-home-s-xxl.jpg' },
    { nombre: 'River Plate 00-01', img: 'img/retro/ar-river/river-plate-retro-third-away-jersey-s-xxl.jpg' },
  ],
  'bl-bayern': [
    { nombre: 'Bayern Munich 98-99', img: 'img/retro/bl-bayern/bayern-munich-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Bayern Munich 93-94 visitante', img: 'img/retro/bl-bayern/bayern-munich-retro-away-s-xxl.jpg' },
    { nombre: 'Bayern Munich 21-22', img: 'img/retro/bl-bayern/bayern-munich-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Bayern Munich 95-96', img: 'img/retro/bl-bayern/bayern-munich-retro-home-s-xxl.jpg' },
    { nombre: 'Bayern Munich 93-94 local', img: 'img/retro/bl-bayern/bayern-munich-away-s-xxxl.jpg' },
  ],
  'bl-dortmund': [
    { nombre: 'Dortmund96-97 visitante', img: 'img/retro/bl-dortmund/dortmund-retro-away-s-xxl.jpg' },
    { nombre: 'Dortmund 97-98', img: 'img/retro/bl-dortmund/dortmund-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Dortmund 96-97 local', img: 'img/retro/bl-dortmund/dortmund-retro-home-s-xxl.jpg' },
  ],
  'br-corinthians': [
    { nombre: 'Corinthians 09-10', img: 'img/retro/br-corinthians/corinthians-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Corinthians 99-00', img: 'img/retro/br-corinthians/corinthians-retro-home-s-4xl.jpg' },
    { nombre: 'Corinthians 10-11 local', img: 'img/retro/br-corinthians/corinthians-retro-home-s-xxl.jpg' },
    { nombre: 'Corinthians 10-11 visitante', img: 'img/retro/br-corinthians/corinthians-retro-third-away-s-xxl.jpg' },
    { nombre: 'Corinthians 07-08', img: 'img/retro/br-corinthians/corinthians-retro-away-s-xxl.jpg' },
  ],
  'br-flamengo': [
    { nombre: 'Flamengo 06-07', img: 'img/retro/br-flamengo/flamengo-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Flamengo 94-95 local', img: 'img/retro/br-flamengo/flamengo-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'flamengo 94-95 visitante', img: 'img/retro/br-flamengo/flamengo-retro-third-away-s-xxl.jpg' },
  ],
  'br-fluminense': [
    { nombre: 'Fluminense 12-13', img: 'img/retro/br-fluminense/fluminense-retro-home-jersey-s-xxl.jpg' },
  ],
  'br-gremio': [
    { nombre: 'Gremio 95-96', img: 'img/retro/br-gremio/gremio-retro-home-s-xxl.jpg' },
  ],
  'br-palmeiras': [
    { nombre: 'Palmeiras 98-99', img: 'img/retro/br-palmeiras/palmeiras-retro-away-s-xxl.jpg' },
    { nombre: 'Palmeiras 92-93', img: 'img/retro/br-palmeiras/palmeiras-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Palmeiras 13-14', img: 'img/retro/br-palmeiras/palmeiras-retro-s-xxl.jpg' },
  ],
  'br-santos': [
    { nombre: 'Santos 11-12', img: 'img/retro/br-santos/santos-pink-retro-jersey-s-xxl.jpg' },
  ],
  'ch-sunderland': [
    { nombre: 'Sunderland 92-93', img: 'img/retro/ch-sunderland/sunderland-second-retro-away-jersey-s-xxl.jpg' },
  ],
  'l1-lille': [
    { nombre: 'Lille 95-96', img: 'img/retro/l1-lille/lille-retro-away-s-4xl.jpg' },
  ],
  'l1-lyon': [
    { nombre: 'Olympique Lyon 08-09', img: 'img/retro/l1-lyon/olympique-lyonnais-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Olympique Lyon 10-11', img: 'img/retro/l1-lyon/olympique-lyonnais-retro-home-s-xxl.jpg' },
  ],
  'l1-marsella': [
    { nombre: 'Marsella 11-12', img: 'img/retro/l1-marsella/marseille-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Marsella 90-91', img: 'img/retro/l1-marsella/olympique-de-marseille-retro-home-jersey-s-xxl.jpg' },
  ],
  'l1-psg': [
    { nombre: 'PSG 19/20', img: 'img/retro/l1-psg/psg-4-retro-away-s-xxl.jpg' },
    { nombre: 'PSG 91-92', img: 'img/retro/l1-psg/psg-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'PSG 21-22', img: 'img/retro/l1-psg/psg-away-s-xxxl.jpg' },
  ],
  'l2-granada': [
    { nombre: 'Granada 96-98', img: 'img/retro/l2-granada/granada-retro-home-jersey-s-xxl.jpg' },
  ],
  'l2-racing': [
    { nombre: 'Racing de Santander 97-98', img: 'img/retro/l2-racing/racing-de-santander-9798-retro-home-jersey-s-xxl.jpg' },
  ],
  'l2-sporting': [
    { nombre: 'Sporting Gijon 15-16', img: 'img/retro/l2-sporting/sporting-gijon-retro-away-s-xxl.jpg' },
    { nombre: 'Sporting Gijon 09-09', img: 'img/retro/l2-sporting/sporting-gijon-retro-home-size-s-xxl.jpg' },
  ],
  'l2-valladolid': [
    { nombre: 'Real Valladolid 84-85', img: 'img/retro/l2-valladolid/real-valladolid-retro-home-jersey-s-xxl.jpg' },
  ],
  'l2-zaragoza': [
    { nombre: 'Zaragoza 92-93', img: 'img/retro/l2-zaragoza/real-zaragoza-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Zaragoza04-05', img: 'img/retro/l2-zaragoza/zaragoza-retro-away-jersey-s-4xl.jpg' },
    { nombre: 'Zaragoza 83-84', img: 'img/retro/l2-zaragoza/zaragoza-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Zaragoza 01-02', img: 'img/retro/l2-zaragoza/zaragoza-retro-away-s-xxl.jpg' },
    { nombre: 'Zaragoza 99-00', img: 'img/retro/l2-zaragoza/zaragoza-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Zaragoza 95-96', img: 'img/retro/l2-zaragoza/zaragoza-retro-home-s-4xl.jpg' },
    { nombre: 'Zaragoza 96-97', img: 'img/retro/l2-zaragoza/zaragoza-second-retro-away-jersey-s-xxl.jpg' },
  ],
  'll-athletic': [
    { nombre: 'Athletic Bilbao 95-97', img: 'img/retro/ll-athletic/athletic-bilbao-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Athletic Bilbao 11-12', img: 'img/retro/ll-athletic/athletic-bilbao-retro-away-s-xxl.jpg' },
  ],
  'll-atletico': [
    { nombre: 'Atletico Madrid Centenary', img: 'img/retro/ll-atletico/atletico-madrid-centenary-home-jersey-s-xxl.jpg' },
    { nombre: 'Atletico Madrid 90-93', img: 'img/retro/ll-atletico/atletico-madrid-retro-away-jersey-s-4xl.jpg' },
    { nombre: 'Atletico Madrid 11-12', img: 'img/retro/ll-atletico/atletico-madrid-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Atletico Madrid 14-15', img: 'img/retro/ll-atletico/atletico-madrid-retro-away-s-xxl.jpg' },
    { nombre: 'Atletico Madrid 82-83', img: 'img/retro/ll-atletico/atletico-madrid-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Atletico Madrid 96-97 local', img: 'img/retro/ll-atletico/atletico-madrid-retro-home-s-xxl.jpg' },
    { nombre: 'Atletico de Madrid 96-97 visitante', img: 'img/retro/ll-atletico/atletico-de-madrid-retro-third-s-xxl.jpg' },
  ],
  'll-barcelona': [
    { nombre: 'Barcelona 07-08', img: 'img/retro/ll-barcelona/barcelona-player-version-retro-home-jersey-s-3xl.jpg' },
    { nombre: 'Barcelona 13-14 visitante', img: 'img/retro/ll-barcelona/barcelona-player-version-retro-third-jersey-s-3xl.jpg' },
    { nombre: 'Barcelona 95-96', img: 'img/retro/ll-barcelona/barcelona-retro-away-jersey-s-4xl.jpg' },
    { nombre: 'Barcelona 12-13', img: 'img/retro/ll-barcelona/barcelona-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Barcelona 16-17', img: 'img/retro/ll-barcelona/barcelona-retro-away-s-xxl.jpg' },
    { nombre: 'Barcelona 10-11 local', img: 'img/retro/ll-barcelona/barcelona-retro-home-jersey-s-4xl.jpg' },
    { nombre: 'Barcelona 17-18', img: 'img/retro/ll-barcelona/barcelona-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Barcelona 02-03', img: 'img/retro/ll-barcelona/barcelona-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Barcelona 10-11 local', img: 'img/retro/ll-barcelona/barcelona-retro-home-s-4xl.jpg' },
    { nombre: 'Barcelona 01-02', img: 'img/retro/ll-barcelona/barcelona-retro-home-s-xxl.jpg' },
    { nombre: 'Barcelona 13-14 tercera', img: 'img/retro/ll-barcelona/barcelona-retro-third-away-s-xxl.jpg' },
    { nombre: 'Barcelona 08-098', img: 'img/retro/ll-barcelona/barcelona-uefa-champions-league-retro-home-s-xxl.jpg' },
  ],
  'll-betis': [
    { nombre: 'Real Betis 88-89', img: 'img/retro/ll-betis/real-betis-retro-home-s-xxl.jpg' },
  ],
  'll-celta': [
    { nombre: 'Celta de Vigo 02-04', img: 'img/retro/ll-celta/celta-de-vigo-retro-home-s-xxl.jpg' },
  ],
  'll-deportivo': [
    { nombre: 'Deportivo La Coruña 98-99 ', img: 'img/retro/ll-deportivo/deportivo-la-coruna-9899-retro-third-away-s-xxl.jpg' },
    { nombre: 'Deportivo La Coruña 99-00 visitante', img: 'img/retro/ll-deportivo/deportivo-la-coruna-retro-away-s-xxl.jpg' },
    { nombre: 'Deportivo La Coruña 94-95', img: 'img/retro/ll-deportivo/deportivo-la-coruna-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Deportivo La Coruna 99-00 visitante 2', img: 'img/retro/ll-deportivo/deportivo-la-coruna-retro-third-away-s-xxl.jpg' },
    { nombre: 'Deportivo de La Coruna 02-04', img: 'img/retro/ll-deportivo/deportivo-de-la-coruna-retro-home-jersey-s-xxl.jpg' },
  ],
  'll-elche': [
    { nombre: 'Elche 99-00', img: 'img/retro/ll-elche/elche-retro-home-jersey-s-xxl.jpg' },
  ],
  'll-espanyol': [
    { nombre: 'Espanyol 99-00', img: 'img/retro/ll-espanyol/espanyol-retro-home-s-xxl.jpg' },
  ],
  'll-malaga': [
    { nombre: 'Malaga 25-26', img: 'img/retro/ll-malaga/malaga-home-jersey-s-4xl.jpg' },
    { nombre: 'Malaga 97-98', img: 'img/retro/ll-malaga/malaga-retro-away-s-xxl.jpg' },
    { nombre: 'Malaga 98-99', img: 'img/retro/ll-malaga/malaga-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Malaga 12-13', img: 'img/retro/ll-malaga/malaga-retro-third-away-jersey-s-xxl.jpg' },
  ],
  'll-realmadrid': [
    { nombre: 'Real Madrid 12-13', img: 'img/retro/ll-realmadrid/real-madrid-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Real Madrid 86-87', img: 'img/retro/ll-realmadrid/real-madrid-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Real Madrid 17-18', img: 'img/retro/ll-realmadrid/real-madrid-retro-home-s-xxl.jpg' },
    { nombre: 'Real Madrid 99-00 visitante', img: 'img/retro/ll-realmadrid/real-madrid-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Real Madrid 06-07', img: 'img/retro/ll-realmadrid/real-madrid-retro-third-away-s-xxl.jpg' },
    { nombre: 'Real Madrid 16-17', img: 'img/retro/ll-realmadrid/real-madrid-retro-away-s-xxl.jpg' },
    { nombre: 'Real Madrid 99-00 local', img: 'img/retro/ll-realmadrid/real-madrid-retro-home-s-4xl.jpg' },
  ],
  'll-sevilla': [
    { nombre: 'Sevilla FC 92-93', img: 'img/retro/ll-sevilla/sevilla-fc-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Sevilla 94-96', img: 'img/retro/ll-sevilla/sevilla-retro-away-s-4xl.jpg' },
  ],
  'll-valencia': [
    { nombre: 'Valencia 80-82', img: 'img/retro/ll-valencia/valencia-retro-home-s-xxl.jpg' },
    { nombre: 'Valencia 99-00', img: 'img/retro/ll-valencia/valencia-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Valencia 06-07', img: 'img/retro/ll-valencia/valencia-retro-away-s-xxl.jpg' },
  ],
  'll-villarreal': [
    { nombre: 'Villarreal 10-11', img: 'img/retro/ll-villarreal/villarreal-retro-home-s-xxl.jpg' },
  ],
  'mas-besiktas': [
    { nombre: 'Besiktas 96-97', img: 'img/retro/mas-besiktas/besiktas-retro-away-jersey-s-xxl.jpg' },
  ],
  'mas-galatasaray': [
    { nombre: 'Galatasaray 99-00 visitante', img: 'img/retro/mas-galatasaray/galatasaray-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Galatasaray 99-00 local', img: 'img/retro/mas-galatasaray/galatasaray-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Galatasaray 00-01 local', img: 'img/retro/mas-galatasaray/galatasaray-retro-home-s-xxl.jpg' },
    { nombre: 'Galatasaray 98-99', img: 'img/retro/mas-galatasaray/galatasaray-retro-third-away-s-xxl.jpg' },
    { nombre: 'Galatasaray 00-01 visitante', img: 'img/retro/mas-galatasaray/galatasaray-retro-home-size-s-xxl.jpg' },
  ],
  'mas-olympiacos': [
    { nombre: 'Olympiacos 04-05', img: 'img/retro/mas-olympiacos/olympiacos-retro-away-jersey-s-xxl.jpg' },
  ],
  'mundial-alemania': [
    { nombre: 'German Originals Germany Adicolor Classics 3-Stripes', img: 'img/retro/mundial-alemania/german-special-edition-retro-s-3xl.jpg' },
    { nombre: 'Germany 1984 visitante', img: 'img/retro/mundial-alemania/germany-green-retro-s-xxl.jpg' },
    { nombre: 'Germany 2014', img: 'img/retro/mundial-alemania/germany-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Germany 1994', img: 'img/retro/mundial-alemania/germany-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Germany 2006', img: 'img/retro/mundial-alemania/germany-retro-home-s-xxl.jpg' },
    { nombre: 'Germany 1984 local', img: 'img/retro/mundial-alemania/germany-white-retro-s-xxl.jpg' },
    { nombre: 'Germany 2018', img: 'img/retro/mundial-alemania/germany-world-cup-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-argentina': [
    { nombre: 'Argentina 2006', img: 'img/retro/mundial-argentina/argentina-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-brasil': [
    { nombre: 'Brasil Corteiz visitante', img: 'img/retro/mundial-brasil/brazil-retro-away-corteiz-jersey-s-xxl.jpg' },
    { nombre: 'Brasil 2011', img: 'img/retro/mundial-brasil/brazil-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Brasil Corteiz local ', img: 'img/retro/mundial-brasil/brazil-retro-home-corteiz-jersey-s-xxl.jpg' },
    { nombre: 'Brasil 2006', img: 'img/retro/mundial-brasil/brazil-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Brasil 2010', img: 'img/retro/mundial-brasil/brazil-retro-home-s-xxl.jpg' },
  ],
  'mundial-colombia': [
    { nombre: 'Colombia 1990', img: 'img/retro/mundial-colombia/colombia-originals-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Commemorative Edition Colombia Centennial', img: 'img/retro/mundial-colombia/commemorative-edition-colombia-centennial-s-4xl.jpg' },
  ],
  'mundial-croacia': [
    { nombre: 'Croacia 2018', img: 'img/retro/mundial-croacia/croatia-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Croacia 2010-12', img: 'img/retro/mundial-croacia/croatia-retro-away-s-xxl.jpg' },
  ],
  'mundial-espana': [
    { nombre: 'España 1996', img: 'img/retro/mundial-espana/spain-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'España 2010-11', img: 'img/retro/mundial-espana/spain-retro-away-s-xxl.jpg' },
    { nombre: 'España 2010 local', img: 'img/retro/mundial-espana/spain-retro-home-s-xxl.jpg' },
  ],
  'mundial-estados-unidos': [
    { nombre: 'EEUU 1988', img: 'img/retro/mundial-estados-unidos/usa-retro-away-jersey-s-xxl.jpg' },
  ],
  'mundial-francia': [
    { nombre: 'France 120th Anniversary Blue', img: 'img/retro/mundial-francia/france-120th-anniversary-blue-retro-jersey-s-xxl.jpg' },
    { nombre: 'Francia 1984', img: 'img/retro/mundial-francia/france-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Francia 1992-94', img: 'img/retro/mundial-francia/france-retro-home-s-xxl.jpg' },
  ],
  'mundial-italia': [
    { nombre: 'Italia 2006', img: 'img/retro/mundial-italia/italy-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-jamaica': [
    { nombre: 'Jamaica 1998 visitante', img: 'img/retro/mundial-jamaica/jamaica-away-jersey-s-xxl.jpg' },
    { nombre: 'Jamaica 1998 local', img: 'img/retro/mundial-jamaica/jamaica-home-jersey-s-xxl.jpg' },
  ],
  'mundial-japon': [
    { nombre: 'Japon 1998', img: 'img/retro/mundial-japon/japan-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Japon 2018', img: 'img/retro/mundial-japon/japan-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-mexico': [
    { nombre: 'Mexico 1999', img: 'img/retro/mundial-mexico/mexico-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-paises-bajos': [
    { nombre: 'Paises Bajos 1988', img: 'img/retro/mundial-paises-bajos/holland-retro-home-s-xxl.jpg' },
    { nombre: 'Paises Bajos 1994', img: 'img/retro/mundial-paises-bajos/netherlands-retro-home-jersey-s-xxl.jpg' },
  ],
  'mundial-portugal': [
    { nombre: 'Portugal 2016 visitante', img: 'img/retro/mundial-portugal/portugal-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Portugal 1992-94', img: 'img/retro/mundial-portugal/portugal-retro-away-s-xxl.jpg' },
    { nombre: 'Portugal 2016 local', img: 'img/retro/mundial-portugal/portugal-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Portugal 1998', img: 'img/retro/mundial-portugal/portugal-retro-home-s-xxl.jpg' },
    { nombre: 'Portugal 2004', img: 'img/retro/mundial-portugal/portugal-retro-home-s-4xl.jpg' },
  ],
  'mundial-suecia': [
    { nombre: 'Suecia 1994', img: 'img/retro/mundial-suecia/sweden-retro-home-s-xxl.jpg' },
  ],
  'mundial-uruguay': [
    { nombre: 'Uruguay 1990', img: 'img/retro/mundial-uruguay/uruguay-retro-home-jersey.jpg' },
  ],
  'mundial-venezuela': [
    { nombre: 'Venezuela 2000', img: 'img/retro/mundial-venezuela/venezuela-retro-home-jersey-s-xxl.jpg' },
  ],
  'nl-psv': [
    { nombre: 'PSV 93-94', img: 'img/retro/nl-psv/psv-1994-retro-away-s-xxl.jpg' },
    { nombre: '98-99', img: 'img/retro/nl-psv/psv-retro-home-s-xxl.jpg' },
  ],
  'pl-arsenal': [
    { nombre: 'Arsenal 01-02', img: 'img/retro/pl-arsenal/arsenal-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Arsenal 125th Anniversary', img: 'img/retro/pl-arsenal/arsenal-retro-home-125th-anniversary-s-xxl.jpg' },
    { nombre: 'Arsenal 94-96', img: 'img/retro/pl-arsenal/arsenal-retro-home-jersey.jpg' },
    { nombre: 'Arsenal 04-05', img: 'img/retro/pl-arsenal/arsenal-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Arsenal 98-99', img: 'img/retro/pl-arsenal/arsenal-retro-home-s-xxl.jpg' },
    { nombre: 'Arsenal 07-08', img: 'img/retro/pl-arsenal/arsenal-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Arsenal 05-06', img: 'img/retro/pl-arsenal/arsenal-retro-away-s-xxl.jpg' },
  ],
  'pl-chelsea': [
    { nombre: 'Chelsea 10-11', img: 'img/retro/pl-chelsea/chelsea-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Chelsea 14/15', img: 'img/retro/pl-chelsea/chelsea-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Chelsea 11/12', img: 'img/retro/pl-chelsea/chelsea-retro-home-champions-league-player-version-jersey-s-xxl.jpg' },
  ],
  'pl-mancity': [
    { nombre: 'Manchester City 07-08', img: 'img/retro/pl-mancity/manchester-city-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Manchester City 97-98', img: 'img/retro/pl-mancity/manchester-city-retro-away-s-xxl.jpg' },
    { nombre: 'Manchester City 89-90', img: 'img/retro/pl-mancity/manchester-city-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Manchester City 19-20', img: 'img/retro/pl-mancity/manchester-city-retro-home-s-xxl.jpg' },
  ],
  'pl-manutd': [
    { nombre: 'Manchester United 05-06', img: 'img/retro/pl-manutd/manchester-united-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Manchester United 21-22 local', img: 'img/retro/pl-manutd/manchester-united-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Manchester United 06-07', img: 'img/retro/pl-manutd/manchester-united-retro-away-s-xxl.jpg' },
    { nombre: 'Manchester United 17-18', img: 'img/retro/pl-manutd/manchester-united-home-jersey-s-4xl.jpg' },
    { nombre: 'Manchester United 20-21', img: 'img/retro/pl-manutd/manchester-united-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'Manchester United 18-19', img: 'img/retro/pl-manutd/manchester-united-retro-home-s-xxl.jpg' },
    { nombre: 'Manchester United 21-22 visitante', img: 'img/retro/pl-manutd/manchester-united-away-s-xxxl.jpg' },
  ],
  'pl-newcastle': [
    { nombre: 'Newcastle United 98-99', img: 'img/retro/pl-newcastle/newcastle-united-retro-away-s-xxl.jpg' },
  ],
  'pl-tottenham': [
    { nombre: 'Tottenham Hotspur 19-20', img: 'img/retro/pl-tottenham/tottenham-hotspur-retro-home-jersey-s-xxl.jpg' },
  ],
  'pt-benfica': [
    { nombre: 'Benfica 98-99', img: 'img/retro/pt-benfica/benfica-retro-away-s-2xl.jpg' },
  ],
  'pt-porto': [
    { nombre: 'Porto 94-95', img: 'img/retro/pt-porto/porto-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Porto 97-98', img: 'img/retro/pt-porto/porto-retro-home-s-xxl.jpg' },
  ],
  'pt-sporting': [
    { nombre: 'Sporting CP 02-03 Visitante', img: 'img/retro/pt-sporting/sporting-cp-0203-third-away-retro-jersey-s-xxl.jpg' },
    { nombre: 'Sporting CP 00-01', img: 'img/retro/pt-sporting/sporting-cp-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Sporting CP 03-04', img: 'img/retro/pt-sporting/sporting-lisbon-retro-home-jersey-s-xxl.jpg' },
  ],
  'sa-fiorentina': [
    { nombre: 'Fiorentina 97-98', img: 'img/retro/sa-fiorentina/fiorentina-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Fiorentina 99-00', img: 'img/retro/sa-fiorentina/fiorentina-retro-away-s-xxl.jpg' },
  ],
  'sa-inter': [
    { nombre: 'Inter Milan 15-16', img: 'img/retro/sa-inter/inter-milan-player-version-retro-home-jersey-s-3xl.jpg' },
    { nombre: 'Inter Milan 21-22', img: 'img/retro/sa-inter/inter-milan-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'Inter Milan 98-99', img: 'img/retro/sa-inter/inter-milan-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Inter Milan 09-10', img: 'img/retro/sa-inter/inter-milan-retro-home-s-xxl.jpg' },
    { nombre: 'Inter Milan 96-97', img: 'img/retro/sa-inter/inter-milan-retro-third-jersey-s-xxl.jpg' },
    { nombre: 'Inter Milan 92-94', img: 'img/retro/sa-inter/inter-milan-retro-third-away-s-xxl.jpg' },
  ],
  'sa-lazio': [
    { nombre: 'Lazio 92-94', img: 'img/retro/sa-lazio/lazio-retro-away-s-xxl.jpg' },
    { nombre: 'Lazio 99-00', img: 'img/retro/sa-lazio/lazio-retro-home-s-xxl.jpg' },
    { nombre: 'Lazio 98-99', img: 'img/retro/sa-lazio/retro-shirt-lazio-yellow-s-xxl.jpg' },
  ],
  'sa-milan': [
    { nombre: 'AC MILAN 02-03', img: 'img/retro/sa-milan/ac-milan-retro-away-jersey-s-xxl.jpg' },
    { nombre: 'AC Milan 120th Anniversary', img: 'img/retro/sa-milan/ac-milan-120th-anniversary-retro-jersey-s-xxl.jpg' },
    { nombre: 'AC Milan 97-98', img: 'img/retro/sa-milan/ac-milan-retro-away-s-xxl.jpg' },
    { nombre: 'AC Milan 04-05', img: 'img/retro/sa-milan/ac-milan-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'AC Milan 95-96', img: 'img/retro/sa-milan/ac-milan-retro-home-s-xxl.jpg' },
    { nombre: 'AC Milan 06-07', img: 'img/retro/sa-milan/ac-milan-retro-third-away-jersey-s-xxl.jpg' },
    { nombre: 'AC Milan 11-12', img: 'img/retro/sa-milan/ac-milan-retro-home-s-4xl.jpg' },
    { nombre: 'AC Milan Special Edition', img: 'img/retro/sa-milan/ac-milan-special-edition-s-xxl.jpg' },
  ],
  'sa-napoli': [
    { nombre: 'Napoles 90-91 local', img: 'img/retro/sa-napoli/napoli-retro-home-jersey-s-xxl.jpg' },
    { nombre: 'Napoles 90-91 visitante', img: 'img/retro/sa-napoli/napoli-retro-away-s-xxl.jpg' },
    { nombre: 'Napoles 90-91 local 2', img: 'img/retro/sa-napoli/napoli-retro-home-s-xxl.jpg' },
    { nombre: 'Napoles 19-20', img: 'img/retro/sa-napoli/napoli-white-retro-s-xxl.jpg' },
  ],
  'sa-roma': [
    { nombre: 'Roma 1992', img: 'img/retro/sa-roma/roma-retro-third-away-s-xxl.jpg' },
  ],
};

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
// Saneado defensivo: si algún artículo quedó guardado con un precio inválido
// (p. ej. de una versión anterior con recargo por nombre/dorsal), se recalcula
// con el precio base actual para que el carrito y los totales sean correctos.
carrito = carrito.map(it => {
  if (typeof it.precioUnidad !== 'number' || Number.isNaN(it.precioUnidad) || it.precioUnidad <= 0) {
    it.precioUnidad = it.tipo === 'retro' ? PRECIO_RETRO : PRECIO_ACTUAL;
  }
  return it;
});
localStorage.setItem('carritoFutbol', JSON.stringify(carrito));
let productoActivo = null;
let tipoActivo = 'actual';
let versionActiva = 'local';
let retroIndiceActivo = 0;
let ligaActiva = LIGAS[0].id;
let parchesDisponibles = [];

function guardarCarrito() {
  localStorage.setItem('carritoFutbol', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/* =========================================================
   ESCUDOS DISPONIBLES
   Solo se muestran los escudos suministrados que tienen una
   camiseta correspondiente en el catálogo.
========================================================= */
const ESCUDOS = {
  "mundial-alemania": "img/escudos/mundial/alemania.jpg",
  "mundial-arabia-saudi": "img/escudos/mundial/arabiasaudita.jpg",
  "mundial-argelia": "img/escudos/mundial/argelia.jpg",
  "mundial-argentina": "img/escudos/mundial/argentina.jpg",
  "mundial-austria": "img/escudos/mundial/austria.jpg",
  "mundial-belgica": "img/escudos/mundial/belgica.jpg",
  "mundial-brasil": "img/escudos/mundial/brasil.jpg",
  "mundial-cabo-verde": "img/escudos/mundial/caboverde.jpg",
  "mundial-canada": "img/escudos/mundial/canada.jpg",
  "mundial-chequia": "img/escudos/mundial/republicacheca.jpg",
  "mundial-colombia": "img/escudos/mundial/colombia.jpg",
  "mundial-corea-del-sur": "img/escudos/mundial/coreadelsur.jpg",
  "mundial-croacia": "img/escudos/mundial/croacia.jpg",
  "mundial-curazao": "img/escudos/mundial/curazao.jpg",
  "mundial-egipto": "img/escudos/mundial/egipto.jpg",
  "mundial-escocia": "img/escudos/mundial/escocia.jpg",
  "mundial-espana": "img/escudos/mundial/espana.jpg",
  "mundial-estados-unidos": "img/escudos/mundial/estadosunidos.jpg",
  "mundial-francia": "img/escudos/mundial/francia.jpg",
  "mundial-ghana": "img/escudos/mundial/ghana.jpg",
  "mundial-inglaterra": "img/escudos/mundial/inglaterra.jpg",
  "mundial-japon": "img/escudos/mundial/japon.jpg",
  "mundial-jordania": "img/escudos/mundial/jordania.jpg",
  "mundial-marruecos": "img/escudos/mundial/marruecos.jpg",
  "mundial-mexico": "img/escudos/mundial/mexico.jpg",
  "mundial-noruega": "img/escudos/mundial/noruega.jpg",
  "mundial-paises-bajos": "img/escudos/mundial/paisesbajos.jpg",
  "mundial-paraguay": "img/escudos/mundial/paraguay.jpg",
  "mundial-portugal": "img/escudos/mundial/portugal.jpg",
  "mundial-qatar": "img/escudos/mundial/qatar.jpg",
  "mundial-senegal": "img/escudos/mundial/senegal.jpg",
  "mundial-sudafrica": "img/escudos/mundial/sudafrica.jpg",
  "mundial-suecia": "img/escudos/mundial/suecia.jpg",
  "mundial-suiza": "img/escudos/mundial/suiza.jpg",
  "mundial-tunez": "img/escudos/mundial/tunez.jpg",
  "mundial-turquia": "img/escudos/mundial/turquia.jpg",
  "mundial-uruguay": "img/escudos/mundial/uruguay.jpg",
  "pl-manutd": "img/escudos/premier-league/manunited.jpg",
  "pl-mancity": "img/escudos/premier-league/mancity.jpg",
  "pl-liverpool": "img/escudos/premier-league/liverpool.jpg",
  "pl-chelsea": "img/escudos/premier-league/chelsea.jpg",
  "pl-arsenal": "img/escudos/premier-league/arsenal.jpg",
  "pl-tottenham": "img/escudos/premier-league/tottenham.jpg",
  "pl-newcastle": "img/escudos/premier-league/newcastle.jpg",
  "pl-astonvilla": "img/escudos/premier-league/astonvilla.jpg",
  "ll-realmadrid": "img/escudos/laliga/realmadrid.jpg",
  "ll-barcelona": "img/escudos/laliga/barcelona.jpg",
  "ll-atletico": "img/escudos/laliga/atlmadrid.jpg",
  "ll-sevilla": "img/escudos/laliga/sevilla.jpg",
  "ll-espanyol": "img/escudos/laliga/espanyol.jpg",
  "ll-realsociedad": "img/escudos/laliga/realsociedad.jpg",
  "ll-betis": "img/escudos/laliga/betis.jpg",
  "ll-athletic": "img/escudos/laliga/athletic.jpg",
  "ll-valencia": "img/escudos/laliga/valencia.jpg",
  "ll-alaves": "img/escudos/laliga/alaves.jpg",
  "ll-celta": "img/escudos/laliga/celta.jpg",
  "ll-deportivo": "img/escudos/laliga/deportivocoruna.jpg",
  "ll-getafe": "img/escudos/laliga/getafe.jpg",
  "ll-levante": "img/escudos/laliga/levante.jpg",
  "ll-malaga": "img/escudos/laliga/malaga.jpg",
  "ll-osasuna": "img/escudos/laliga/osasuna.jpg",
  "ll-villarreal": "img/escudos/laliga/villarreal.jpg",
  "ll-elche": "img/escudos/laliga/elche.jpg",
  "sa-juventus": "img/escudos/serie-a/juventus.jpg",
  "sa-milan": "img/escudos/serie-a/milan.jpg",
  "sa-inter": "img/escudos/serie-a/inter.jpg",
  "sa-napoli": "img/escudos/serie-a/napoli.jpg",
  "sa-roma": "img/escudos/serie-a/roma.jpg",
  "sa-lazio": "img/escudos/serie-a/lazio.jpg",
  "sa-fiorentina": "img/escudos/serie-a/fiorentina.jpg",
  "sa-torino": "img/escudos/serie-a/torino.jpg",
  "sa-cagliari": "img/escudos/serie-a/cagliari.jpg",
  "sa-bologna": "img/escudos/serie-a/bologna.jpg",
  "sa-atalanta": "img/escudos/serie-a/atalanta.jpg",
  "bl-bayern": "img/escudos/bundesliga/bayernmmunchen.jpg",
  "bl-dortmund": "img/escudos/bundesliga/borussiadortmund.jpg",
  "bl-leipzig": "img/escudos/bundesliga/rbleipzig.jpg",
  "bl-leverkusen": "img/escudos/bundesliga/bayerleverkusen.jpg",
  "bl-frankfurt": "img/escudos/bundesliga/eintrachtfrankfurt.jpg",
  "bl-gladbach": "img/escudos/bundesliga/bmonchengladbach.jpg",
  "bl-stuttgart": "img/escudos/bundesliga/stuttgart.jpg",
  "bl-koln": "img/escudos/bundesliga/koln.jpg",
  "l1-psg": "img/escudos/ligue-1/psg.jpg",
  "l1-marsella": "img/escudos/ligue-1/olympiquemarsella.jpg",
  "l1-lyon": "img/escudos/ligue-1/lyon.jpg",
  "l1-monaco": "img/escudos/ligue-1/monaco.jpg",
  "l1-lille": "img/escudos/ligue-1/lille.jpg",
  "l1-nice": "img/escudos/ligue-1/niza.jpg",
  "l1-rennes": "img/escudos/ligue-1/staderennais.jpg",
  "l1-lens": "img/escudos/ligue-1/racinglens.jpg",
  "l2-racing": "img/escudos/laliga2/racingsantander.jpg",
  "l2-zaragoza": "img/escudos/laliga2/zaragoza.png",
  "l2-sporting": "img/escudos/laliga2/sporting.jpg",
  "l2-eibar": "img/escudos/laliga2/eibar.jpg",
  "l2-tenerife": "img/escudos/laliga2/tenerife.jpg",
  "l2-granada": "img/escudos/laliga2/granada.jpg",
  "l2-valladolid": "img/escudos/laliga2/valladolid.jpg",
  "pt-benfica": "img/escudos/liga-portugal/benfica.jpg",
  "pt-porto": "img/escudos/liga-portugal/porto.jpg",
  "pt-sporting": "img/escudos/liga-portugal/sporting.jpg",
  "pt-braga": "img/escudos/liga-portugal/braga.jpg",
  "mls-lagalaxy": "img/escudos/mls/losangelesgalaxy.jpg",
  "mls-nycfc": "img/escudos/mls/newyorkcity.jpg",
  "mls-montreal": "img/escudos/mls/montreal.jpg",
  "mls-toronto": "img/escudos/mls/toronto.jpg",
  "ar-boca": "img/escudos/argentina/boca.jpg",
  "ar-river": "img/escudos/argentina/river.jpg",
  "sau-alhilal": "img/escudos/saudi/al_hilal.png",
  "sau-alnassr": "img/escudos/saudi/al_nassr.png",
  "mas-olympiacos": "img/escudos/mas/olympiacos.jpg",
  "mas-fenerbahce": "img/escudos/mas/fenerbache.jpg",
  "mas-besiktas": "img/escudos/mas/besiktas.jpeg",
  "mas-galatasaray": "img/escudos/mas/galatasaray.jpg",
  "ch-sunderland": "img/escudos/efl-championship/sunderland.jpg",
  "sb-parma": "img/escudos/serie-b/parma.jpg",
  "sb-venezia": "img/escudos/serie-b/venezia.jpg",
  "b2-hamburgo": "img/escudos/2-bundesliga/hamburgo.jpg",
  "mls-lafc": "img/escudos/mls/lafc.jpg"
};

function escudoSrc(producto) {
  return producto && ESCUDOS[producto.id] ? ESCUDOS[producto.id] : null;
}

function miniCamisetas(producto) {
  const items = [];
  if (producto.imgLocal) items.push({src: producto.imgLocal, label: 'Local'});
  if (producto.imgVisitante) items.push({src: producto.imgVisitante, label: 'Visitante'});
  const retros = retrosDisponibles(producto);
  if (retros.length) items.push({src: retros[0].img, label: 'Retro'});
  return items.slice(0, 3).map(item => `
    <div class="equipo-mini-camiseta" title="${item.label}">
      <img src="${item.src}" alt="${item.label}" loading="lazy">
      <span>${item.label}</span>
    </div>
  `).join('');
}

function renderTeamCards(lista, contenedorId, categoria, soloConEscudo = false) {
  const cont = document.getElementById(contenedorId);
  const visibles = soloConEscudo ? lista.filter(p => escudoSrc(p)) : lista;
  cont.innerHTML = visibles.map(p => {
    const shield = escudoSrc(p);
    const camisetas = miniCamisetas(p);
    const fallback = p.imgLocal || p.imgVisitante;
    return `
      <article class="equipo-escudo-card" data-id="${p.id}" data-categoria="${categoria}">
        <div class="equipo-escudo-card__shield">
          ${shield ? `<img src="${shield}" alt="Escudo de ${p.nombre}" loading="lazy">` : (fallback ? `<img src="${fallback}" alt="Camiseta ${p.nombre}" loading="lazy">` : svgCamiseta(p.c1,p.c2,'mini-camiseta'))}
        </div>
        <div class="equipo-escudo-card__body">
          <h3>${p.nombre}</h3>
          <div class="equipo-mini-camisetas">${camisetas || '<span class="sin-camisetas">Camisetas disponibles en el catálogo</span>'}</div>
          <p class="equipo-escudo-card__cta">Ver camisetas y personalizar →</p>
        </div>
      </article>
    `;
  }).join('') || '<p class="catalogo-vacio">No hay equipos con escudo y camiseta disponibles.</p>';

  cont.querySelectorAll('.equipo-escudo-card').forEach(el => {
    el.addEventListener('click', () => {
      const producto = visibles.find(p => p.id === el.dataset.id);
      if (producto) abrirModalProducto(producto, categoria);
    });
  });
}

/* =========================================================
   RENDER CATÁLOGO
========================================================= */
function renderGrid(lista, contenedorId, categoria) {
  renderTeamCards(lista, contenedorId, categoria, false);
}

/* =========================================================
   MUNDIAL · ESCUDOS + CAMISETAS
========================================================= */
/* =========================================================
   NAVEGACIÓN: Inicio → Mundiales / Ligas → Escudos → Camisetas
   Mundiales: escudos de selecciones → todas sus camisetas.
   Ligas: logos de liga → escudos de sus equipos → todas sus camisetas.
========================================================= */
const R = 'img/escudos/rest/';
const N = ''; // escudos nuevos: están en la raíz de /public (chile.png, botafogo.png...)
Object.assign(ESCUDOS, {
  'sco-aberdeen': R+'aberdeen.png', 'nl-ajax': R+'ajax.png', 'l2-albacete': R+'albacete.png',
  'mas-alahly': R+'al_ahly.png', 'sau-alshabab': R+'al_shabab.webp', 'mx-america': R+'america.png',
  'sco-celtic': R+'celtic.png', 'sb-cremonese': R+'cremonese.png', 'nl-feyenoord': R+'feyenoord.png',
  'b2-dusseldorf': R+'dusseldorf.png', 'sco-hearts': R+'heart_of_midlothian.png', 'b2-hertha': R+'hertha.png',
  'py-olimpia': R+'olimpia.png', 'sb-palermo': R+'palermo.png', 'uy-penarol': R+'penarol.png',
  'ch-portsmouth': R+'portsmouth.png', 'nl-psv': R+'psv.png', 'sco-rangers': R+'rangers.png',
  'sb-sampdoria': R+'sampdoria.png', 'pe-sportingcristal': R+'sportingcristal.png',
  'b2-stpauli': R+'stpauli.png', 'mx-tijuana': R+'tijuana.png',
  'br-botafogo': N+'botafogo.png', 'br-corinthians': N+'corinthians.png', 'br-palmeiras': N+'palmeiras.png',
  'br-gremio': N+'gremio.png', 'br-flamengo': N+'flamengo.png', 'br-internacional': N+'internacional.png',
  'br-fluminense': N+'fluminense.png', 'br-santos': N+'santos.png', 'br-saopaulo': N+'saopaulo.png',
  'b2-nuremberg': N+'nurnberg.png', 'sau-alittihad': N+'al_ittihad.jpg',
  'mundial-islandia': N+'islandia.png', 'mundial-venezuela': N+'venezuela.png', 'mundial-ucrania': N+'ucrania.png',
  'mundial-costa-rica': N+'costa_rica.png', 'mundial-gales': N+'gales.png', 'mundial-jamaica': N+'jamaica.svg',
  'mundial-italia': N+'italia.png', 'mundial-peru': N+'peru.png', 'mundial-hungria': N+'hungria.png',
  'mundial-chile': N+'chile.png', 'mundial-mali': N+'mali.png'
});
// Logos de liga: todos en la raíz de /public
const LOGOS_LIGA = {
  'bundesliga': 'alemania.png', 'argentina-lpf': 'argentina.png', 'brasileirao': 'brasil.png', 'scottish-premiership': 'escocia.png',
  'laliga': 'espana.png', 'ligue-1': 'francia.png', 'premier-league': 'inglaterra.png', 'serie-a': 'italia%20(1).png',
  'mas': 'mas_equipos.png', 'liga-mx': 'mexico.png', 'eredivisie': 'paisesbajos.png', 'liga-portugal': 'portugal.png',
  'otras-sudamerica': 'sudamerica.jpg', 'serie-b': 'serieb.png', 'efl-championship': 'efl.png', 'mls': 'mls.png',
  'laliga2': 'liga2.png', '2-bundesliga': 'bundes2.png', 'saudi-league': 'arabia.png'
};
function logoLiga(l) {
  return LOGOS_LIGA[l.id] || `img/escudos/ligas-${l.id}.svg`;
}
// Retro suelto que estaba en la carpeta pero no en el catálogo
(RETRO_PRODUCTOS['nl-psv'] = RETRO_PRODUCTOS['nl-psv'] || []);
if (!RETRO_PRODUCTOS['nl-psv'].some(r => r.img.includes('psv-eindhoven-retro-home'))) {
  RETRO_PRODUCTOS['nl-psv'].push({ nombre: 'PSV Eindhoven retro local', img: 'img/retro/nl-psv/psv-eindhoven-retro-home-jersey-s-xxl.jpg' });
}
// Se mantienen por compatibilidad con el buscador (ya no hay pestañas de liga)
function renderLigasTabs() {}
function renderEquiposGrid() {}

const vista = document.getElementById('vistaCat');
const pilaVistas = [];

function pintarVista() {
  const v = pilaVistas[pilaVistas.length - 1];
  document.getElementById('vistaTitulo').textContent = v.titulo;
  document.getElementById('vistaVolver').style.visibility = pilaVistas.length > 1 ? 'visible' : 'hidden';
  const body = document.getElementById('vistaBody');
  v.render(body);
  body.scrollTop = 0;
}
function abrirVista(titulo, render) {
  pilaVistas.push({ titulo, render });
  pintarVista();
  vista.classList.add('abierto');
  document.body.style.overflow = 'hidden';
}
function cerrarVista() {
  pilaVistas.length = 0;
  vista.classList.remove('abierto');
  document.body.style.overflow = '';
}
function volverVista() {
  pilaVistas.pop();
  if (pilaVistas.length) pintarVista(); else cerrarVista();
}
document.getElementById('vistaVolver').addEventListener('click', volverVista);
document.getElementById('vistaCerrar').addEventListener('click', cerrarVista);

// Todas las camisetas de un equipo: local, visitante y todas las retro.
function camisetasDe(t) {
  const lista = [];
  if (t.imgLocal) lista.push({ nombre: t.nombre + ' · Local', img: t.imgLocal, retro: false });
  if (t.imgVisitante) lista.push({ nombre: t.nombre + ' · Visitante', img: t.imgVisitante, retro: false });
  (RETRO_PRODUCTOS[t.id] || []).forEach(r => lista.push({
    nombre: r.nombre.charAt(0).toUpperCase() + r.nombre.slice(1), img: r.img, retro: true
  }));
  return lista;
}

function itemEscudo(img, nombre, sub, alt) {
  return `<button type="button" class="escudo-item"><span class="escudo-item__img">${img}</span><strong>${nombre}</strong><small>${sub}</small></button>`;
}

function gridEscudos(body, equipos, categoria) {
  body.innerHTML = '<div class="vista__grid">' + equipos.map(t => {
    const s = escudoSrc(t), f = t.imgLocal || t.imgVisitante, n = camisetasDe(t).length;
    const img = s ? `<img src="${s}" alt="Escudo de ${t.nombre}" loading="lazy">`
      : (f ? `<img class="es-camiseta" src="${f}" alt="${t.nombre}" loading="lazy">` : svgCamiseta(t.c1 || '#1f5c3a', t.c2 || '#fff', 'mini-camiseta'));
    return itemEscudo(img, t.nombre, n ? `${n} camiseta${n > 1 ? 's' : ''}` : 'Próximamente');
  }).join('') + '</div>';
  body.querySelectorAll('.escudo-item').forEach((b, i) => b.addEventListener('click', () => abrirCamisetasEquipo(equipos[i], categoria)));
}

function abrirCamisetasEquipo(t, categoria) {
  abrirVista(t.nombre, body => {
    const lista = camisetasDe(t);
    if (!lista.length) { body.innerHTML = '<p class="catalogo-vacio">Las camisetas de este equipo llegarán pronto.</p>'; return; }
    body.innerHTML = '<div class="vista__grid vista__grid--camis">' + lista.map(c => `
      <button type="button" class="camiseta-item">
        <span class="camiseta-item__img"><img src="${c.img}" alt="${c.nombre}" loading="lazy"></span>
        <strong>${c.nombre}</strong><small>${c.retro ? PRECIO_RETRO : PRECIO_ACTUAL} €</small>
      </button>`).join('') + '</div>';
    body.querySelectorAll('.camiseta-item').forEach((b, i) => b.addEventListener('click', () => comprarCamiseta(t, categoria, lista[i], i)));
  });
}

// Abre la ficha de compra de UNA camiseta concreta, sin selector Actual/Retro:
// el tipo (y el precio) lo marca la propia camiseta elegida.
function comprarCamiseta(t, categoria, c, i) {
  abrirModalProducto({ id: t.id + '__' + i, nombre: c.nombre, c1: t.c1 || '#1f5c3a', c2: t.c2 || '#ffffff', imgLocal: c.img, imgVisitante: null }, categoria);
  tipoActivo = c.retro ? 'retro' : 'actual';
  document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b.dataset.tipo === tipoActivo));
  document.getElementById('prodTipo').parentElement.style.display = 'none';
  actualizarPrecioModal();
}

function abrirMundiales() {
  abrirVista('🌍 Mundiales', body => gridEscudos(body, SELECCIONES, 'Selección'));
}
function abrirLigas() {
  abrirVista('🏆 Ligas', body => {
    body.innerHTML = '<div class="vista__grid">' + LIGAS.map(l =>
      itemEscudo(`<img src="${logoLiga(l)}" alt="Logo de ${l.nombre}" loading="lazy">`, l.nombre, `${l.equipos.length} equipos`)
    ).join('') + '</div>';
    body.querySelectorAll('.escudo-item').forEach((b, i) => b.addEventListener('click', () => {
      const liga = LIGAS[i];
      abrirVista(liga.nombre, cuerpo => gridEscudos(cuerpo, liga.equipos, liga.nombre));
    }));
  });
}

document.getElementById('hubMundiales').addEventListener('click', abrirMundiales);
document.getElementById('hubLigas').addEventListener('click', abrirLigas);
document.getElementById('hubNumMundial').textContent = SELECCIONES.length + ' selecciones';
document.getElementById('hubNumLigas').textContent = LIGAS.length + ' ligas · ' + LIGAS.reduce((n, l) => n + l.equipos.length, 0) + ' equipos';
document.getElementById('hubLogosMundial').innerHTML = ['espana', 'argentina', 'francia', 'brasil'].map(n => `<img src="img/escudos/mundial/${n}.jpg" alt="">`).join('');
document.getElementById('hubLogosLigas').innerHTML = ['inglaterra', 'espana', 'italia', 'alemania'].map(n => `<img src="img/escudos/ligas/${n}.png" alt="">`).join('');
// Los enlaces antiguos "Ver selecciones" / "Ver equipos" abren directamente estas pantallas
document.querySelectorAll('a[href="#selecciones"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); abrirMundiales(); }));
document.querySelectorAll('a[href="#equipos"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); abrirLigas(); }));

// Selector de prefijo + restricción numérica en el teléfono del checkout
poblarSelectorPrefijos('clienteTelefonoPrefijo', '+34');
limitarNumeroTelefono('clienteTelefono');

/* =========================================================
   MODAL PRODUCTO
========================================================= */
const overlayProducto = document.getElementById('overlayProducto');

function esSeleccionNacional(categoria) {
  return categoria === 'Selección';
}

function calcularParchesDisponibles(categoria) {
  if (esSeleccionNacional(categoria)) {
    return [{ id: 'mundial', nombre: 'Parche del Mundial' }];
  }
  // Equipo de club de liga sin competiciones UEFA: solo el parche de su liga.
  if (LIGAS_SIN_COMPETICIONES_EUROPEAS.includes(categoria)) {
    return [{ id: 'liga', nombre: 'Parche ' + categoria }];
  }
  // Resto de equipos de club: parche de su propia liga + las tres competiciones europeas.
  return [
    { id: 'liga', nombre: 'Parche ' + categoria },
    ...PARCHES_COMPETICIONES_EUROPEAS.map(p => ({ id: p.id, nombre: 'Parche ' + p.nombre })),
  ];
}

function renderParchesModal() {
  const wrap = document.getElementById('prodParchesWrap');
  const lista = document.getElementById('prodParchesLista');

  if (parchesDisponibles.length === 0) {
    wrap.classList.remove('visible');
    lista.innerHTML = '';
    return;
  }

  wrap.classList.add('visible');
  lista.innerHTML = parchesDisponibles.map(p => `
    <label class="parche-opcion">
      <input type="checkbox" class="prod-parche-check" value="${p.id}" data-nombre="${p.nombre}">
      <span>${p.nombre}</span>
      <small>Gratis</small>
    </label>
  `).join('');

  lista.querySelectorAll('.prod-parche-check').forEach(chk => {
    chk.addEventListener('change', actualizarPrecioModal);
  });
}

function tieneVersionesMundial(producto) {
  return !!(producto.imgLocal || producto.imgVisitante);
}

// Devuelve la lista de modelos retro reales disponibles para un producto (o [] si no hay).
function retrosDisponibles(producto) {
  return (producto && RETRO_PRODUCTOS[producto.id]) || [];
}

function actualizarPreviewCamiseta() {
  const cont = document.getElementById('previewCamiseta');
  const esRetro = tipoActivo === 'retro';
  const retros = retrosDisponibles(productoActivo);

  cont.classList.remove('camiseta-preview--retro');

  if (esRetro && retros.length) {
    const retro = retros[retroIndiceActivo] || retros[0];
    cont.innerHTML = `<img src="${retro.img}" alt="Camiseta retro ${productoActivo.nombre} - ${retro.nombre}" class="camiseta-preview__foto">`;
    return;
  }

  if (tieneVersionesMundial(productoActivo)) {
    const src = versionActiva === 'visitante'
      ? (productoActivo.imgVisitante || productoActivo.imgLocal)
      : (productoActivo.imgLocal || productoActivo.imgVisitante);
    cont.innerHTML = `<img src="${src}" alt="Camiseta ${productoActivo.nombre} - ${versionActiva === 'visitante' ? 'Visitante' : 'Local'}" class="camiseta-preview__foto">`;
  } else {
    cont.innerHTML = svgCamiseta(productoActivo.c1, productoActivo.c2, 'camiseta-preview');
  }
}

// Muestra u oculta el botón "Retro" según si el equipo tiene camisetas
// retro reales disponibles, y oculta el selector Local/Visitante en
// cuanto se está viendo la versión retro (cada modelo retro ya indica
// en su propio nombre si es local o visitante).
function actualizarVisibilidadTipo() {
  const btnRetro = document.querySelector('#prodTipo button[data-tipo="retro"]');
  const wrapVersion = document.getElementById('prodVersionMundialWrap');
  const tieneRetro = retrosDisponibles(productoActivo).length > 0;
  const tieneAmbasVersiones = !!(productoActivo.imgLocal && productoActivo.imgVisitante);

  btnRetro.style.display = tieneRetro ? '' : 'none';

  if (tipoActivo === 'retro') {
    wrapVersion.style.display = 'none';
  } else {
    wrapVersion.style.display = tieneAmbasVersiones ? '' : 'none';
  }
}

// Selector de modelo retro: solo se muestra si el equipo tiene más de una
// camiseta retro real disponible (fotos reales de producto, sin filtro).
function actualizarSelectorRetro() {
  const wrap = document.getElementById('prodRetroWrap');
  const select = document.getElementById('prodRetroSelect');
  const retros = retrosDisponibles(productoActivo);

  if (tipoActivo === 'retro' && retros.length > 1) {
    select.innerHTML = retros.map((r, i) => `<option value="${i}">${r.nombre}</option>`).join('');
    select.value = String(retroIndiceActivo);
    wrap.style.display = '';
  } else {
    wrap.style.display = 'none';
  }
}

function abrirModalProducto(producto, categoria) {
  document.getElementById('prodTipo').parentElement.style.display = '';
  productoActivo = producto;
  tipoActivo = 'actual';
  retroIndiceActivo = 0;
  parchesDisponibles = calcularParchesDisponibles(categoria);

  document.getElementById('prodCategoria').textContent = categoria;
  document.getElementById('prodNombre').textContent = producto.nombre;
  document.getElementById('prodNombreTexto').value = '';
  document.getElementById('prodDorsal').value = '';
  document.getElementById('prodTalla').value = 'M';
  document.getElementById('prodCantidad').value = 1;

  document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b.dataset.tipo === 'actual'));

  // Selector Local / Visitante: solo se muestra si el producto tiene ambas fotos
  // (y solo en la versión Actual; en Retro cada modelo ya indica local/visitante).
  if (producto.imgLocal && producto.imgVisitante) {
    versionActiva = 'local';
    document.querySelectorAll('#prodVersionMundial button').forEach(b => b.classList.toggle('activo', b.dataset.version === 'local'));
  } else {
    versionActiva = producto.imgVisitante && !producto.imgLocal ? 'visitante' : 'local';
  }
  actualizarVisibilidadTipo();
  actualizarSelectorRetro();
  actualizarPreviewCamiseta();

  renderParchesModal();
  actualizarPrecioModal();
  overlayProducto.classList.add('abierto');
}

document.querySelectorAll('#prodVersionMundial button').forEach(btn => {
  btn.addEventListener('click', () => {
    versionActiva = btn.dataset.version;
    document.querySelectorAll('#prodVersionMundial button').forEach(b => b.classList.toggle('activo', b === btn));
    actualizarPreviewCamiseta();
  });
});

document.querySelectorAll('#prodTipo button').forEach(btn => {
  btn.addEventListener('click', () => {
    tipoActivo = btn.dataset.tipo;
    retroIndiceActivo = 0;
    document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b === btn));
    actualizarVisibilidadTipo();
    actualizarSelectorRetro();
    actualizarPreviewCamiseta();
    actualizarPrecioModal();
  });
});

document.getElementById('prodRetroSelect').addEventListener('change', (e) => {
  retroIndiceActivo = parseInt(e.target.value, 10) || 0;
  actualizarPreviewCamiseta();
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

function obtenerParchesSeleccionados() {
  return Array.from(document.querySelectorAll('.prod-parche-check:checked'))
    .map(chk => chk.dataset.nombre);
}

function calcularPrecioUnidad() {
  // El nombre y el dorsal van incluidos en el precio de la camiseta, sin coste extra.
  return tipoActivo === 'retro' ? PRECIO_RETRO : PRECIO_ACTUAL;
}

function actualizarPrecioModal() {
  const cantidad = Math.max(1, parseInt(document.getElementById('prodCantidad').value || '1', 10));
  const precioUnidad = calcularPrecioUnidad();
  const precioConOferta = calcularPrecioPorTipo(cantidad, tipoActivo);

  document.getElementById('prodPrecioTotal').textContent = precioConOferta.toFixed(2) + ' €';
  if (precioConOferta < precioUnidad * cantidad) {
    document.getElementById('prodPrecioUnidad').textContent = `(oferta por cantidad aplicada, antes ${(precioUnidad * cantidad).toFixed(2)} €)`;
  } else {
    document.getElementById('prodPrecioUnidad').textContent = `(${precioUnidad.toFixed(2)} €/ud)`;
  }
}

document.getElementById('prodNombreTexto').addEventListener('input', actualizarPrecioModal);
document.getElementById('prodDorsal').addEventListener('input', actualizarPrecioModal);

document.getElementById('btnAnadirCarrito').addEventListener('click', () => {
  const cantidad = Math.max(1, parseInt(document.getElementById('prodCantidad').value || '1', 10));
  const precioUnidad = calcularPrecioUnidad();

  const esMundial = tieneVersionesMundial(productoActivo);
  const tieneAmbasVersiones = !!(productoActivo.imgLocal && productoActivo.imgVisitante);
  const etiquetaVersion = esMundial ? (versionActiva === 'visitante' ? 'Visitante' : 'Local') : '';
  const retros = retrosDisponibles(productoActivo);
  const esRetroConFoto = tipoActivo === 'retro' && retros.length > 0;
  const retroElegida = esRetroConFoto ? (retros[retroIndiceActivo] || retros[0]) : null;
  const imgSrc = retroElegida
    ? retroElegida.img
    : (esMundial
      ? (versionActiva === 'visitante' ? (productoActivo.imgVisitante || productoActivo.imgLocal) : (productoActivo.imgLocal || productoActivo.imgVisitante))
      : null);

  carrito.push({
    idLinea: 'l' + Date.now() + Math.random().toString(16).slice(2),
    equipoId: productoActivo.id,
    // Si hay ambas versiones, se indica cuál se ha elegido en el propio nombre
    // del equipo, así queda reflejado también en el email del pedido.
    equipo: productoActivo.nombre
      + (retroElegida ? ` (${retroElegida.nombre})` : (tieneAmbasVersiones ? ` (${etiquetaVersion})` : '')),
    c1: productoActivo.c1,
    c2: productoActivo.c2,
    imgSrc,
    tipo: tipoActivo,
    nombreCamiseta: document.getElementById('prodNombreTexto').value.trim().toUpperCase(),
    dorsal: document.getElementById('prodDorsal').value,
    talla: document.getElementById('prodTalla').value,
    parches: obtenerParchesSeleccionados(),
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

/* Gastos de envío: 5 € para pedidos de menos de 6 camisetas.
   A partir de 6 camisetas (inclusive), el envío es gratis.
   (No se aplica al amigo invisible.) */
const ENVIO_COSTE = 5;
const ENVIO_UNIDADES_GRATIS = 6;

function calcularEnvio(items) {
  const unidades = items.reduce((s, it) => s + it.cantidad, 0);
  if (unidades === 0) return 0;
  return unidades < ENVIO_UNIDADES_GRATIS ? ENVIO_COSTE : 0;
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
        <div class="item-carrito__icono">${it.imgSrc ? `<img src="${it.imgSrc}" alt="${it.equipo}" class="item-carrito__foto">` : svgCamiseta(it.c1, it.c2, 'item-carrito__icono')}</div>
        <div class="item-carrito__info">
          <h5>${it.equipo} · ${it.tipo === 'retro' ? 'Retro' : 'Actual'}</h5>
          <p>Talla ${it.talla} ${it.nombreCamiseta ? '· ' + it.nombreCamiseta : ''} ${it.dorsal ? '· Nº' + it.dorsal : ''} · x${it.cantidad}</p>
          ${it.parches && it.parches.length ? `<p class="item-carrito__parches">Parches: ${it.parches.join(', ')}</p>` : ''}
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

  const sinDescuento = carrito.reduce((s, it) => s + it.precioUnidad * it.cantidad, 0);
  const subtotal = calcularSubtotalConOfertas(carrito);
  const descuento = sinDescuento - subtotal;
  const envio = calcularEnvio(carrito);

  const filaDescuento = document.getElementById('resDescuentoWrap');
  if (descuento > 0.004) {
    filaDescuento.style.display = '';
    document.getElementById('resDescuento').textContent = '-' + descuento.toFixed(2) + ' €';
  } else {
    filaDescuento.style.display = 'none';
  }

  document.getElementById('resSubtotal').textContent = subtotal.toFixed(2) + ' €';
  document.getElementById('resEnvio').textContent = envio > 0 ? envio.toFixed(2) + ' €' : 'Gratis';
  document.getElementById('resTotal').textContent = (subtotal + envio).toFixed(2) + ' €';

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

  const subtotal = calcularSubtotalConOfertas(carrito);
  const envio = calcularEnvio(carrito);
  const total = subtotal + envio;

  const prefijoTelefono = document.getElementById('clienteTelefonoPrefijo').value;
  const numeroTelefono = document.getElementById('clienteTelefono').value.trim();

  const pedido = {
    items: carrito,
    subtotal,
    envio,
    total,
    cliente: {
      nombre: document.getElementById('clienteNombre').value.trim(),
      direccion: document.getElementById('clienteDireccion').value.trim(),
      telefono: numeroTelefono ? `${prefijoTelefono} ${numeroTelefono}` : '',
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
      estado.textContent = `¡Pedido #${data.pedidoId} enviado! Recuerda enviar el pago por PayPal a trakeballer@gmail.com (sin poner concepto) y mandarnos el comprobante y el número de pedido a ese mismo correo.`;
      carrito = [];
      guardarCarrito();
      document.getElementById('formEnvio').reset();
      setTimeout(() => {
        document.getElementById('formEnvio').classList.remove('mostrar');
        document.getElementById('btnIrEnvio').style.display = 'block';
        overlayCarrito.classList.remove('abierto');
        estado.textContent = '';
      }, 8000);
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

// Tallas disponibles: id del input -> etiqueta que se manda en el pedido
const TALLAS_AMIGO = [
  { input: 'amigoCantidadXS', talla: 'XS' },
  { input: 'amigoCantidadS', talla: 'S' },
  { input: 'amigoCantidadM', talla: 'M' },
  { input: 'amigoCantidadL', talla: 'L' },
  { input: 'amigoCantidadXL', talla: 'XL' },
  { input: 'amigoCantidadXXL', talla: 'XXL' },
  { input: 'amigoCantidadNino8', talla: 'Niño 8' },
  { input: 'amigoCantidadNino10', talla: 'Niño 10' },
  { input: 'amigoCantidadNino12', talla: 'Niño 12' }
];

/* Enviar el pedido del amigo invisible (dispara el email al correo general) */
document.getElementById('btnAmigoEnviarPedido').addEventListener('click', async () => {
  const estado = document.getElementById('amigoEstadoPedido');
  const boton = document.getElementById('btnAmigoEnviarPedido');

  const numPersonas = Math.max(1, parseInt(document.getElementById('amigoNumPersonas').value, 10) || 1);
  const observaciones = document.getElementById('amigoObservaciones').value.trim();
  const nombreComprador = document.getElementById('amigoCompradorNombre').value.trim();
  const contacto = document.getElementById('amigoCompradorContacto').value.trim();

  const precioUnidad = 25;
  const items = TALLAS_AMIGO
    .map(t => ({
      talla: t.talla,
      cantidad: Math.max(0, parseInt(document.getElementById(t.input).value, 10) || 0)
    }))
    .filter(t => t.cantidad > 0)
    .map(t => ({
      equipo: 'Amigo invisible (camiseta al azar)',
      tipo: 'actual',
      talla: t.talla,
      dorsal: '',
      nombreCamiseta: '',
      cantidad: t.cantidad,
      precioUnidad,
      idLinea: 'ai-' + t.talla + '-' + Date.now()
    }));

  if (items.length === 0) {
    estado.className = 'form-envio__estado error';
    estado.textContent = 'Indica la cantidad de camisetas que necesitas en al menos una talla.';
    return;
  }
  if (!nombreComprador || !contacto) {
    estado.className = 'form-envio__estado error';
    estado.textContent = 'Indica tu nombre y un teléfono o email de contacto.';
    return;
  }

  const total = calcularSubtotalConOfertas(items);
  const esEmail = contacto.includes('@');

  const pedido = {
    tipo: 'amigo-invisible',
    notas: `Pedido del amigo invisible para ${numPersonas} persona(s). Las camisetas se eligen al azar (sin equipo, nombre ni dorsal).${observaciones ? ` Observaciones del cliente: ${observaciones}` : ''}`,
    items,
    total,
    cliente: {
      nombre: nombreComprador,
      direccion: 'Pedido de amigo invisible (sin envío individual, coordinar entrega en grupo)',
      telefono: esEmail ? '' : contacto,
      email: esEmail ? contacto : ''
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
      estado.textContent = `¡Pedido #${data.pedidoId} enviado! Recuerda enviar el pago por PayPal a trakeballer@gmail.com (sin poner concepto) y mandarnos el comprobante y el número de pedido a ese mismo correo.`;
      TALLAS_AMIGO.forEach(t => { document.getElementById(t.input).value = 0; });
      document.getElementById('amigoNumPersonas').value = 1;
      document.getElementById('amigoObservaciones').value = '';
      document.getElementById('amigoCompradorNombre').value = '';
      document.getElementById('amigoCompradorContacto').value = '';
    } else {
      estado.className = 'form-envio__estado error';
      estado.textContent = data.error || 'No se pudo enviar el pedido.';
    }
  } catch (err) {
    estado.className = 'form-envio__estado error';
    estado.textContent = 'Error de conexión. Inténtalo de nuevo.';
  } finally {
    boton.disabled = false;
  }
});

/* =========================================================
   SUGERENCIA DE CAMISETA
========================================================= */
const formSugerencia = document.getElementById('formSugerencia');
if (formSugerencia) {
  formSugerencia.addEventListener('submit', async (e) => {
    e.preventDefault();
    const boton = document.getElementById('btnSugerencia');
    const estado = document.getElementById('estadoSugerencia');
    const mensaje = document.getElementById('sugerenciaMensaje').value.trim();

    if (!mensaje) {
      estado.className = 'form-envio__estado error';
      estado.textContent = 'Cuéntanos qué camiseta te falta.';
      return;
    }

    boton.disabled = true;
    estado.className = 'form-envio__estado';
    estado.textContent = 'Enviando sugerencia...';

    try {
      const resp = await fetch('/api/sugerencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje,
          nombre: document.getElementById('sugerenciaNombre').value.trim(),
          email: document.getElementById('sugerenciaEmail').value.trim()
        })
      });
      const data = await resp.json();

      if (data.ok) {
        estado.className = 'form-envio__estado ok';
        estado.textContent = '¡Gracias! Hemos recibido tu sugerencia.';
        formSugerencia.reset();
      } else {
        estado.className = 'form-envio__estado error';
        estado.textContent = data.error || 'No se pudo enviar la sugerencia.';
      }
    } catch (err) {
      estado.className = 'form-envio__estado error';
      estado.textContent = 'Error de conexión. Inténtalo de nuevo.';
    } finally {
      boton.disabled = false;
    }
  });
}

/* =========================================================
   BUSCADOR DE PRODUCTOS
   Junta selecciones + todos los equipos de todas las ligas en un
   único índice, para poder buscar por nombre desde la cabecera.
========================================================= */
(function initBuscador() {
  const btnAbrir = document.getElementById('btnAbrirBuscador');
  const btnCerrar = document.getElementById('btnCerrarBuscador');
  const searchBar = document.getElementById('searchBar');
  const input = document.getElementById('inputBuscador');
  const resultados = document.getElementById('searchResultados');
  if (!btnAbrir || !searchBar) return;

  const indice = [
    ...SELECCIONES.map(p => ({ producto: p, categoria: 'Selección' })),
    ...LIGAS.flatMap(l => l.equipos.map(p => ({ producto: p, categoria: l.nombre }))),
    // Modelos retro reales: se indexan aparte para poder encontrarlos también
    // por el nombre del modelo (p.ej. "Barcelona Home" o solo "Retro").
    ...LIGAS.flatMap(l => l.equipos.flatMap(p =>
      retrosDisponibles(p).map((r, i) => ({
        producto: p, categoria: l.nombre, esRetro: true, retroIndice: i,
        nombreBusqueda: `${p.nombre} ${r.nombre} Retro`, retro: r,
      }))
    )),
    ...SELECCIONES.flatMap(p =>
      retrosDisponibles(p).map((r, i) => ({
        producto: p, categoria: 'Selección', esRetro: true, retroIndice: i,
        nombreBusqueda: `${p.nombre} ${r.nombre} Retro`, retro: r,
      }))
    ),
  ];

  function abrirBuscador() {
    searchBar.classList.add('abierto');
    input.value = '';
    resultados.innerHTML = '';
    setTimeout(() => input.focus(), 50);
  }
  function cerrarBuscador() {
    searchBar.classList.remove('abierto');
  }

  btnAbrir.addEventListener('click', abrirBuscador);
  btnCerrar.addEventListener('click', cerrarBuscador);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      resultados.innerHTML = '';
      return;
    }
    const encontrados = indice.filter(it => (it.nombreBusqueda || it.producto.nombre).toLowerCase().includes(q)).slice(0, 20);
    if (encontrados.length === 0) {
      resultados.innerHTML = '<p class="search-resultados__vacio">No hemos encontrado ninguna camiseta con ese nombre.</p>';
      return;
    }
    resultados.innerHTML = encontrados.map((it, i) => {
      const foto = it.esRetro ? it.retro.img : (it.producto.imgLocal || it.producto.imgVisitante);
      const visual = foto
        ? `<img src="${foto}" alt="" class="search-resultado__foto" loading="lazy">`
        : svgCamiseta(it.producto.c1, it.producto.c2, 'search-resultado__svg');
      const titulo = it.esRetro ? `${it.producto.nombre} · ${it.retro.nombre}` : it.producto.nombre;
      const subtitulo = it.esRetro ? `${it.categoria} · Retro` : it.categoria;
      return `
      <button type="button" class="search-resultado" data-indice="${i}">
        ${visual}
        <span class="search-resultado__info">
          <strong>${titulo}</strong>
          <small>${subtitulo}</small>
        </span>
      </button>`;
    }).join('');

    resultados.querySelectorAll('.search-resultado').forEach(btn => {
      btn.addEventListener('click', () => {
        const it = encontrados[Number(btn.dataset.indice)];
        cerrarBuscador();
        // Si es un equipo de liga (no selección), activamos su liga en los
        // tabs para que quede coherente si el usuario vuelve a esa sección.
        const liga = LIGAS.find(l => l.equipos.includes(it.producto));
        if (liga) {
          ligaActiva = liga.id;
          renderLigasTabs();
          renderEquiposGrid();
        }
        abrirModalProducto(it.producto, it.categoria);
        if (it.esRetro) {
          tipoActivo = 'retro';
          retroIndiceActivo = it.retroIndice;
          document.querySelectorAll('#prodTipo button').forEach(b => b.classList.toggle('activo', b.dataset.tipo === 'retro'));
          actualizarVisibilidadTipo();
          actualizarSelectorRetro();
          actualizarPreviewCamiseta();
          actualizarPrecioModal();
        }
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarBuscador();
  });
})();

/* =========================================================
   RESEÑAS DE CLIENTES
========================================================= */
(function initResenas() {
  const lista = document.getElementById('listaResenas');
  const form = document.getElementById('formResena');
  if (!lista) return;

  function renderEstrellas(valor) {
    return '★★★★★☆☆☆☆☆'.slice(5 - valor, 10 - valor);
  }

  async function cargarResenas() {
    try {
      const resp = await fetch('/api/resenas');
      const data = await resp.json();
      if (!data.ok || !data.resenas.length) {
        lista.innerHTML = '<p class="resenas__vacio">Todavía no hay reseñas. ¡Sé el primero en dejar la tuya!</p>';
        return;
      }
      lista.innerHTML = data.resenas.map(r => `
        <div class="resena">
          <div class="resena__cabecera">
            <strong>${r.nombre}</strong>
            <span class="resena__estrellas" aria-label="${r.valoracion} de 5 estrellas">${renderEstrellas(r.valoracion)}</span>
          </div>
          <p class="resena__mensaje">${r.mensaje}</p>
          <small class="resena__fecha">${r.fecha}</small>
        </div>
      `).join('');
    } catch (err) {
      lista.innerHTML = '<p class="resenas__vacio">No se han podido cargar las reseñas ahora mismo.</p>';
    }
  }

  cargarResenas();

  if (form) {
    let valoracionElegida = 0;
    const botonesEstrellas = document.querySelectorAll('.resena-estrella');
    const inputValoracion = document.getElementById('resenaValoracion');

    function pintarEstrellas(valor) {
      botonesEstrellas.forEach(b => b.classList.toggle('activa', Number(b.dataset.valor) <= valor));
    }

    botonesEstrellas.forEach(btn => {
      btn.addEventListener('click', () => {
        valoracionElegida = Number(btn.dataset.valor);
        inputValoracion.value = valoracionElegida;
        pintarEstrellas(valoracionElegida);
      });
      btn.addEventListener('mouseenter', () => pintarEstrellas(Number(btn.dataset.valor)));
    });
    document.getElementById('resenaEstrellas').addEventListener('mouseleave', () => pintarEstrellas(valoracionElegida));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const boton = document.getElementById('btnResena');
      const estado = document.getElementById('estadoResena');
      const nombre = document.getElementById('resenaNombre').value.trim();
      const mensaje = document.getElementById('resenaMensaje').value.trim();

      if (!nombre || !mensaje) {
        estado.className = 'form-envio__estado error';
        estado.textContent = 'Rellena tu nombre y tu opinión.';
        return;
      }
      if (!valoracionElegida) {
        estado.className = 'form-envio__estado error';
        estado.textContent = 'Elige una valoración de 1 a 5 estrellas.';
        return;
      }

      boton.disabled = true;
      estado.className = 'form-envio__estado';
      estado.textContent = 'Enviando reseña...';

      try {
        const resp = await fetch('/api/resena', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, valoracion: valoracionElegida, mensaje })
        });
        const data = await resp.json();

        if (data.ok) {
          estado.className = 'form-envio__estado ok';
          estado.textContent = '¡Gracias por tu reseña!';
          form.reset();
          valoracionElegida = 0;
          inputValoracion.value = 0;
          pintarEstrellas(0);
          cargarResenas();
        } else {
          estado.className = 'form-envio__estado error';
          estado.textContent = data.error || 'No se pudo enviar la reseña.';
        }
      } catch (err) {
        estado.className = 'form-envio__estado error';
        estado.textContent = 'Error de conexión. Inténtalo de nuevo.';
      } finally {
        boton.disabled = false;
      }
    });
  }
})();

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

/* =========================================================
   ZOOM DE CAMISETAS AL PASAR EL RATÓN
   Aplica tanto a las fotos de las tarjetas (grid/lateral) como
   a la foto grande del modal de personalizar. El zoom sigue la
   posición del ratón dentro de la propia imagen.
========================================================= */
(function initZoomCamisetas() {
  const ZOOM = 5;
  const SELECTOR = '.camiseta-preview__foto';

  document.addEventListener('mousemove', (e) => {
    const img = e.target.closest(SELECTOR);
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`;
    img.style.transform = `scale(${ZOOM})`;
  });

  document.addEventListener('mouseleave', (e) => {
    const img = e.target.closest ? e.target.closest(SELECTOR) : null;
    if (!img) return;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
  }, true);
})();

/* Estado inicial */
actualizarContadorCarrito();
