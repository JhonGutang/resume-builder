import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const getUserResume = publicProcedure
  .input(z.object({
    userId: z.string().default('user-1764079323860'),
  }))
  .query(async ({ input, ctx }) => {
    try {
      const resumesCollection = ctx.db.collection('resumes');
      const resume = await resumesCollection.findOne({ userId: input.userId });
      if (!resume) {
        throw new Error('Resume not found');
      }
      
      return {
        success: true,
        resume,
      };
    } catch (error) {
      throw new Error('Failed to fetch resume');
    }
  });
