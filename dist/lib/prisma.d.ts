import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
declare const prismaClientSingleton: () => PrismaClient<{
    adapter: PrismaPg;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
export default prisma;
