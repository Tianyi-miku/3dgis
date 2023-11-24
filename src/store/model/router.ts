import { generatorDynamicRouter } from "../../router/generator-routers";
import { MutationTree, ActionTree } from 'vuex'
type RouterState = {
  routers: null
}

type routerType = {
  state: RouterState,
  mutations: MutationTree<RouterState>,
  actions: ActionTree<RouterState, {}>,
}

const routerList: routerType = ({
  state: {
    routers: null
  },

  mutations: {
    SET_ROUTERS: (state: RouterState, routers: any) => {
      state.routers = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }: any) {
      return new Promise(resolve => {
        generatorDynamicRouter().then((routers: any) => {
          // eslint-disable-next-line no-debugger
          commit('SET_ROUTERS', routers)

          resolve(false)
        })
      })
    }
  },

})

export default routerList
