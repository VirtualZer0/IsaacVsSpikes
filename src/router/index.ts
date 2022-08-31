import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'

// Routes for editor screen
import { EditorRoutes } from './editor';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dev/library',
    name: 'DevLibrary',
    component: () => import(/* webpackChunkName: "devlibrary" */ '../pages/dev/Library.vue')
  },

  {
    path: '/editor',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editormain" */ '../pages/editor/Main.vue'),
    children: EditorRoutes
  },
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
  routes
})

export default router
