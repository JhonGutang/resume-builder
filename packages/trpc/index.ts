import { router } from './trpc';
import { createUserResume } from './procedures/createUserResume';
 
const appRouter = router({
  createUserResume,
});

export { appRouter };
export type AppRouter = typeof appRouter;