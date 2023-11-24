import { Module } from "vuex";

type UserState = {
  user: User
}

type User = {
  username: string,
  password: string
}

// root-state
export type RootState = {

}

const userStore: Module<UserState, RootState> = {
  state: {
    user: {
      username: '',
      password: ''
    }
  },
  getters: {
    get_User: (state: UserState) => {
      const user = state.user.username ? state.user : JSON.parse(window.sessionStorage.getItem('user') as string)
      return user
    },
  },
  mutations: {
    SET_User: (state: UserState, user: User) => {
      window.sessionStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
  },
  actions: {
    // 登录
    Login({ commit }: any, userInfo: any) {
      commit('SET_User', userInfo)
    },
  }
}

export default userStore