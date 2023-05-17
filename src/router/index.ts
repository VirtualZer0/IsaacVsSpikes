import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';

// Routes for editor screen
import { EditorRoutes } from './editor';

// Game routes
import { GameRoutes } from './game';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: { path: '/game/menu/main-menu' },
  },
  {
    path: '/dev/library',
    name: 'DevLibrary',
    component: () =>
      import(/* webpackChunkName: "devlibrary" */ '../pages/dev/Library.vue'),
  },

  {
    path: '/editor',
    name: 'Editor',
    component: () =>
      import(/* webpackChunkName: "editormain" */ '../pages/editor/Main.vue'),
    children: EditorRoutes,
  },

  {
    path: '/game',
    name: 'Game',
    component: () =>
      import(/* webpackChunkName: "game" */ '../pages/game/Main.vue'),
    children: GameRoutes,
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
