<script setup lang="ts">
import { ref } from 'vue';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import { Button } from '@/components/ui/button';

const showSignup = ref(false);

const toggleAuthMode = () => {
  showSignup.value = !showSignup.value;
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md">
      <Signup v-if="showSignup" />
      <Signin v-else />

      <div class="text-center mt-4">
        <Button variant="ghost" @click="toggleAuthMode">
          {{ showSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
        </Button>
      </div>
    </div>
  </div>
</template>
