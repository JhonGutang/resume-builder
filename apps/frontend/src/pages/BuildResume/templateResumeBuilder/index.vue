<script setup lang="ts">
import { FileText } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-card rounded-lg p-12 shadow-sm border text-center">
    <FileText class="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
    <h2 class="text-2xl font-semibold mb-2">Choose a Template</h2>
    <p class="text-muted-foreground mb-6">
      Select from professionally designed resume templates to get started quickly.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div class="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
        <div class="bg-muted h-40 rounded mb-3"></div>
        <p class="font-medium">Classic Template</p>
        <p class="text-sm text-muted-foreground">Traditional and professional</p>
      </div>
      <div class="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
        <div class="bg-muted h-40 rounded mb-3"></div>
        <p class="font-medium">Modern Template</p>
        <p class="text-sm text-muted-foreground">Clean and contemporary</p>
      </div>
      <div class="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
        <div class="bg-muted h-40 rounded mb-3"></div>
        <p class="font-medium">Creative Template</p>
        <p class="text-sm text-muted-foreground">Stand out from the crowd</p>
      </div>
    </div>
  </div>
</template>

