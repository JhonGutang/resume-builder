import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home/index.vue'
import BuildResume from '@/pages/BuildResume/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/build-resume',
      name: 'build-resume',
      component: BuildResume,
    },
  ],
})

export default router
