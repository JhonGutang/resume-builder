<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Loader2, Mail } from 'lucide-vue-next';
import { useAuth } from '../useAuth';

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const { signup, isLoading, error } = useAuth();

const passwordError = computed(() => {
  if (formData.value.confirmPassword && formData.value.password !== formData.value.confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
});

const handleSignup = async () => {
  if (passwordError.value) {
    return;
  }

  try {
    await signup({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
    });
    console.log('Signup successful');
  } catch (err) {
    console.error('Signup failed:', err);
  }
};
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6">
    <div class="space-y-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Create an account</h1>
        <p class="text-muted-foreground">Enter your details to get started</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="firstName">First Name</Label>
            <div class="relative">
              <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                placeholder="John"
                class="pl-9"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="lastName">Last Name</Label>
            <div class="relative">
              <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                placeholder="Doe"
                class="pl-9"
                required
              />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <div class="relative">
            <Mail class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="john.doe@example.com"
              class="pl-9"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <div class="relative">
            <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="••••••••"
              class="pl-9"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <div class="relative">
            <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="pl-9"
              required
            />
          </div>
          <p v-if="passwordError" class="text-sm text-destructive">
            {{ passwordError }}
          </p>
        </div>

        <p v-if="error" class="text-sm text-destructive">
          {{ error }}
        </p>

        <Button type="submit" class="w-full" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Create Account
        </Button>
      </form>
    </div>
  </div>
</template>
