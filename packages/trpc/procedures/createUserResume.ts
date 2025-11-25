import { publicProcedure } from '../trpc';
import { resumeSchema } from '../schema/resume';


export const createUserResume = publicProcedure
  .input(resumeSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const resumesCollection = ctx.db.collection('resumes');
      
      const resume = {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const result = await resumesCollection.insertOne(resume);
      
      return {
        success: true,
        resumeId: result.insertedId.toString(),
        message: 'Resume created successfully',
      };
    } catch (error) {
      throw new Error('Failed to create resume');
    }
  });
