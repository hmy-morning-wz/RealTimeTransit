
export default {
  state: {
    city: '宝鸡市',
    policy: 'LEAST_TRANSFER' // 换乘策略
  },
  mutations: {
    HANDLE_POLICY: (state, policy) => {
      state.policy = policy
    }
  },
  actions: {
    HandlePolicy: ({ commit }, policy) => {
      commit('HANDLE_POLICY', policy)
    }
  }
}
