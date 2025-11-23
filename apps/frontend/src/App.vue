<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <RouterView />
  </div>
</template>
