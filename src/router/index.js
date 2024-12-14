import { createRouter, createWebHistory } from 'vue-router'
import AudioPlayerPage from '@/views/AudioPlayerPage.vue'
import AboutPage from '@/views/AboutPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'audioplayerpage',
      component: AudioPlayerPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
 
  ],
})

export default router
