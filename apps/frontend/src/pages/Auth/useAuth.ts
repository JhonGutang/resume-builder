import { ref } from 'vue';
import { trpcClient } from '@/lib/trpcClient';

export interface SignupData {
  firstName: string;
  lastName: string;
  password: string; 
  email: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export const useAuth = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const signup = async (data: SignupData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await trpcClient.createUser.mutate({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Signup failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const signin = async (data: SigninData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await trpcClient.authenticateUser.mutate({
        email: data.email,
        password: data.password,
      });
    
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Signin failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    signup,
    signin,
    isLoading,
    error,
  };
};
