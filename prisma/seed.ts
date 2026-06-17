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

  // 1. Roles
  const adminRol = await prisma.rol.upsert({
    where: { idRol: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      idRol: '00000000-0000-0000-0000-000000000001',
      nombre: 'Admin',
      descripcion: 'System Administrator',
    },
  });

  const userRol = await prisma.rol.upsert({
    where: { idRol: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      idRol: '00000000-0000-0000-0000-000000000002',
      nombre: 'Usuario',
      descripcion: 'Standard User',
    },
  });

  // 2. Languages
  const es = await prisma.idioma.upsert({
    where: { codigo: 'es' },
    update: {},
    create: {
      codigo: 'es',
      nombre: 'Español',
      banderaUrl: 'https://flagcdn.com/es.svg',
      activo: true,
    },
  });

  // 3. Platforms
  const ps5 = await prisma.plataforma.upsert({
    where: { idPlataforma: '00000000-0000-0000-0000-100000000001' },
    update: {},
    create: {
      idPlataforma: '00000000-0000-0000-0000-100000000001',
      nombre: 'PlayStation 5',
      tipo: 'Console',
    },
  });

  // 4. Genres
  const action = await prisma.genero.upsert({
    where: { idGenero: '00000000-0000-0000-0000-200000000001' },
    update: {},
    create: {
      idGenero: '00000000-0000-0000-0000-200000000001',
      nombre: 'Acción',
    },
  });

  // 5. Sample User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.usuario.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      nombre: 'Admin User',
      username: 'admin',
      correo: 'admin@gamespot.com',
      contrasenaHash: hashedPassword,
      roles: {
        create: { idRol: adminRol.idRol }
      }
    },
  });

  // 6. Sample Game (Using placeholders for files)
  const game = await prisma.juego.upsert({
    where: { slug: 'elden-ring' },
    update: {},
    create: {
      titulo: 'Elden Ring',
      slug: 'elden-ring',
      descripcion: 'A massive open-world action RPG.',
      fechaLanzamiento: new Date('2022-02-25'),
      imagenPortada: 'https://picsum.photos/seed/elden/400/600', // Placeholder
      bannerUrl: 'https://picsum.photos/seed/eldenbanner/1200/400', // Placeholder
      generos: { create: { idGenero: action.idGenero } },
      plataformas: { create: { idPlataforma: ps5.idPlataforma } },
    },
  });

  // 7. Sample News
  await prisma.noticia.upsert({
    where: { slug: 'new-dlc-announced' },
    update: {},
    create: {
      titulo: 'New DLC Announced!',
      slug: 'new-dlc-announced',
      resumen: 'The shadow of the Erdtree is coming.',
      contenido: 'Full details about the upcoming expansion...',
      imagenPortada: 'https://picsum.photos/seed/dlc/800/400',
      autorId: adminUser.idUsuario,
    },
  });

  // 8. Sample Trailer
  const catTrailer = await prisma.categoriaTrailer.upsert({
    where: { idCategoria: '00000000-0000-0000-0000-300000000001' },
    update: {},
    create: {
      idCategoria: '00000000-0000-0000-0000-300000000001',
      nombre: 'Cinematic',
    },
  });

  await prisma.trailer.create({
    data: {
      idJuego: game.idJuego,
      titulo: 'Official Announcement Trailer',
      urlVideo: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
      urlPoster: 'https://picsum.photos/seed/trailer/800/450',
      estadoRevision: 'aprobado',
      estadoArchivo: 'listo',
      subidoPor: adminUser.idUsuario,
      categorias: { create: { idCategoria: catTrailer.idCategoria } }
    }
  });

  console.log('✅ Seeding finished.');
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
