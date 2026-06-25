import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

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

  await prisma.idioma.upsert({
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

  const demoUser = await prisma.usuario.upsert({
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

  const demoUser2 = await prisma.usuario.upsert({
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
    where: { idUsuario: demoUser.idUsuario },
    update: {},
    create: {
      idUsuario: demoUser.idUsuario,
      idiomaId: es.idIdioma,
      tema: 'dark',
      calidadVideo: 'auto',
      tamanoTexto: 'normal',
      controlParental: false,
    },
  });

  await prisma.configuracionUsuario.upsert({
    where: { idUsuario: demoUser2.idUsuario },
    update: {},
    create: {
      idUsuario: demoUser2.idUsuario,
      idiomaId: en.idIdioma,
      tema: 'dark',
      calidadVideo: '720p',
      tamanoTexto: 'grande',
      controlParental: true,
    },
  });

  // =========================================================================
  // 7. JUEGOS (10 títulos)
  // =========================================================================
  console.log('  → Juegos...');

  // Free-use sample videos from verified public sources
  const sampleVideos = [
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4',
    'https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4',
    'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    'https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_5MB.mp4',
    'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_5MB.mp4',
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
  ];

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
      imagenPortada: 'https://picsum.photos/seed/eldenring/400/600',
      bannerUrl: 'https://picsum.photos/seed/eldenringbanner/1200/500',
      estado: 'publicado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, eldenRing.idJuego, [action.idGenero, rpg.idGenero, openWorld.idGenero]);
  await upsertGamePlatforms(prisma, eldenRing.idJuego, [ps5.idPlataforma, xbox.idPlataforma, pc.idPlataforma, ps4.idPlataforma]);

  // --- Game 2: GTA VI ---
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
      imagenPortada: 'https://picsum.photos/seed/gtavi/400/600',
      bannerUrl: 'https://picsum.photos/seed/gtavibanner/1200/500',
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, gtaVI.idJuego, [action.idGenero, openWorld.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, gtaVI.idJuego, [ps5.idPlataforma, xbox.idPlataforma]);

  // --- Game 3: God of War Ragnarök ---
  const godOfWar = await prisma.juego.upsert({
    where: { slug: 'god-of-war-ragnarok' },
    update: {},
    create: {
      titulo: 'God of War Ragnarök',
      slug: 'god-of-war-ragnarok',
      descripcion: 'Embárcate en un viaje épico y entrañable mientras Kratos y Atreus luchan contra dioses nórdicos en una aventura sobre la familia, el destino y el fin del mundo. Combate criaturas y explora los Nueve Reinos.',
      fechaLanzamiento: new Date('2022-11-09'),
      desarrollador: 'Santa Monica Studio',
      editor: 'Sony Interactive Entertainment',
      imagenPortada: 'https://picsum.photos/seed/gowr/400/600',
      bannerUrl: 'https://picsum.photos/seed/gowrbanner/1200/500',
      estado: 'publicado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, godOfWar.idJuego, [action.idGenero, adventure.idGenero, rpg.idGenero]);
  await upsertGamePlatforms(prisma, godOfWar.idJuego, [ps5.idPlataforma, ps4.idPlataforma, pc.idPlataforma]);

  // --- Game 4: Cyberpunk 2077 Phantom Liberty ---
  const cyberpunk = await prisma.juego.upsert({
    where: { slug: 'cyberpunk-2077-phantom-liberty' },
    update: {},
    create: {
      titulo: 'Cyberpunk 2077: Phantom Liberty',
      slug: 'cyberpunk-2077-phantom-liberty',
      descripcion: 'Phantom Liberty es un thriller de espionaje ambientado en Dogtown, un nuevo distrito de Night City. Asume el rol de V junto a Solomon Reed (Idris Elba) en una misión para salvar a la presidenta de la NUS.',
      fechaLanzamiento: new Date('2023-09-26'),
      desarrollador: 'CD Projekt Red',
      editor: 'CD Projekt',
      imagenPortada: 'https://picsum.photos/seed/cyberpunk/400/600',
      bannerUrl: 'https://picsum.photos/seed/cyberpunkbanner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, cyberpunk.idJuego, [rpg.idGenero, action.idGenero, openWorld.idGenero, shooter.idGenero]);
  await upsertGamePlatforms(prisma, cyberpunk.idJuego, [ps5.idPlataforma, xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 5: The Legend of Zelda: Tears of the Kingdom ---
  const zelda = await prisma.juego.upsert({
    where: { slug: 'zelda-tears-of-the-kingdom' },
    update: {},
    create: {
      titulo: 'The Legend of Zelda: Tears of the Kingdom',
      slug: 'zelda-tears-of-the-kingdom',
      descripcion: 'La continuación de Breath of the Wild. El vasto mundo de Hyrule se expande al cielo con islas flotantes y las profundidades subterráneas. Usa los nuevos poderes Ultrahand, Fuse y Recall para resolver puzzles y explorar sin límites.',
      fechaLanzamiento: new Date('2023-05-12'),
      desarrollador: 'Nintendo EPD',
      editor: 'Nintendo',
      imagenPortada: 'https://picsum.photos/seed/zeldatotk/400/600',
      bannerUrl: 'https://picsum.photos/seed/zeldatotkbanner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, zelda.idJuego, [adventure.idGenero, action.idGenero, openWorld.idGenero]);
  await upsertGamePlatforms(prisma, zelda.idJuego, [switchPlat.idPlataforma]);

  // --- Game 6: Resident Evil 4 Remake ---
  const re4 = await prisma.juego.upsert({
    where: { slug: 'resident-evil-4-remake' },
    update: {},
    create: {
      titulo: 'Resident Evil 4',
      slug: 'resident-evil-4-remake',
      descripcion: 'El clásico de supervivencia y horror reimaginado. Leon S. Kennedy busca a la hija del presidente en una aldea rural europea infestada de parásitos. Gráficos de nueva generación, controles modernizados y terror absoluto.',
      fechaLanzamiento: new Date('2023-03-24'),
      desarrollador: 'Capcom',
      editor: 'Capcom',
      imagenPortada: 'https://picsum.photos/seed/re4remake/400/600',
      bannerUrl: 'https://picsum.photos/seed/re4remakebanner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, re4.idJuego, [horror.idGenero, action.idGenero, shooter.idGenero]);
  await upsertGamePlatforms(prisma, re4.idJuego, [ps5.idPlataforma, ps4.idPlataforma, xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 7: Forza Motorsport ---
  const forza = await prisma.juego.upsert({
    where: { slug: 'forza-motorsport-2023' },
    update: {},
    create: {
      titulo: 'Forza Motorsport',
      slug: 'forza-motorsport-2023',
      descripcion: 'La nueva generación de Forza Motorsport. Compite en más de 20 circuitos reales, personaliza más de 500 autos con daño dinámico por vueltas y condiciones climáticas en tiempo real. Físicas completamente reconstruidas.',
      fechaLanzamiento: new Date('2023-10-10'),
      desarrollador: 'Turn 10 Studios',
      editor: 'Xbox Game Studios',
      imagenPortada: 'https://picsum.photos/seed/forzams/400/600',
      bannerUrl: 'https://picsum.photos/seed/forzamsbanner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, forza.idJuego, [racing.idGenero]);
  await upsertGamePlatforms(prisma, forza.idJuego, [xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 8: Street Fighter 6 ---
  const sf6 = await prisma.juego.upsert({
    where: { slug: 'street-fighter-6' },
    update: {},
    create: {
      titulo: 'Street Fighter 6',
      slug: 'street-fighter-6',
      descripcion: 'La sexta entrega de la icónica franquicia de lucha. Con el nuevo sistema Drive, World Tour mode, Battle Hub y un roster renovado que incluye personajes clásicos y nuevos guerreros.',
      fechaLanzamiento: new Date('2023-06-02'),
      desarrollador: 'Capcom',
      editor: 'Capcom',
      imagenPortada: 'https://picsum.photos/seed/sf6/400/600',
      bannerUrl: 'https://picsum.photos/seed/sf6banner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, sf6.idJuego, [fighting.idGenero, action.idGenero]);
  await upsertGamePlatforms(prisma, sf6.idJuego, [ps5.idPlataforma, ps4.idPlataforma, xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 9: Starfield ---
  const starfield = await prisma.juego.upsert({
    where: { slug: 'starfield' },
    update: {},
    create: {
      titulo: 'Starfield',
      slug: 'starfield',
      descripcion: 'El primer universo nuevo de Bethesda en 25 años. Explora más de 1.000 planetas, personaliza tu nave, recluta tripulación y decide el destino de la humanidad entre las estrellas en este RPG de ciencia ficción masivo.',
      fechaLanzamiento: new Date('2023-09-06'),
      desarrollador: 'Bethesda Game Studios',
      editor: 'Bethesda Softworks',
      imagenPortada: 'https://picsum.photos/seed/starfield/400/600',
      bannerUrl: 'https://picsum.photos/seed/starfieldbanner/1200/500',
      estado: 'publicado',
      destacado: false,
    },
  });
  await upsertGameGenres(prisma, starfield.idJuego, [rpg.idGenero, openWorld.idGenero, action.idGenero, shooter.idGenero]);
  await upsertGamePlatforms(prisma, starfield.idJuego, [xbox.idPlataforma, pc.idPlataforma]);

  // --- Game 10: Hollow Knight: Silksong ---
  const silksong = await prisma.juego.upsert({
    where: { slug: 'hollow-knight-silksong' },
    update: {},
    create: {
      titulo: 'Hollow Knight: Silksong',
      slug: 'hollow-knight-silksong',
      descripcion: 'Hornet toma el protagonismo en esta esperada secuela del aclamado metroidvania. Explora un nuevo reino, domina artes de seda y combate en un mundo dibujado a mano con una banda sonora orquestal.',
      fechaLanzamiento: new Date('2025-06-12'),
      desarrollador: 'Team Cherry',
      editor: 'Team Cherry',
      imagenPortada: 'https://picsum.photos/seed/silksong/400/600',
      bannerUrl: 'https://picsum.photos/seed/silksongbanner/1200/500',
      estado: 'anunciado',
      destacado: true,
    },
  });
  await upsertGameGenres(prisma, silksong.idJuego, [action.idGenero, adventure.idGenero]);
  await upsertGamePlatforms(prisma, silksong.idJuego, [pc.idPlataforma, switchPlat.idPlataforma, ps5.idPlataforma, xbox.idPlataforma]);

  const allGames = [eldenRing, gtaVI, godOfWar, cyberpunk, zelda, re4, forza, sf6, starfield, silksong];

  // =========================================================================
  // 8. TRAILERS (2 per game = 20 trailers)
  // =========================================================================
  console.log('  → Trailers...');

  const trailerDefs: { idJuego: string; titulo: string; tipo: string; catId: string; video: string; durSec: number; vistas: number }[] = [
    // Elden Ring
    { idJuego: eldenRing.idJuego, titulo: 'Tráiler Oficial de Lanzamiento', tipo: 'Cinematográfico', catId: catLaunch.idCategoria, video: sampleVideos[0], durSec: 185, vistas: 48000000 },
    { idJuego: eldenRing.idJuego, titulo: 'Shadow of the Erdtree — Tráiler de la Expansión', tipo: 'DLC', catId: catDLC.idCategoria, video: sampleVideos[3], durSec: 140, vistas: 22000000 },
    // GTA VI
    { idJuego: gtaVI.idJuego, titulo: 'Tráiler 1 — Bienvenidos a Leonida', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[2], durSec: 91, vistas: 200000000 },
    { idJuego: gtaVI.idJuego, titulo: 'Tráiler 2 — The Outskirts of Vice City', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[4], durSec: 180, vistas: 85000000 },
    // God of War
    { idJuego: godOfWar.idJuego, titulo: 'Ragnarök — Tráiler de Revelación', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[1], durSec: 210, vistas: 35000000 },
    { idJuego: godOfWar.idJuego, titulo: 'Gameplay Oficial — La Espada del Caos', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[5], durSec: 300, vistas: 15000000 },
    // Cyberpunk
    { idJuego: cyberpunk.idJuego, titulo: 'Phantom Liberty — Cinemática de Anuncio', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[3], durSec: 165, vistas: 18000000 },
    { idJuego: cyberpunk.idJuego, titulo: 'Dogtown Gameplay Deep Dive', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[6], durSec: 420, vistas: 9000000 },
    // Zelda
    { idJuego: zelda.idJuego, titulo: 'Tears of the Kingdom — Tráiler Final', tipo: 'Historia', catId: catStory.idCategoria, video: sampleVideos[0], durSec: 195, vistas: 42000000 },
    { idJuego: zelda.idJuego, titulo: 'Exploración y Ultrahand — Gameplay', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[7], durSec: 240, vistas: 12000000 },
    // RE4
    { idJuego: re4.idJuego, titulo: 'Resident Evil 4 Remake — Tráiler de Lanzamiento', tipo: 'Cinematográfico', catId: catLaunch.idCategoria, video: sampleVideos[1], durSec: 150, vistas: 25000000 },
    { idJuego: re4.idJuego, titulo: 'Gameplay del Pueblo — 10 Minutos', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[8], durSec: 600, vistas: 8500000 },
    // Forza
    { idJuego: forza.idJuego, titulo: 'Forza Motorsport — Reveal Trailer', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[8], durSec: 120, vistas: 11000000 },
    { idJuego: forza.idJuego, titulo: 'Gameplay en Circuito de Spa', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[4], durSec: 360, vistas: 3500000 },
    // SF6
    { idJuego: sf6.idJuego, titulo: 'Street Fighter 6 — World Tour Trailer', tipo: 'Historia', catId: catStory.idCategoria, video: sampleVideos[2], durSec: 175, vistas: 14000000 },
    { idJuego: sf6.idJuego, titulo: 'Gameplay Ken vs. Ryu — Ranked Match', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[5], durSec: 90, vistas: 5000000 },
    // Starfield
    { idJuego: starfield.idJuego, titulo: 'Starfield — Into the Starfield', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[3], durSec: 240, vistas: 20000000 },
    { idJuego: starfield.idJuego, titulo: 'Exploración Planetaria — Gameplay', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[6], durSec: 900, vistas: 7000000 },
    // Silksong
    { idJuego: silksong.idJuego, titulo: 'Hollow Knight: Silksong — Reveal Trailer', tipo: 'Cinematográfico', catId: catCinematic.idCategoria, video: sampleVideos[0], durSec: 160, vistas: 30000000 },
    { idJuego: silksong.idJuego, titulo: 'Nuevo Gameplay — Deep Docks', tipo: 'Gameplay', catId: catGameplay.idCategoria, video: sampleVideos[7], durSec: 200, vistas: 6000000 },
  ];

  for (const t of trailerDefs) {
    await prisma.trailer.create({
      data: {
        idJuego: t.idJuego,
        titulo: t.titulo,
        tipo: t.tipo,
        urlVideo: t.video,
        urlPoster: `https://picsum.photos/seed/${encodeURIComponent(t.titulo.slice(0, 15))}/800/450`,
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
      bannerUrl: 'https://picsum.photos/seed/gta6launch/1200/500',
      destacado: true,
    },
  });

  const launchSilksong = await prisma.proximoLanzamiento.upsert({
    where: { idJuego: silksong.idJuego },
    update: {},
    create: {
      idJuego: silksong.idJuego,
      fechaLanzamiento: new Date('2025-06-12'),
      ventanaLanzamiento: 'Primer Semestre 2025',
      descripcion: 'El retorno más esperado del indie gaming. Hornet conquista un nuevo reino en este metroidvania magistral.',
      bannerUrl: 'https://picsum.photos/seed/silksonglaunch/1200/500',
      destacado: true,
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
      contenido: 'Tras años de especulación, Rockstar Games ha confirmado que Grand Theft Auto VI llegará a PlayStation 5 y Xbox Series X|S en otoño de 2025. El juego estará ambientado en el estado ficticio de Leonida, que incluye la icónica Vice City reimaginada con tecnología de nueva generación. La protagonista principal será Lucia, marcando un hito en la franquicia como la primera protagonista femenina jugable en la serie principal. El mundo abierto promete ser el más detallado jamás creado por Rockstar, con un ecosistema vivo que reacciona dinámicamente a las acciones del jugador.',
      imagenPortada: 'https://picsum.photos/seed/newsgta/800/400',
    },
    {
      slug: 'elden-ring-shadow-erdtree-record',
      titulo: 'Shadow of the Erdtree rompe récords de ventas en su primera semana',
      resumen: 'La expansión de Elden Ring vendió más de 5 millones de copias en 3 días.',
      contenido: 'FromSoftware y Bandai Namco han anunciado que Shadow of the Erdtree, la masiva expansión de Elden Ring, ha superado los 5 millones de unidades vendidas en sus primeros tres días. La expansión añade un nuevo mapa del tamaño del juego base, 8 nuevos jefes principales, más de 100 armas adicionales y un sistema de progresión paralelo. Los críticos la han calificado como una de las mejores expansiones de la historia de los videojuegos, con una puntuación media de 94 en Metacritic.',
      imagenPortada: 'https://picsum.photos/seed/newselden/800/400',
    },
    {
      slug: 'ps5-pro-anuncio-oficial',
      titulo: 'PlayStation 5 Pro anunciada oficialmente: rendimiento 4K a 60fps',
      resumen: 'Sony presenta la versión mejorada de PS5 con GPU un 45% más potente.',
      contenido: 'Mark Cerny ha revelado las especificaciones técnicas de PlayStation 5 Pro, que incluye una GPU con un 45% más de poder de renderizado, ray tracing avanzado con el doble de rendimiento y un upscaling por IA llamado PlayStation Spectral Super Resolution (PSSR). La consola saldrá al mercado a finales de año. Títulos como God of War Ragnarök, Cyberpunk 2077 y Elden Ring recibirán parches gratuitos para aprovechar el hardware mejorado.',
      imagenPortada: 'https://picsum.photos/seed/newsps5pro/800/400',
    },
    {
      slug: 'nintendo-switch-2-revelacion',
      titulo: 'Nintendo Switch 2 presentada: retrocompatibilidad total y pantalla OLED de 8 pulgadas',
      resumen: 'Nintendo confirma la sucesora de Switch con mejoras sustanciales en potencia gráfica.',
      contenido: 'Nintendo ha presentado oficialmente Nintendo Switch 2, la sucesora de su exitosa consola híbrida. La nueva consola cuenta con una pantalla OLED de 8 pulgadas, un chip NVIDIA de nueva generación capaz de renderizar juegos a 1080p en modo portátil y 4K en modo dock, y retrocompatibilidad total con el catálogo de Switch. Se confirma que Hollow Knight: Silksong será título de lanzamiento junto a un nuevo The Legend of Zelda.',
      imagenPortada: 'https://picsum.photos/seed/newsswitch2/800/400',
    },
    {
      slug: 'game-awards-2024-ganadores',
      titulo: 'The Game Awards 2024: Elden Ring se lleva el GOTY por segunda vez',
      resumen: 'Shadow of the Erdtree otorga a Elden Ring un segundo premio al Juego del Año consecutivo.',
      contenido: 'En una ceremonia histórica, The Game Awards 2024 coronó a Elden Ring: Shadow of the Erdtree como Juego del Año, siendo la primera vez que una expansión recibe el máximo galardón. La ceremonia también incluyó revelaciones mundiales de nuevos títulos, incluyendo el primer gameplay de GTA VI y el anuncio de un nuevo Metroid Prime.',
      imagenPortada: 'https://picsum.photos/seed/newsgameawards/800/400',
    },
    {
      slug: 'cyberpunk-2077-ultimate-edition',
      titulo: 'Cyberpunk 2077 Ultimate Edition: el juego completo con todos los DLC a precio reducido',
      resumen: 'CD Projekt Red lanza la edición definitiva de Cyberpunk 2077 incluyendo Phantom Liberty.',
      contenido: 'CD Projekt Red ha anunciado Cyberpunk 2077 Ultimate Edition, un paquete que incluye el juego base completamente actualizado con la versión 2.0, la expansión Phantom Liberty y todo el contenido cosmético gratuito lanzado hasta la fecha. Estará disponible en formato físico y digital para PS5, Xbox Series X|S y PC. Es la versión recomendada para nuevos jugadores que quieran experimentar Night City en su máxima expresión.',
      imagenPortada: 'https://picsum.photos/seed/newscyberpunk/800/400',
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
  // 11. FAVORITOS (para demoUser)
  // =========================================================================
  console.log('  → Favoritos...');
  const favoriteGames = [eldenRing, gtaVI, godOfWar, zelda];
  for (const g of favoriteGames) {
    await prisma.favorito.upsert({
      where: { idUsuario_idJuego: { idUsuario: demoUser.idUsuario, idJuego: g.idJuego } },
      update: {},
      create: { idUsuario: demoUser.idUsuario, idJuego: g.idJuego },
    });
  }

  // Favorites for user 2
  const favoriteGames2 = [cyberpunk, sf6, re4];
  for (const g of favoriteGames2) {
    await prisma.favorito.upsert({
      where: { idUsuario_idJuego: { idUsuario: demoUser2.idUsuario, idJuego: g.idJuego } },
      update: {},
      create: { idUsuario: demoUser2.idUsuario, idJuego: g.idJuego },
    });
  }

  // =========================================================================
  // 12. NOTIFICACIONES (para demoUser)
  // =========================================================================
  console.log('  → Notificaciones...');
  const notifDefs = [
    { titulo: '¡Nuevo tráiler de GTA VI!', mensaje: 'Se ha publicado el segundo tráiler oficial de Grand Theft Auto VI. ¡No te lo pierdas!', tipo: 'trailer', entidad: 'juego', entidadId: gtaVI.idJuego },
    { titulo: 'Elden Ring: Shadow of the Erdtree ya disponible', mensaje: 'La expansión más grande de FromSoftware ya está disponible para descargar. Explora el Reino de las Sombras.', tipo: 'lanzamiento', entidad: 'juego', entidadId: eldenRing.idJuego },
    { titulo: 'Reserva confirmada: GTA VI', mensaje: 'Tu reserva para Grand Theft Auto VI ha sido registrada. Te notificaremos el día de lanzamiento.', tipo: 'mi_lista', entidad: 'lanzamiento', entidadId: launchGta.idLanzamiento },
    { titulo: '¡Hollow Knight: Silksong tiene fecha!', mensaje: 'Team Cherry ha confirmado la fecha de lanzamiento de Silksong. Añádelo a tu lista para no perdértelo.', tipo: 'lanzamiento', entidad: 'juego', entidadId: silksong.idJuego },
    { titulo: '🏆 Recompensa desbloqueada', mensaje: 'Has reproducido más de 50 trailers. ¡Eres un verdadero explorador de Game Spotlight!', tipo: 'recompensa', entidad: null, entidadId: null },
  ];

  for (const n of notifDefs) {
    await prisma.notificacion.create({
      data: {
        idUsuario: demoUser.idUsuario,
        titulo: n.titulo,
        mensaje: n.mensaje,
        tipo: n.tipo,
        entidad: n.entidad,
        entidadId: n.entidadId,
        leida: n.tipo === 'recompensa',
      },
    });
  }

  // =========================================================================
  // 13. RESERVAS
  // =========================================================================
  console.log('  → Reservas...');
  await prisma.reserva.upsert({
    where: { idUsuario_idLanzamiento: { idUsuario: demoUser.idUsuario, idLanzamiento: launchGta.idLanzamiento } },
    update: {},
    create: { idUsuario: demoUser.idUsuario, idLanzamiento: launchGta.idLanzamiento },
  });

  await prisma.reserva.upsert({
    where: { idUsuario_idLanzamiento: { idUsuario: demoUser2.idUsuario, idLanzamiento: launchSilksong.idLanzamiento } },
    update: {},
    create: { idUsuario: demoUser2.idUsuario, idLanzamiento: launchSilksong.idLanzamiento },
  });

  // =========================================================================
  // 14. DESCARGAS (estadísticas simuladas)
  // =========================================================================
  console.log('  → Descargas...');
  for (const g of allGames.slice(0, 6)) {
    await prisma.descarga.create({
      data: { idUsuario: demoUser.idUsuario, idJuego: g.idJuego, plataforma: 'PlayStation 5' },
    });
  }

  // =========================================================================
  // DONE
  // =========================================================================
  console.log('✅ Seeding finished.');
  console.log(`   📊 Summary:`);
  console.log(`      Roles: 3 | Idiomas: 5 | Plataformas: 5`);
  console.log(`      Géneros: 10 | Categorías Trailer: 5`);
  console.log(`      Usuarios: 3 | Juegos: 10 | Trailers: 20`);
  console.log(`      Noticias: 6 | Lanzamientos: 2 | Notificaciones: 5`);

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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
