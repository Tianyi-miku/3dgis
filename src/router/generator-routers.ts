import BasicLayout from '@/layout/BasicLayout.vue'
import routers from "./myrouter";
import { Router } from '@/types/router'
// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: BasicLayout,
  403: () => import('@/views/exception/403.vue'),
  404: () => import('@/views/exception/404.vue'),
  500: () => import('@/views/exception/500.vue'),
}

/**
 * @Description 动态生成菜单
 * @returns { Promise<Router> }
 */

// 根级菜单
const rootRouter: any = {
  path: '/',
  name: 'BasicLayout',
  meta: {
    title: '首页'
  },
  id: 0,
  component: () => import(/* webpackChunkName: "about" */ '../layout/BasicLayout.vue'),
  children: []
}
export const generatorDynamicRouter = () => {

  return new Promise((resolve) => {
    // menuNav.push(routers)
    // let content: any[] = []
    const tree: any[] = []
    listToTree(routers, tree, 0)
    const ag = generator(tree)
    rootRouter.children = ag
    resolve(rootRouter)
  })
}

/**
 * @Description 格式化树形结构数据 生成 vue-router 层级路由表
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap: any[]) => {
  return routerMap.map((item: Router) => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon, parent, key } = item.meta || {}
    let component
    if (item.component) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      component = constantRouterComponents[item.component || item.key] ||
        (() => import(`@/views${item.path}`))
    }


    const currentRouter: any = {
      hidden: false,
      hideChildrenInMenu: false,
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${parent?.path || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      // 该路由对应页面的 组件 :方案1
      // component: constantRouterComponents[item.component || item.key],
      // 该路由对应页面的 组件 :方案2 (动态加载)
      component,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name,
        parent,
        key
      }
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children)
    }
    return currentRouter
  })
}

/**
 * @Description 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list: any, tree: any, parentId: any) => {
  // eslint-disable-next-line no-debugger
  list.forEach((item: any) => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child: any = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item.id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}
