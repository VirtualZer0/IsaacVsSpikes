export const EditorRoutes = [
  {
    path: '',
    name: 'EditorStartup',
    component: () => import(/* webpackChunkName: "editorstartup" */ '../pages/editor/Startup.vue'),
  },

  {
    path: 'indev',
    name: 'EditorInDev',
    component: () => import(/* webpackChunkName: "editorindev" */ '../pages/editor/InDev.vue'),
  },

  {
    path: 'new',
    name: 'EditorNewProject',
    component: () => import(/* webpackChunkName: "editornewproject" */ '../pages/editor/NewProject.vue'),
  },

  {
    path: 'list',
    name: 'EditorMainList',
    component: () => import(/* webpackChunkName: "editormainlist" */ '../pages/editor/MainList.vue'),
  },

  {
    path: 'list/:resource',
    name: 'EditorResourcesList',
    component: () => import(/* webpackChunkName: "editorresourceslist" */ '../pages/editor/ResourcesList.vue'),
  },


  // Пути редакторов
  {
    path: 'levels/:id',
    name: 'EditorLevelMain',
    component: () => import(/* webpackChunkName: "editorlevel" */ '../pages/editor/level/Main.vue'),
    children: [
      {
        path: 'general',
        name: 'EditorLevelGeneral',
        component: () => import(/* webpackChunkName: "editorlevel" */ '../pages/editor/level/General.vue'),
      },
      {
        path: 'view',
        name: 'EditorLevelView',
        component: () => import(/* webpackChunkName: "editorlevel" */ '../pages/editor/level/View.vue'),
      },
      {
        path: 'generation',
        name: 'EditorLevelGeneration',
        component: () => import(/* webpackChunkName: "editorlevel" */ '../pages/editor/level/Generation.vue'),
      }
    ]
  },

  {
    path: 'rooms/:id',
    name: 'EditorRoomMain',
    component: () => import(/* webpackChunkName: "editorroom" */ '../pages/editor/room/Main.vue'),
    children: [
      {
        path: 'general',
        name: 'EditorRoomGeneral',
        component: () => import(/* webpackChunkName: "editorroom" */ '../pages/editor/room/General.vue'),
      },
      {
        path: 'view',
        name: 'EditorRoomView',
        component: () => import(/* webpackChunkName: "editorroom" */ '../pages/editor/room/View.vue'),
      },
      {
        path: 'scenaries',
        name: 'EditorRoomScenaries',
        component: () => import(/* webpackChunkName: "editorroom" */ '../pages/editor/room/Scenaries.vue'),
      }
    ]
  },

  {
    path: 'monsters/:id',
    name: 'EditorMonsterMain',
    component: () => import(/* webpackChunkName: "editormonster" */ '../pages/editor/monster/Main.vue'),
    children: [
      {
        path: 'general',
        name: 'EditorMonsterGeneral',
        component: () => import(/* webpackChunkName: "editormonster" */ '../pages/editor/monster/General.vue'),
      },
    ]
  },

  {
    path: 'assets/:id',
    name: 'EditorAssetMain',
    component: () => import(/* webpackChunkName: "editorasset" */ '../pages/editor/asset/Main.vue'),
    children: []
  },

  {
    path: 'doorDescs/:id',
    name: 'EditorDoorDescMain',
    component: () => import(/* webpackChunkName: "editordoordesc" */ '../pages/editor/doorDesc/Main.vue'),
    children: [
      {
        path: 'general',
        name: 'EditorDoorDescGeneral',
        component: () => import(/* webpackChunkName: "editordoordesc" */ '../pages/editor/doorDesc/General.vue'),
      },
    ]
  },
]