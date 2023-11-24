import { createStore } from 'vuex'
import user from './model/user'
import routerList from './model/router'

type UserState = {
  [x: string]: any
  user: userType
}

type userType = {
  username: string,
  password: string,
}

type State = {
  user: UserState
  routerList: RouterState
}

type RouterState = {
  routers: null
}


export default createStore({
  state: {} as State,
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user,
    routerList
  }
})
