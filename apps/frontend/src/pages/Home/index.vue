<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'

const router = useRouter()

const navigateToBuildResume = () => {
  router.push({ name: 'build-resume' })
}
</script>

<template>
  <div class="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
    <div class="text-center space-y-6 px-4">
      <h1 class="text-4xl font-bold">Resume Builder</h1>
      <p class="text-muted-foreground text-lg">Create your professional resume with ease</p>
      <Button @click="navigateToBuildResume" size="lg">
        Build Your Resume
      </Button>
    </div>
  </div>
</template>
