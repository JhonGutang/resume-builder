import { router } from './trpc';
import { createUserResume } from './procedures/createUserResume';
import { getUserResume } from './procedures/getUserResume';
import { exportResumePDF } from './procedures/exportResumePDF';
 
const appRouter = router({
  createUserResume,
  getUserResume,
  exportResumePDF,
});

export { appRouter };
export type AppRouter = typeof appRouter;