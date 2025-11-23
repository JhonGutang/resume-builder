<script setup lang="ts">
import { Button } from '@/components/ui'
import { Sparkles } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-card rounded-lg p-12 shadow-sm border text-center">
    <Sparkles class="w-16 h-16 mx-auto mb-4 text-primary" />
    <h2 class="text-2xl font-semibold mb-2">AI-Assisted Resume Builder</h2>
    <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
      Let our AI help you create a compelling resume. Answer a few questions and we'll generate 
      professional content tailored to your experience and career goals.
    </p>
    <div class="max-w-2xl mx-auto space-y-6 text-left">
      <div class="border rounded-lg p-6">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
          Tell us about your career
        </h3>
        <p class="text-sm text-muted-foreground ml-8">
          Share your job history, skills, and accomplishments
        </p>
      </div>
      <div class="border rounded-lg p-6">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>
          AI generates content
        </h3>
        <p class="text-sm text-muted-foreground ml-8">
          Our AI creates professional descriptions and highlights your strengths
        </p>
      </div>
      <div class="border rounded-lg p-6">
        <h3 class="font-semibold mb-4 flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>
          Review and customize
        </h3>
        <p class="text-sm text-muted-foreground ml-8">
          Fine-tune the AI-generated content to match your style
        </p>
      </div>
      <Button class="w-full" size="lg">
        <Sparkles class="w-4 h-4 mr-2" />
        Start AI Assistant
      </Button>
    </div>
  </div>
</template>

