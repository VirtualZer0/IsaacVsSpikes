export const GameRoutes = [
  {
    path: 'menu',
    name: 'GameMenu',
    component: () =>
      import(/* webpackChunkName: "game" */ '../pages/game/Menu.vue'),

    children: [
      {
        path: 'main-menu',
        game: 'GameMainMenu',
        component: () =>
          import(
            /* webpackChunkName: "game" */ '../pages/game/menu/MainMenu.vue'
          ),
      },
    ],
  },
];
