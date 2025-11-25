<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { signin, isLoading, error: authError } = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');

const handleSignin = async () => {
  error.value = '';
  
  try {
    const result = await signin({
      email: email.value,
      password: password.value,
    });
    console.log('Signed in successfully:', result);
    router.push('/build-resume');
  } catch (err) {
    error.value = authError.value || (err instanceof Error ? err.message : 'An error occurred');
  }
};
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Sign In</h1>
        <p class="text-muted-foreground">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSignin" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            :disabled="isLoading"
          />
        </div>

        <div v-if="error" class="text-sm text-red-500">
          {{ error }}
        </div>

        <Button type="submit" class="w-full" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>
    </div>
  </div>
</template>
