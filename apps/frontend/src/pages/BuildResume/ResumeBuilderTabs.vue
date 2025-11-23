<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { FileText, Sparkles, Pencil } from 'lucide-vue-next'

defineSlots<{
  manual?: () => any
  template?: () => any
  ai?: () => any
}>()
</script>

<template>
  <Tabs default-value="manual" class="w-full">
    <TabsList class="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
      <TabsTrigger value="manual" class="gap-2">
        <Pencil class="w-4 h-4" />
        Manual
      </TabsTrigger>
      <TabsTrigger value="template" class="gap-2">
        <FileText class="w-4 h-4" />
        Template
      </TabsTrigger>
      <TabsTrigger value="ai" class="gap-2">
        <Sparkles class="w-4 h-4" />
        AI Assisted
      </TabsTrigger>
    </TabsList>
    
    <TabsContent value="manual">
      <slot name="manual" />
    </TabsContent>
    
    <TabsContent value="template">
      <slot name="template" />
    </TabsContent>
    
    <TabsContent value="ai">
      <slot name="ai" />
    </TabsContent>
  </Tabs>
</template>

