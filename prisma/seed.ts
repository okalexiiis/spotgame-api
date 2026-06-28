import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const R2_BASE = 'https://pub-9062799bcb2945e2a475cebb4abc4379.r2.dev/trailers';

async function main() {
  console.log('🌱 Seeding database...');

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // =========================================================================
  // 1. ROLES
  // =========================================================================
  console.log('  → Roles...');
  const adminRol = await prisma.rol.upsert({
    where: { idRol: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      idRol: '00000000-0000-0000-0000-000000000001',
      nombre: 'Admin',
      descripcion: 'Administrador del sistema con acceso total al dashboard, moderación de trailers y gestión de contenido.',
    },
  });

  const userRol = await prisma.rol.upsert({
    where: { idRol: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      idRol: '00000000-0000-0000-0000-000000000002',
      nombre: 'Usuario',
      descripcion: 'Usuario estándar con acceso a catálogo, reproducción de trailers, favoritos y configuración personal.',
    },
  });

  await prisma.rol.upsert({
    where: { idRol: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      idRol: '00000000-0000-0000-0000-000000000003',
      nombre: 'Moderador',
      descripcion: 'Moderador de contenido. Puede aprobar o rechazar trailers subidos por usuarios.',
    },
  });

  // =========================================================================
  // 2. IDIOMAS
  // =========================================================================
  console.log('  → Idiomas...');
  const es = await prisma.idioma.upsert({
    where: { codigo: 'es' },
    update: {},
    create: { codigo: 'es', nombre: 'Español', banderaUrl: 'https://flagcdn.com/w80/es.png', activo: true },
  });

  const en = await prisma.idioma.upsert({
    where: { codigo: 'en' },
    update: {},
    create: { codigo: 'en', nombre: 'English', banderaUrl: 'https://flagcdn.com/w80/us.png', activo: true },
  });

  await prisma.idioma.upsert({
    where: { codigo: 'pt' },
    update: {},
    create: { codigo: 'pt', nombre: 'Português', banderaUrl: 'https://flagcdn.com/w80/br.png', activo: true },
  });

  await prisma.idioma.upsert({
    where: { codigo: 'fr' },
    update: {},
    create: { codigo: 'fr', nombre: 'Français', banderaUrl: 'https://flagcdn.com/w80/fr.png', activo: true },
  });

  const ja = await prisma.idioma.upsert({
    where: { codigo: 'ja' },
    update: {},
    create: { codigo: 'ja', nombre: '日本語', banderaUrl: 'https://flagcdn.com/w80/jp.png', activo: true },
  });

  // =========================================================================
  // 3. PLATAFORMAS
  // =========================================================================
  console.log('  → Plataformas...');
  const ps5 = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000001' },
    update: {},
    create: { idPlataforma: '00000000-0000-0000-0000-100000000001', nombre: 'PlayStation 5', tipo: 'Console' },
  });

  const xbox = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000002' },
    update: {},
    create: { idPlataforma: '00000000-0000-0000-0000-100000000002', nombre: 'Xbox Series X|S', tipo: 'Console' },
  });

  const pc = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000003' },
    update: {},
    create: { idPlataforma: '00000000-0000-0000-0000-100000000003', nombre: 'PC (Steam)', tipo: 'PC' },
  });

  const switchPlat = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000004' },
    update: {},
    create: { idPlataforma: '00000000-0000-0000-0000-100000000004', nombre: 'Nintendo Switch 2', tipo: 'Console' },
  });

  const ps4 = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000005' },
    update: {},
    create: { idPlataforma: '00000000-0000-0000-0000-100000000005', nombre: 'PlayStation 4', tipo: 'Console' },
  });

  // =========================================================================
  // 4. GÉNEROS
  // =========================================================================
  console.log('  → Géneros...');
  const action = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000001' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000001', nombre: 'Acción', descripcion: 'Juegos centrados en combate, reflejos y adrenalina.' },
  });

  const rpg = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000002' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000002', nombre: 'RPG', descripcion: 'Juegos de rol con progresión de personaje, narrativa profunda y decisiones.' },
  });

  const adventure = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000003' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000003', nombre: 'Aventura', descripcion: 'Juegos con foco en exploración, puzzles y narrativa.' },
  });

  const openWorld = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000004' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000004', nombre: 'Mundo Abierto', descripcion: 'Juegos con mapas extensos y libertad de exploración.' },
  });

  const shooter = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000005' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000005', nombre: 'Shooter', descripcion: 'Juegos de disparos en primera o tercera persona.' },
  });

  const racing = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000006' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000006', nombre: 'Carreras', descripcion: 'Juegos de velocidad, vehículos y competición en pista.' },
  });

  const horror = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000007' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000007', nombre: 'Terror', descripcion: 'Juegos diseñados para evocar miedo, tensión y suspense.' },
  });

  const sports = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000008' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000008', nombre: 'Deportes', descripcion: 'Simulaciones deportivas y competiciones atléticas.' },
  });

  const fighting = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000009' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000009', nombre: 'Lucha', descripcion: 'Juegos de combate 1v1 con técnicas y combos.' },
  });

  const strategy = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000010' },
    update: {},
    create: { idGenero: '00000000-0000-0000-0000-200000000010', nombre: 'Estrategia', descripcion: 'Juegos de planificación táctica y gestión de recursos.' },
  });

  // =========================================================================
  // 5. CATEGORÍAS DE TRAILER
  // =========================================================================
  console.log('  → Categorías de Trailer...');
  const catCinematic = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000001' },
    update: {},
    create: { idCategoria: '00000000-0000-0000-0000-300000000001', nombre: 'Cinematográfico' },
  });

  const catGameplay = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000002' },
    update: {},
    create: { idCategoria: '00000000-0000-0000-0000-300000000002', nombre: 'Gameplay' },
  });

  const catStory = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000003' },
    update: {},
    create: { idCategoria: '00000000-0000-0000-0000-300000000003', nombre: 'Historia' },
  });

  const catLaunch = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000004' },
    update: {},
    create: { idCategoria: '00000000-0000-0000-0000-300000000004', nombre: 'Lanzamiento' },
  });

  const catDLC = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000005' },
    update: {},
    create: { idCategoria: '00000000-0000-0000-0000-300000000005', nombre: 'DLC / Expansión' },
  });

  // =========================================================================
  // 6. USUARIOS
  // =========================================================================
  console.log('  → Usuarios...');
  const hashedAdmin = await bcrypt.hash('admin123', 10);
  const hashedUser = await bcrypt.hash('user123', 10);

  const adminUser = await prisma.usuario.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      nombre: 'Carlos Admin',
      username: 'admin',
      correo: 'admin@gamespotlight.com',
      contrasenaHash: hashedAdmin,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
      pais: 'México',
      roles: { create: { idRol: adminRol.idRol } },
    },
  });

  const gamer01 = await prisma.usuario.upsert({
    where: { username: 'gamer01' },
    update: {},
    create: {
      nombre: 'Alex Gamer',
      username: 'gamer01',
      correo: 'alex@gamespotlight.com',
      contrasenaHash: hashedUser,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
      pais: 'Colombia',
      roles: { create: { idRol: userRol.idRol } },
    },
  });

  const nightowl = await prisma.usuario.upsert({
    where: { username: 'nightowl' },
    update: {},
    create: {
      nombre: 'Sofía Luna',
      username: 'nightowl',
      correo: 'sofia@gamespotlight.com',
      contrasenaHash: hashedUser,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia',
      pais: 'España',
      roles: { create: { idRol: userRol.idRol } },
    },
  });

  const shooterPro = await prisma.usuario.upsert({
    where: { username: 'shooterpro' },
    update: {},
    create: {
      nombre: 'Diego Reyes',
      username: 'shooterpro',
      correo: 'diego@gamespotlight.com',
      contrasenaHash: hashedUser,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Diego',
      pais: 'México',
      roles: { create: { idRol: userRol.idRol } },
    },
  });

  const horrorFan = await prisma.usuario.upsert({
    where: { username: 'horrorfan' },
    update: {},
    create: {
      nombre: 'Lucía Marín',
      username: 'horrorfan',
      correo: 'lucia@gamespotlight.com',
      contrasenaHash: hashedUser,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Lucia',
      pais: 'Argentina',
      roles: { create: { idRol: userRol.idRol } },
    },
  });

  const rpgMaster = await prisma.usuario.upsert({
    where: { username: 'rpgmaster' },
    update: {},
    create: {
      nombre: 'Kenji Tanaka',
      username: 'rpgmaster',
      correo: 'kenji@gamespotlight.com',
      contrasenaHash: hashedUser,
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kenji',
      pais: 'Japón',
      roles: { create: { idRol: userRol.idRol } },
    },
  });

  // User configurations
  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: adminUser.idUsuario },
    update: {},
    create: {
      idUsuario: adminUser.idUsuario,
      idiomaId: es.idIdioma,
      tema: 'dark',
      calidadVideo: '1080p',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: gamer01.idUsuario },
    update: {},
    create: {
      idUsuario: gamer01.idUsuario,
      idiomaId: es.idIdioma,
      tema: 'dark',
      calidadVideo: '1080p',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: nightowl.idUsuario },
    update: {},
    create: {
      idUsuario: nightowl.idUsuario,
      idiomaId: en.idIdioma,
      tema: 'dark',
      calidadVideo: '720p',
      tamanoTexto: 'grande',
      controlParental: true,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: shooterPro.idUsuario },
    update: {},
    create: {
      idUsuario: shooterPro.idUsuario,
      idiomaId: en.idIdioma,
      tema: 'dark',
      calidadVideo: 'auto',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: horrorFan.idUsuario },
    update: {},
    create: {
      idUsuario: horrorFan.idUsuario,
      idiomaId: es.idIdioma,
      tema: 'dark',
      calidadVideo: '1080p',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: rpgMaster.idUsuario },
    update: {},
    create: {
      idUsuario: rpgMaster.idUsuario,
      idiomaId: ja.idIdioma,
      tema: 'dark',
      calidadVideo: '1080p',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  // =========================================================================
  // 7. JUEGOS (10 títulos — R2 posters & trailers)
  // =========================================================================
  console.log('  → Juegos...');

  // --- Game 1: Elden Ring ---
  const eldenRing = await prisma.juego.upsert({
    where: { slug: 'elden-ring' },
    update: {},
    create: {
      titulo: 'Elden Ring',
      slug: 'elden-ring',
      descripcion: 'Un colosal RPG de acción y mundo abierto ambientado en las Tierras Intermedias, un nuevo universo de fantasía creado por Hidetaka Miyazaki y George R. R. Martin. Explora cavernas, castillos y ruinas para desentrañar los misterios del Círculo de Elden.',
      fechaLanzamiento: new Date('2022-02-25'),
      desarrollador: 'FromSoftware',
      editor: 'Bandai Namco Entertainment',
      imagenPortada: `${R2_BASE}/posters/eldenring-poster.jpg`,
      bannerUrl: null,
      estado: 'publicado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, eldenRing.idJuego, [action.idGenero, rpg.idGenero, openWorld.idGenero]);
  await upsertGamePlatforms(prisma, eldenRing.idJuego, [ps5.idPlataforma, xbox.idPlataforma, pc.idPlataforma, ps4.idPlataforma]);

  // --- Game 2: Disco Elysium ---
  const discoElysium = await prisma.juego.upsert({
    where: { slug: 'disco-elysium' },
    update: {},
    create: {
      titulo: 'Disco Elysium',
      slug: 'disco-elysium',
      descripcion: 'Un revolucionario RPG detectivesco ambientado en la ciudad de Revachol. Encarna a un detective amnésico con 24 habilidades únicas que representan tu psique. Cada diálogo es una batalla de ideas en un mundo al borde del colapso.',
      fechaLanzamiento: new Date('2019-10-15'),
      desarrollador: 'ZA/UM',
      editor: 'ZA/UM',
      imagenPortada: `${R2_BASE}/posters/discoelysium-poster.jpg`,
      bannerUrl: null,
      estado: 'publicado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, discoElysium.idJuego, [rpg.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, discoElysium.idJuego, [pc.idPlataforma, ps5.idPlataforma, xbox.idPlataforma, switchPlat.idPlataforma]);

  // --- Game 3: Hollow Knight ---
  const hollowKnight = await prisma.juego.upsert({
    where: { slug: 'hollow-knight' },
    update: {},
    create: {
      titulo: 'Hollow Knight',
      slug: 'hollow-knight',
      descripcion: 'Un magistral metroidvania dibujado a mano en las ruinas del antiguo reino de Hallownest. Controla a un caballero silencioso, explora cavernas y ciudades olvidadas, y enfrenta insectos colosales en un mundo interconectado y fascinante.',
      fechaLanzamiento: new Date('2017-02-24'),
      desarrollador: 'Team Cherry',
      editor: 'Team Cherry',
      imagenPortada: `${R2_BASE}/posters/hollowknight-poster.jpg`,
      bannerUrl: null,
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, hollowKnight.idJuego, [action.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, hollowKnight.idJuego, [pc.idPlataforma, ps5.idPlataforma, xbox.idPlataforma, switchPlat.idPlataforma]);

  // --- Game 4: Clair Obscur: Expedition 33 ---
  const clairObscur = await prisma.juego.upsert({
    where: { slug: 'clair-obscur-expedition-33' },
    update: {},
    create: {
      titulo: 'Clair Obscur: Expedition 33',
      slug: 'clair-obscur-expedition-33',
      descripcion: 'Un RPG por turnos con combate reactivo en tiempo real ambientado en un mundo surrealista Belle Époque. Lidera la Expedición 33 para derrotar a la Pintora y evitar que pinte la muerte de todos.',
      fechaLanzamiento: new Date('2025-05-24'),
      desarrollador: 'Sandfall Interactive',
      editor: 'Kepler Interactive',
      imagenPortada: `${R2_BASE}/posters/expedition33-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, clairObscur.idJuego, [rpg.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, clairObscur.idJuego, [pc.idPlataforma, ps5.idPlataforma, xbox.idPlataforma]);

  // --- Game 5: Forest 3 ---
  const forest3 = await prisma.juego.upsert({
    where: { slug: 'forest-3' },
    update: {},
    create: {
      titulo: 'Forest 3',
      slug: 'forest-3',
      descripcion: 'La tercera entrega de la saga de survival horror. Enfréntate a nuevas tribus caníbales, construye refugios avanzados y descubre los oscuros secretos de una misteriosa tercera isla.',
      fechaLanzamiento: new Date('2025-10-01'),
      desarrollador: 'Endnight Games',
      editor: 'Endnight Games',
      imagenPortada: `${R2_BASE}/posters/forest-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, forest3.idJuego, [action.idGenero, horror.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, forest3.idJuego, [pc.idPlataforma]);

  // --- Game 6: Halo: Campaign Evolved ---
  const halo = await prisma.juego.upsert({
    where: { slug: 'halo-campaign-evolved' },
    update: {},
    create: {
      titulo: 'Halo: Campaign Evolved',
      slug: 'halo-campaign-evolved',
      descripcion: 'Una reinvención de la campaña clásica de Halo impulsada por Unreal Engine 5. Revive la legendaria lucha contra el Covenant con gráficos de última generación y una historia expandida.',
      fechaLanzamiento: new Date('2026-03-15'),
      desarrollador: '343 Industries',
      editor: 'Xbox Game Studios',
      imagenPortada: `${R2_BASE}/posters/halo-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, halo.idJuego, [shooter.idGenero, action.idGenero]);
  await upsertGamePlatforms(prisma, halo.idJuego, [xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 7: Supreme Experiment ---
  const supremeExperiment = await prisma.juego.upsert({
    where: { slug: 'supreme-experiment' },
    update: {},
    create: {
      titulo: 'Supreme Experiment',
      slug: 'supreme-experiment',
      descripcion: 'Un thriller psicológico de ciencia ficción donde la realidad se dobla con cada decisión. Navega por una estación de investigación abandonada y sobrevive a experimentos que desafían las leyes de la física.',
      fechaLanzamiento: new Date('2025-08-15'),
      desarrollador: 'Abyssal Games',
      editor: 'Abyssal Games',
      imagenPortada: `${R2_BASE}/posters/supremeexperiment-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, supremeExperiment.idJuego, [adventure.idGenero, horror.idGenero]);
  await upsertGamePlatforms(prisma, supremeExperiment.idJuego, [pc.idPlataforma, ps5.idPlataforma]);

  // --- Game 8: Grand Theft Auto VI ---
  const gtaVI = await prisma.juego.upsert({
    where: { slug: 'grand-theft-auto-vi' },
    update: {},
    create: {
      titulo: 'Grand Theft Auto VI',
      slug: 'grand-theft-auto-vi',
      descripcion: 'Grand Theft Auto VI viaja al estado de Leonida, hogar de las calles impregnadas de neón de Vice City y más allá, en la evolución más grande y envolvente de la serie GTA hasta la fecha. Protagonizada por Lucia y un elenco que desafía las convenciones.',
      fechaLanzamiento: new Date('2025-10-25'),
      desarrollador: 'Rockstar North',
      editor: 'Rockstar Games',
      imagenPortada: `${R2_BASE}/posters/gta6-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, gtaVI.idJuego, [action.idGenero, openWorld.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, gtaVI.idJuego, [ps5.idPlataforma, xbox.idPlataforma]);

  // --- Game 9: Teenage Mutant Ninja Turtles: The Last Ronin ---
  const tmnt = await prisma.juego.upsert({
    where: { slug: 'tmnt-the-last-ronin' },
    update: {},
    create: {
      titulo: 'Teenage Mutant Ninja Turtles: The Last Ronin',
      slug: 'tmnt-the-last-ronin',
      descripcion: 'Basado en la aclamada novela gráfica. En un futuro oscuro, la última Tortuga sobreviviente busca venganza en una Nueva York devastada. Un RPG de acción maduro y narrativo al estilo God of War.',
      fechaLanzamiento: new Date('2025-12-01'),
      desarrollador: 'Black Forest Games',
      editor: 'THQ Nordic',
      imagenPortada: `${R2_BASE}/posters/tmntlastronin-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, tmnt.idJuego, [action.idGenero, rpg.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, tmnt.idJuego, [pc.idPlataforma, ps5.idPlataforma, xbox.idPlataforma, switchPlat.idPlataforma]);

  // --- Game 10: Eclipsium ---
  const eclipsium = await prisma.juego.upsert({
    where: { slug: 'eclipsium' },
    update: {},
    create: {
      titulo: 'Eclipsium',
      slug: 'eclipsium',
      descripcion: 'Explora un mundo moribundo atrapado entre dos soles eclipsantes. Domina la magia de luz y sombra, resuelve puzles celestiales y decide el destino de la última civilización.',
      fechaLanzamiento: new Date('2025-09-15'),
      desarrollador: 'Eclipse Studios',
      editor: 'Eclipse Studios',
      imagenPortada: `${R2_BASE}/posters/eclipsium-poster.jpg`,
      bannerUrl: null,
      estado: 'anunciado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, eclipsium.idJuego, [adventure.idGenero, rpg.idGenero]);
  await upsertGamePlatforms(prisma, eclipsium.idJuego, [pc.idPlataforma, ps5.idPlataforma, switchPlat.idPlataforma]);

  const allGames = [eldenRing, discoElysium, hollowKnight, clairObscur, forest3, halo, supremeExperiment, gtaVI, tmnt, eclipsium];

  // =========================================================================
  // 8. TRAILERS (1 per game, 10 trailers — R2 video URLs)
  // =========================================================================
  console.log('  → Trailers...');

  const trailerDefs: { idJuego: string; titulo: string; tipo: string; catId: string; video: string; poster: string; durSec: number; vistas: number }[] = [
    { idJuego: eldenRing.idJuego, titulo: 'Elden Ring — Tráiler Oficial de Lanzamiento', tipo: 'Cinematográfico', catId: catLaunch.idCategoria, video: `${R2_BASE}/videos/eldenring-trailer.mp4`, poster: `${R2_BASE}/posters/eldenring-poster.jpg`, durSec: 185, vistas: 48000000 },
    { idJuego: discoElysium.idJuego, titulo: 'Disco Elysium — The Final Cut Trailer', tipo: 'Cinematográfico', catId: catLaunch.idCategoria, video: `${R2_BASE}/videos/discoelysium-trailer.mp4`, poster: `${R2_BASE}/posters/discoelysium-poster.jpg`, durSec: 120, vistas: 5000000 },
    { idJuego: hollowKnight.idJuego, titulo: 'Hollow Knight — Tráiler de Lanzamiento', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/hollowknight-trailer.mp4`, poster: `${R2_BASE}/posters/hollowknight-poster.jpg`, durSec: 130, vistas: 18000000 },
    { idJuego: clairObscur.idJuego, titulo: 'Clair Obscur — Expedition 33 Reveal Trailer', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/clairobscur-trailer.mp4`, poster: `${R2_BASE}/posters/expedition33-poster.jpg`, durSec: 150, vistas: 8000000 },
    { idJuego: forest3.idJuego, titulo: 'Forest 3 — Tráiler de Anuncio', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/forest3-trailer.mp4`, poster: `${R2_BASE}/posters/forest-poster.jpg`, durSec: 110, vistas: 4000000 },
    { idJuego: halo.idJuego, titulo: 'Halo: Campaign Evolved — Tráiler Oficial', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/halo-trailer.mp4`, poster: `${R2_BASE}/posters/halo-poster.jpg`, durSec: 140, vistas: 12000000 },
    { idJuego: supremeExperiment.idJuego, titulo: 'Supreme Experiment — Tráiler Oficial', tipo: 'Historia', catId: catStory.idCategoria, video: `${R2_BASE}/videos/supremeexperiment-trailer.mp4`, poster: `${R2_BASE}/posters/supremeexperiment-poster.jpg`, durSec: 100, vistas: 2000000 },
    { idJuego: gtaVI.idJuego, titulo: 'GTA VI — Bienvenidos a Leonida', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/gta6-trailer.mp4`, poster: `${R2_BASE}/posters/gta6-poster.jpg`, durSec: 91, vistas: 200000000 },
    { idJuego: tmnt.idJuego, titulo: 'TMNT: The Last Ronin — Reveal Trailer', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: `${R2_BASE}/videos/tmntlastronin-trailer.mp4`, poster: `${R2_BASE}/posters/tmntlastronin-poster.jpg`, durSec: 130, vistas: 10000000 },
    { idJuego: eclipsium.idJuego, titulo: 'Eclipsium — Tráiler de Anuncio', tipo: 'Historia', catId: catStory.idCategoria, video: `${R2_BASE}/videos/eclipsium-trailer.mp4`, poster: `${R2_BASE}/posters/eclipsium-poster.jpg`, durSec: 115, vistas: 1500000 },
  ];

  for (const t of trailerDefs) {
    await prisma.trailer.create({
      data: {
        idJuego: t.idJuego,
        titulo: t.titulo,
        tipo: t.tipo,
        urlVideo: t.video,
        urlPoster: t.poster,
        estadoRevision: 'aprobado',
        estadoArchivo: 'disponible',
        subidoPor: adminUser.idUsuario,
        duracionSegundos: t.durSec,
        vistas: t.vistas,
        categorias: { create: { idCategoria: t.catId } },
      },
    });
  }

  // =========================================================================
  // 9. PRÓXIMOS LANZAMIENTOS
  // =========================================================================
  console.log('  → Próximos Lanzamientos...');

  const launchGta = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: gtaVI.idJuego },
    update: {},
    create: {
      idJuego: gtaVI.idJuego,
      fechaLanzamiento: new Date('2025-10-25'),
      ventanaLanzamiento: 'Otoño 2025',
      descripcion: 'El lanzamiento más esperado de la década. Vice City renace con un mundo abierto sin precedentes, protagonizado por Lucia.',
      bannerUrl: null,
      destacado: true,
    },
  });

  const launchTmnt = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: tmnt.idJuego },
    update: {},
    create: {
      idJuego: tmnt.idJuego,
      fechaLanzamiento: new Date('2025-12-01'),
      ventanaLanzamiento: 'Diciembre 2025',
      descripcion: 'La historia más oscura de las Tortugas Ninja llega a los videojuegos. Un RPG de acción inspirado en la aclamada novela gráfica.',
      bannerUrl: null,
      destacado: true,
    },
  });

  const launchHalo = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: halo.idJuego },
    update: {},
    create: {
      idJuego: halo.idJuego,
      fechaLanzamiento: new Date('2026-03-15'),
      ventanaLanzamiento: 'Q1 2026',
      descripcion: 'La reinvención del clásico Halo con Unreal Engine 5. Revive la campaña que definió una era con gráficos de nueva generación.',
      bannerUrl: null,
      destacado: true,
    },
  });

  const launchForest3 = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: forest3.idJuego },
    update: {},
    create: {
      idJuego: forest3.idJuego,
      fechaLanzamiento: new Date('2025-10-01'),
      ventanaLanzamiento: 'Otoño 2025',
      descripcion: 'La tercera entrega del survival horror más perturbador. Sobrevive en una isla donde cada decisión tiene consecuencias.',
      bannerUrl: null,
      destacado: false,
    },
  });

  const launchSupreme = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: supremeExperiment.idJuego },
    update: {},
    create: {
      idJuego: supremeExperiment.idJuego,
      fechaLanzamiento: new Date('2025-08-15'),
      ventanaLanzamiento: 'Agosto 2025',
      descripcion: 'Un thriller psicológico donde la realidad se dobla. Sobrevive a los experimentos que rompen las leyes de la física.',
      bannerUrl: null,
      destacado: false,
    },
  });

  // =========================================================================
  // 10. NOTICIAS (6 artículos)
  // =========================================================================
  console.log('  → Noticias...');

  const newsDefs = [
    {
      slug: 'gta-vi-fecha-confirmada',
      titulo: 'GTA VI confirma su fecha de lanzamiento para otoño 2025',
      resumen: 'Rockstar Games ha revelado oficialmente la ventana de lanzamiento del juego más esperado de la historia.',
      contenido: 'Tras años de especulación, Rockstar Games ha confirmado que Grand Theft Auto VI llegará a PlayStation 5 y Xbox Series X|S en otoño de 2025. El juego estará ambientado en el estado ficticio de Leonida, que incluye la icónica Vice City reimaginada con tecnología de nueva generación. La protagonista principal será Lucia, marcando un hito en la franquicia como la primera protagonista femenina jugable en la serie principal.',
      imagenPortada: 'https://picsum.photos/seed/newsgta/800/400',
    },
    {
      slug: 'elden-ring-shadow-erdtree-record',
      titulo: 'Shadow of the Erdtree rompe récords de ventas en su primera semana',
      resumen: 'La expansión de Elden Ring vendió más de 5 millones de copias en 3 días.',
      contenido: 'FromSoftware y Bandai Namco han anunciado que Shadow of the Erdtree, la masiva expansión de Elden Ring, ha superado los 5 millones de unidades vendidas en sus primeros tres días. La expansión añade un nuevo mapa del tamaño del juego base, 8 nuevos jefes principales y más de 100 armas adicionales.',
      imagenPortada: 'https://picsum.photos/seed/newselden/800/400',
    },
    {
      slug: 'ps5-pro-anuncio-oficial',
      titulo: 'PlayStation 5 Pro anunciada oficialmente: rendimiento 4K a 60fps',
      resumen: 'Sony presenta la versión mejorada de PS5 con GPU un 45% más potente.',
      contenido: 'Mark Cerny ha revelado las especificaciones técnicas de PlayStation 5 Pro, que incluye una GPU con un 45% más de poder de renderizado, ray tracing avanzado con el doble de rendimiento y un upscaling por IA llamado PlayStation Spectral Super Resolution (PSSR). La consola saldrá al mercado a finales de año.',
      imagenPortada: 'https://picsum.photos/seed/newsps5pro/800/400',
    },
    {
      slug: 'disco-elysium-legacy',
      titulo: 'Disco Elysium: el legado de un RPG que cambió el género',
      resumen: 'A cinco años de su lanzamiento, Disco Elysium sigue siendo el estándar de oro de la narrativa en videojuegos.',
      contenido: 'Cuando ZA/UM lanzó Disco Elysium en 2019, nadie esperaba que un RPG sin combate tradicional redefiniría el género. Con 24 habilidades que representan aspectos de la psique del protagonista, el juego convierte cada conversación en un campo de batalla intelectual. Su motor de diálogo y la profundidad de su mundo han influenciado a una generación de desarrolladores.',
      imagenPortada: 'https://picsum.photos/seed/newsdisco/800/400',
    },
    {
      slug: 'tmnt-last-ronin-gameplay-revelado',
      titulo: 'TMNT: The Last Ronin muestra su primer gameplay y confirma ventana de lanzamiento',
      resumen: 'Black Forest Games revela 10 minutos de gameplay del esperado RPG de las Tortugas Ninja.',
      contenido: 'El primer gameplay de Teenage Mutant Ninja Turtles: The Last Ronin ha sido revelado durante el State of Play. El título presenta un sistema de combate inspirado en God of War, con cambios dinámicos entre las armas de las cuatro tortugas a través de flashbacks. Se confirma su lanzamiento para diciembre de 2025 en PC y consolas de nueva generación.',
      imagenPortada: 'https://picsum.photos/seed/newstmnt/800/400',
    },
    {
      slug: 'clair-obscur-expedition-33-preview',
      titulo: 'Clair Obscur: Expedition 33 impresiona con su primer gameplay extendido',
      resumen: 'El RPG Belle Époque de Sandfall Interactive muestra su innovador sistema de combate reactivo.',
      contenido: 'Sandfall Interactive ha compartido 15 minutos de gameplay de Clair Obscur: Expedition 33, mostrando el combate por turnos con elementos reactivos en tiempo real. Los jugadores pueden esquivar, parar y contraatacar usando comandos rítmicos durante los turnos enemigos. El mundo surrealista inspirado en la Francia de la Belle Époque ha generado comparaciones con obras como El artista que pintó un gato azul.',
      imagenPortada: 'https://picsum.photos/seed/newsclair/800/400',
    },
  ];

  for (const n of newsDefs) {
    await prisma.noticia.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        titulo: n.titulo,
        slug: n.slug,
        resumen: n.resumen,
        contenido: n.contenido,
        imagenPortada: n.imagenPortada,
        autorId: adminUser.idUsuario,
        destacada: n.slug.includes('gta') || n.slug.includes('elden'),
        imagenes: {
          create: [
            { urlImagen: `https://picsum.photos/seed/${n.slug}1/1200/600`, orden: 0, leyenda: 'Imagen principal' },
            { urlImagen: `https://picsum.photos/seed/${n.slug}2/1200/600`, orden: 1, leyenda: 'Captura de pantalla adicional' },
          ],
        },
      },
    });
  }

  // =========================================================================
  // 11. FAVORITOS
  // =========================================================================
  console.log('  → Favoritos...');
  // gamer01 — Soulslike/Hardcore: action, rpg, openWorld
  await upsertFavorites(prisma, gamer01.idUsuario, [eldenRing, hollowKnight, clairObscur]);
  // nightowl — Indie/Story: adventure, rpg
  await upsertFavorites(prisma, nightowl.idUsuario, [discoElysium, eclipsium, clairObscur]);
  // shooterPro — Shooter/Action
  await upsertFavorites(prisma, shooterPro.idUsuario, [halo, gtaVI]);
  // horrorFan — Horror/Survival
  await upsertFavorites(prisma, horrorFan.idUsuario, [forest3, supremeExperiment]);
  // rpgMaster — RPG/OpenWorld
  await upsertFavorites(prisma, rpgMaster.idUsuario, [eldenRing, discoElysium, clairObscur]);

  // =========================================================================
  // 12. NOTIFICACIONES
  // =========================================================================
  console.log('  → Notificaciones...');
  // gamer01 — Soulslike/Hardcore
  await upsertNotifications(prisma, gamer01.idUsuario, [
    { titulo: '¡Nuevo tráiler de GTA VI!', mensaje: 'Se ha publicado el tráiler oficial de Grand Theft Auto VI. ¡No te lo pierdas!', tipo: 'trailer', entidad: 'juego', entidadId: gtaVI.idJuego, leida: false },
    { titulo: 'Elden Ring: Shadow of the Erdtree ya disponible', mensaje: 'La expansión más grande de FromSoftware ya está disponible para descargar. Explora el Reino de las Sombras.', tipo: 'lanzamiento', entidad: 'juego', entidadId: eldenRing.idJuego, leida: true },
    { titulo: 'Reserva confirmada: GTA VI', mensaje: 'Tu reserva para Grand Theft Auto VI ha sido registrada. Te notificaremos el día de lanzamiento.', tipo: 'mi_lista', entidad: 'lanzamiento', entidadId: launchGta.idLanzamiento, leida: true },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 50 trailers. ¡Eres un verdadero explorador de Game Spotlight!', tipo: 'recompensa', entidad: null, entidadId: null, leida: true },
  ]);
  // nightowl — Indie/Story
  await upsertNotifications(prisma, nightowl.idUsuario, [
    { titulo: '¡TMNT: The Last Ronin revela gameplay!', mensaje: 'Black Forest Games ha mostrado el primer gameplay del esperado RPG. Añádelo a tu lista.', tipo: 'lanzamiento', entidad: 'juego', entidadId: tmnt.idJuego, leida: false },
    { titulo: 'Reserva confirmada: TMNT The Last Ronin', mensaje: 'Tu reserva para TMNT ha sido registrada. Te avisaremos el día de lanzamiento.', tipo: 'mi_lista', entidad: 'lanzamiento', entidadId: launchTmnt.idLanzamiento, leida: true },
    { titulo: 'Supreme Experiment anunciado', mensaje: 'Un nuevo thriller psicológico de ciencia ficción llega este verano. Añádelo a tu lista.', tipo: 'lanzamiento', entidad: 'juego', entidadId: supremeExperiment.idJuego, leida: false },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 50 trailers. ¡Eres un verdadero explorador de Game Spotlight!', tipo: 'recompensa', entidad: null, entidadId: null, leida: true },
  ]);
  // shooterPro — Shooter/Action
  await upsertNotifications(prisma, shooterPro.idUsuario, [
    { titulo: 'Halo: Campaign Evolved — Tráiler revelado', mensaje: '343 Industries muestra el primer tráiler de la reinvención de Halo. ¡Échale un vistazo!', tipo: 'trailer', entidad: 'juego', entidadId: halo.idJuego, leida: false },
    { titulo: 'Halo: Campaign Evolved fecha confirmada', mensaje: 'Halo: Campaign Evolved llegará en Q1 2026. Reserva tu copia ahora.', tipo: 'lanzamiento', entidad: 'juego', entidadId: halo.idJuego, leida: true },
    { titulo: '¡Nuevo tráiler de GTA VI!', mensaje: 'Se ha publicado el tráiler oficial de Grand Theft Auto VI.', tipo: 'trailer', entidad: 'juego', entidadId: gtaVI.idJuego, leida: false },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 30 trailers.', tipo: 'recompensa', entidad: null, entidadId: null, leida: false },
  ]);
  // horrorFan — Horror/Survival
  await upsertNotifications(prisma, horrorFan.idUsuario, [
    { titulo: 'Forest 3 — Tráiler de Anuncio', mensaje: 'Endnight Games revela el primer tráiler de Forest 3. El survival horror más perturbador.', tipo: 'trailer', entidad: 'juego', entidadId: forest3.idJuego, leida: false },
    { titulo: 'Supreme Experiment revelado', mensaje: 'Un thriller psicológico donde la realidad se dobla. No apto para cardiacos.', tipo: 'lanzamiento', entidad: 'juego', entidadId: supremeExperiment.idJuego, leida: true },
    { titulo: 'Reserva confirmada: Forest 3', mensaje: 'Tu reserva para Forest 3 ha sido registrada.', tipo: 'mi_lista', entidad: 'lanzamiento', entidadId: launchForest3.idLanzamiento, leida: true },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 50 trailers.', tipo: 'recompensa', entidad: null, entidadId: null, leida: true },
  ]);
  // rpgMaster — RPG/OpenWorld
  await upsertNotifications(prisma, rpgMaster.idUsuario, [
    { titulo: 'Clair Obscur: Expedition 33 — Gameplay extendido', mensaje: 'Sandfall Interactive muestra 15 minutos de gameplay del RPG Belle Époque.', tipo: 'trailer', entidad: 'juego', entidadId: clairObscur.idJuego, leida: false },
    { titulo: 'Elden Ring: Shadow of the Erdtree — Noticias', mensaje: 'Detalles sobre la expansión más grande de FromSoftware.', tipo: 'lanzamiento', entidad: 'juego', entidadId: eldenRing.idJuego, leida: true },
    { titulo: 'Reserva confirmada: GTA VI', mensaje: 'Tu reserva para Grand Theft Auto VI ha sido registrada.', tipo: 'mi_lista', entidad: 'lanzamiento', entidadId: launchGta.idLanzamiento, leida: true },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 80 trailers. ¡Leyenda!', tipo: 'recompensa', entidad: null, entidadId: null, leida: true },
  ]);

  // =========================================================================
  // 13. RESERVAS
  // =========================================================================
  console.log('  → Reservas...');
  // gamer01 → GTA VI, Halo
  await upsertReserva(prisma, gamer01.idUsuario, launchGta.idLanzamiento);
  await upsertReserva(prisma, gamer01.idUsuario, launchHalo.idLanzamiento);
  // nightowl → TMNT, Supreme Experiment
  await upsertReserva(prisma, nightowl.idUsuario, launchTmnt.idLanzamiento);
  await upsertReserva(prisma, nightowl.idUsuario, launchSupreme.idLanzamiento);
  // shooterPro → Halo
  await upsertReserva(prisma, shooterPro.idUsuario, launchHalo.idLanzamiento);
  // horrorFan → Forest 3, Supreme Experiment
  await upsertReserva(prisma, horrorFan.idUsuario, launchForest3.idLanzamiento);
  await upsertReserva(prisma, horrorFan.idUsuario, launchSupreme.idLanzamiento);
  // rpgMaster → GTA VI
  await upsertReserva(prisma, rpgMaster.idUsuario, launchGta.idLanzamiento);

  // =========================================================================
  // 14. DESCARGAS (estadísticas simuladas)
  // =========================================================================
  console.log('  → Descargas...');
  // gamer01 — PC
  await upsertDownloads(prisma, gamer01.idUsuario, [eldenRing, hollowKnight, clairObscur], 'PC (Steam)');
  // nightowl — Switch
  await upsertDownloads(prisma, nightowl.idUsuario, [hollowKnight, discoElysium, eclipsium], 'Nintendo Switch 2');
  // shooterPro — Xbox
  await upsertDownloads(prisma, shooterPro.idUsuario, [halo, gtaVI], 'Xbox Series X|S');
  // horrorFan — PS5
  await upsertDownloads(prisma, horrorFan.idUsuario, [forest3, supremeExperiment, eldenRing], 'PlayStation 5');
  // rpgMaster — PC
  await upsertDownloads(prisma, rpgMaster.idUsuario, [eldenRing, discoElysium, clairObscur, eclipsium], 'PC (Steam)');

  // =========================================================================
  // DONE
  // =========================================================================
  console.log('✅ Seeding finished.');
  console.log('   📊 Summary:');
  console.log('      Roles: 3 | Idiomas: 5 | Plataformas: 5');
  console.log('      Géneros: 10 | Categorías Trailer: 5');
  console.log('      Usuarios: 6 | Juegos: 10 | Trailers: 10');
  console.log('      Noticias: 6 | Lanzamientos: 5 | Notificaciones: 20');

  await prisma.$disconnect();
  await pool.end();
}

// =========================================================================
// HELPERS
// =========================================================================

async function upsertGameGenres(prisma: PrismaClient, idJuego: string, generoIds: string[]) {
  for (const idGenero of generoIds) {
    await prisma.juegoGenero.upsert({
      where: { idJuego_idGenero: { idJuego, idGenero } },
      update: {},
      create: { idJuego, idGenero },
    });
  }
}

async function upsertGamePlatforms(prisma: PrismaClient, idJuego: string, plataformaIds: string[]) {
  for (const idPlataforma of plataformaIds) {
    await prisma.juegoPlataforma.upsert({
      where: { idJuego_idPlataforma: { idJuego, idPlataforma } },
      update: {},
      create: { idJuego, idPlataforma },
    });
  }
}

type JuegoRef = { idJuego: string };

async function upsertFavorites(prisma: PrismaClient, idUsuario: string, juegos: JuegoRef[]) {
  for (const g of juegos) {
    await prisma.favorito.upsert({
      where: { idUsuario_idJuego: { idUsuario, idJuego: g.idJuego } },
      update: {},
      create: { idUsuario, idJuego: g.idJuego },
    });
  }
}

type NotifDef = { titulo: string; mensaje: string; tipo: string; entidad: string | null; entidadId: string | null; leida: boolean };

async function upsertNotifications(prisma: PrismaClient, idUsuario: string, notifs: NotifDef[]) {
  for (const n of notifs) {
    await prisma.notificacion.create({
      data: {
        idUsuario,
        titulo: n.titulo,
        mensaje: n.mensaje,
        tipo: n.tipo,
        entidad: n.entidad,
        entidadId: n.entidadId,
        leida: n.leida,
      },
    });
  }
}

async function upsertReserva(prisma: PrismaClient, idUsuario: string, idLanzamiento: string) {
  await prisma.reserva.upsert({
    where: { idUsuario_idLanzamiento: { idUsuario, idLanzamiento } },
    update: {},
    create: { idUsuario, idLanzamiento },
  });
}

async function upsertDownloads(prisma: PrismaClient, idUsuario: string, juegos: JuegoRef[], plataforma: string) {
  for (const g of juegos) {
    await prisma.descarga.create({
      data: { idUsuario, idJuego: g.idJuego, plataforma },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
