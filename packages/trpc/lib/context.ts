import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { Db } from 'mongodb';

export async function createContext({ req, res, db }: CreateExpressContextOptions & { db: Db }) {
  return {
    req,
    res,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
