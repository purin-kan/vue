import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
    path: '/project',
    name: 'project',
    component: ProjectView
    },
    {
    path: '/exercise-01',
    name: 'exercise-01',
    component: () => import('../views/Exercise-01.vue')
    },
    {
    path: '/exercise-02',
    name: 'exercise-02',
    component: () => import('../views/Exercise-02.vue')
    },
    {
    path: '/exercise-03',
    name: 'exercise-03',
    component: () => import('../views/Exercise-03.vue')
    },
    {
    path: '/exercise-04',
    name: 'exercise-04',
    component: () => import('../views/Exercise-04.vue')
    },
    {
    path: '/exercise-05',
    name: 'exercise-05',
    component: () => import('../views/Exercise-05.vue')
    },
    {
    path: '/api',
    name: 'api',
    component: () => import('../views/api.vue')
    },
    {
    path: '/moviedetail/:id',
    name: 'MovieDetail',
    component: () => import('../views/MovieDetail.vue')
    }
  ]
})

export default router
