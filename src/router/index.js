import { createRouter, createWebHashHistory } from 'vue-router'
import PrincipalPageView from '@/views/PrincipalPage.vue'

const routes = [
  {
    path: '/',
    name: 'SourcePage',
    redirect: '/portfolio'
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PrincipalPageView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
