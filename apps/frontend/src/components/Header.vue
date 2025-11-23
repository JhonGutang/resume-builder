<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/ui'
import { useTheme } from '@/composables/useTheme'
import { useRouter } from 'vue-router'

const { theme, toggleTheme } = useTheme()
const router = useRouter()

const navigateHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-6">
        <button 
          @click="navigateHome"
          class="flex items-center space-x-2 font-semibold text-lg hover:opacity-80 transition-opacity"
        >
          <span>Resume Builder</span>
        </button>
      </div>

      <div class="flex items-center gap-2">
        <Button
          @click="toggleTheme"
          variant="ghost"
          size="icon"
          class="w-9 h-9"
          aria-label="Toggle theme"
        >
          <Sun v-if="theme === 'light'" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </header>
</template>

