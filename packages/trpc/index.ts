import { router } from './trpc';
import { createUserResume } from './procedures/createUserResume';
import { getUserResume } from './procedures/getUserResume';
import { exportResumePDF } from './procedures/exportResumePDF';
import { createUser } from './procedures/createUser';
import { authenticateUser } from './procedures/authenticateUser';

const appRouter = router({
  createUserResume,
  getUserResume,
  exportResumePDF,
  createUser,
  authenticateUser,
});

export { appRouter };
export type AppRouter = typeof appRouter;