import { z } from 'zod';
import prisma from './prisma';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ponytail: typed loosely — Prisma delegate/where/include types don't compose
// into a clean generic. Single-purpose wrapper around the $transaction
// count+findMany pattern used by juego/noticia.
export async function paginate(
  model: any,
  opts: {
    where?: any;
    page: number;
    limit: number;
    include?: any;
    select?: any;
    orderBy?: any;
  },
) {
  const skip = (opts.page - 1) * opts.limit;
  const findManyArgs: any = { where: opts.where, skip, take: opts.limit };
  if (opts.include) findManyArgs.include = opts.include;
  if (opts.select) findManyArgs.select = opts.select;
  if (opts.orderBy) findManyArgs.orderBy = opts.orderBy;

  const [total, data] = await prisma.$transaction([
    model.count({ where: opts.where }),
    model.findMany(findManyArgs),
  ]);

  return {
    data,
    meta: {
      total,
      page: opts.page,
      limit: opts.limit,
      totalPages: Math.ceil(total / opts.limit),
    },
  };
}
