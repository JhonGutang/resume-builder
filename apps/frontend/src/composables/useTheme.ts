import { ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')
const THEME_STORAGE_KEY = 'resume-builder-theme'

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  }
}

