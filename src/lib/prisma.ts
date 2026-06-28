import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const prismaClientSingleton = () => {
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

export const closePrisma = async () => {
  await prisma.$disconnect();
  await pool.end();
};

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
