/*
 * @Description: 
 * @Author: zhangyuru
 * @Date: 2022-10-28 18:08:37
 * @LastEditors: zhangyuru 33493424@qq.com
 * @LastEditTime: 2022-11-08 17:48:52
 * @FilePath: \04-teach_front-vue3-ts\src\types\router.ts
 */
export interface Meta {
  icon?: string
  title?: string
  key?: any
  show?: boolean
  parent?: any
  parentId?: number | string
  hiddenHeaderContent?: any
  hideChildren?: any
  permission?: any
  target?: any
}

export interface Router {
  parentId?: number | string
  id?: number | string
  path?: string
  name?: string
  component?: any
  redirect?: string
  hidden?: boolean
  children?: Array<Router>
  meta?: Meta
  key?: string
}