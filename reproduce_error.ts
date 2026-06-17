import 'dotenv/config';
import prisma from './src/lib/prisma';

async function main() {
  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const where = {
    AND: [
      {},
      {},
      {},
    ],
  };

  try {
    console.log('Starting transaction...');
    const [total, data] = await prisma.$transaction([
      prisma.juego.count({ where }),
      prisma.juego.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { generos: { include: { genero: true } }, plataformas: { include: { plataforma: true } } },
      }),
    ]);
    console.log('Success!', { total, dataCount: data.length });
  } catch (error: any) {
    console.error('Error caught:', error.message);
    if (error.stack) console.error(error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
