import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '@/view/IndexView/index.vue'

import {IndexRouter} from './ViewRouter/IndexRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'',
      component:IndexView,
      children:IndexRouter
    }
  ],
})

export default router
