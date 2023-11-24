/*
 * @Author: zhangyuru 33493424@qq.com
 * @Date: 2022-11-02 11:26:27
 * @LastEditors: zhangyuru 33493424@qq.com
 * @LastEditTime: 2022-11-02 11:28:32
 * @FilePath: \04-teach_front-vue3-ts\src\router\control\student.ts
 * @Description: student
 */
import { Router } from '@/types/router'

export const myrouter: Array<Router> = [
  {
    name: 'vue',
    parentId: 0,
    id: 40,
    meta: {
      title: 'vue',
      show: true
    }
  },
  {
    name: 'thisop',
    parentId: 40,
    id: 41,
    meta: {
      title: 'thisop',
      show: true
    },
    path: '/vue/thisop',
    component: 'thisop',
  },
  {
    name: 'cesuim',
    parentId: 0,
    id: 1,
    meta: {
      title: 'cesuim',
      show: true
    }
  },
  {
    name: '基础',
    parentId: 1,
    id: 2,
    meta: {
      title: '基础',
      show: true
    }
  },
  {
    name: 'point',
    path: '/cesuim/basis/point',
    id: 3,
    meta: {
      title: 'point',
      show: true
    },
    parentId: 2,
    component: 'point',
  },
  {
    name: 'line',
    path: '/cesuim/basis/line',
    id: 4,
    meta: {
      title: 'line',
      show: true
    },
    parentId: 2,
    component: 'line',
  },
  {
    name: 'polygon',
    path: '/cesuim/basis/polygon',
    id: 5,
    meta: {
      title: 'polygon',
      show: true
    },
    parentId: 2,
    component: 'polygon',
  },

  {
    name: '交互',
    parentId: 1,
    id: 6,
    meta: {
      title: '交互',
      show: true
    }
  },
  {
    name: 'scene',
    path: '/cesuim/interaction/scene',
    id: 7,
    meta: {
      title: 'scene',
      show: true
    },
    parentId: 6,
    component: 'scene',
  },
  {
    name: '模型',
    parentId: 1,
    id: 8,
    meta: {
      title: '模型',
      show: true
    }
  },
  {
    name: 'gltf',
    path: '/cesuim/models/gltf',
    id: 9,
    meta: {
      title: 'gltf',
      show: true
    },
    parentId: 8,
    component: 'gltf',
  },

  {
    name: '3DTiles',
    path: '/cesuim/models/3DTiles',
    id: 10,
    meta: {
      title: '3DTiles',
      show: true
    },
    parentId: 8,
    component: '3DTiles',
  },
  {
    name: 'OsmBuildings',
    path: '/cesuim/models/OsmBuildings',
    id: 11,
    meta: {
      title: 'OsmBuildings',
      show: true
    },
    parentId: 8,
    component: 'OsmBuildings',
  },

  {
    name: '实例',
    parentId: 1,
    id: 12,
    meta: {
      title: '实例',
      show: true
    }
  },

  {
    name: 'action',
    path: '/cesuim/example/action',
    id: 13,
    meta: {
      title: 'action',
      show: true
    },
    parentId: 12,
    component: 'action',
  },

  {
    name: 'unonline',
    path: '/cesuim/example/unonline',
    id: 13,
    meta: {
      title: '离线',
      show: true
    },
    parentId: 12,
    component: 'unonline',
  },

  {
    name: 'arcgis',
    parentId: 0,
    id: 30,
    meta: {
      title: 'arcgis',
      show: true
    }
  },
  {
    name: 'arcgisjc',
    path: '/arcgis/basis',
    id: 21,
    meta: {
      title: 'basis',
      show: true
    },
    parentId: 30,
    component: 'basis',
  },


  {
    name: 'threejs',
    parentId: 0,
    id: 20,
    meta: {
      title: 'threejs',
      show: true
    }
  },
  {
    name: 'cubecamera',
    path: '/threejs/cubecamera',
    id: 21,
    meta: {
      title: 'cubecamera',
      show: true
    },
    parentId: 20,
    component: 'cubecamera',
  },
  {
    name: 'movement',
    path: '/threejs/movement',
    id: 22,
    meta: {
      title: 'movement',
      show: true
    },
    parentId: 20,
    component: 'movement',
  },

  {
    name: 'openLayers',
    parentId: 0,
    id: 50,
    meta: {
      title: 'openLayers',
      show: true
    }
  },
  {
    name: 'openLayers',
    path: '/openLayers/basis',
    id: 31,
    meta: {
      title: 'basis',
      show: true
    },
    parentId: 50,
    component: 'basis',
  },
]

export default myrouter