import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/perfume/:id',
      name: 'perfume-detail',
      component: () => import('@/views/PerfumeDetail.vue'),
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/Favorites.vue')
    }
  ]
})

export default router

