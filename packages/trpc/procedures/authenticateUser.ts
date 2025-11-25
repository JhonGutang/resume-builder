import { publicProcedure } from '../trpc';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const authenticateUser = publicProcedure
  .input(z.object({
    email: z.string().email(),
    password: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const userCollection = ctx.db.collection('users');
    
    const user = await userCollection.findOne({
      email,
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  });

