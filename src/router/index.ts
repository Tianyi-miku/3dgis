import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to: any, from: any, next) => {
  if (!store.getters.get_User?.username) {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.routerList.routers) {
      await store.dispatch('GenerateRoutes')
      const rute: any = store.state.routerList.routers
      router.addRoute(rute);
      next(to.fullPath);
    } else {
      next();
    }
  }

})

export default router
