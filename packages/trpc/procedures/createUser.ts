import { publicProcedure } from '../trpc';
import bcrypt from 'bcrypt';
import { User } from '../schema/user';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export const createUser = publicProcedure
  .input(User)
  .mutation(async ({ input, ctx }) => {
    const { firstName, lastName, email, password } = input;
    const userCollection = ctx.db.collection('users');
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = crypto.randomUUID();
    await userCollection.insertOne({
      userId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    
    return {
      id: userId,
      firstName,
      lastName,
      email,
    };
  });
