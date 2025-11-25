import { router } from './trpc';
import { createUserResume } from './procedures/createUserResume';
import { getUserResume } from './procedures/getUserResume';
 
const appRouter = router({
  createUserResume,
  getUserResume,
});

export { appRouter };
export type AppRouter = typeof appRouter;