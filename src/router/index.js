import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/views/AboutPage.vue'
import MainPage from '@/views/MainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path:'/about',
      name:'about',
      component: AboutPage
    }
  ],
})

export default router
