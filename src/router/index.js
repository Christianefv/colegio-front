import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/maestros',
    name: 'maestros',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/MaestrosView.vue')
  },
  {
    path: '/materias',
    name: 'materias',
    component: () => import( '@/views/MateriasView.vue')
  },
  {
    path: '/materiasmaestros',
    name: 'materiasmaestros',
    component: () => import( '@/views/MateriasMaestrosView.vue')
  },
  {
    path: '/alumnos',
    name: 'alumnos',
    component: () => import( '@/views/AlumnosView.vue')
  },
  {
    path: '/grupos',
    name: 'grupos',
    component: () => import( '@/views/GruposView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
