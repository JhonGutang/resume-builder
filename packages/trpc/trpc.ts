import { initTRPC } from '@trpc/server';
import { Context } from './lib/context';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './lib/context';

const t = initTRPC.context<Context>().create();
t.procedure.use((opts) => {
    opts.ctx;
    return opts.next();
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const trpcMiddleware = (appRouter: ReturnType<typeof router>, db: any) => {
  return trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: (opts) => createContext({ ...opts, db }),
  });
};