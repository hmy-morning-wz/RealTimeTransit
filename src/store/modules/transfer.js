
const app = {
  state: {
    currentPos: null,
    startObj: null, // 起始位置
    endObj: null,
    pos: {
      start: '出发地:我的位置',
      end: '目的地'
    }
  },
  mutations: {
    // 设置当前位置
    SET_CURRENT_POS: (state, pos) => {
      console.log('SET_CURRENT_POS' + JSON.stringify(pos))
      state.currentPos = pos
      if (pos && state.pos.start.indexOf('我的位置')) {
        state.startObj = state.currentPos
      } else if (pos && state.pos.end.indexOf('我的位置')) {
        state.endObj = state.currentPos
      }
    },
    EXCHANGE_POS: (state) => {
      let [p, obj] = [state.pos.start, state.startObj]
      state.startObj = state.endObj
      state.endObj = obj
      if (state.pos.end === '我的位置') state.pos.start = '出发地:我的位置'
      else if (state.pos.end === '目的地') state.pos.start = '出发地'
      else state.pos.start = state.pos.end

      if (p === '出发地:我的位置') state.pos.end = '我的位置'
      else if (p === '出发地') state.pos.end = '目的地'
      else state.pos.end = p
    },
    SET_END: (state, pos) => {
      state.endObj = pos
    },
    SET_START: (state, pos) => {
      state.startObj = pos
    },
    HANDLE_POS: (state, pos) => {
      state.pos = Object.assign(state.pos, pos)
    },
    // 当前位置
    HANDLE_CURRENT_POS: (state, pos) => {
      console.log('HANDLE_CURRENT_POS' + JSON.stringify(pos))
      state.currentPos = pos
      if (pos && state.pos.start.indexOf('我的位置')) {
        state.startObj = state.currentPos
      } else if (pos && state.pos.end.indexOf('我的位置')) {
        state.endObj = state.currentPos
      }
    }
  },
  actions: {
    SetCurrentPos: ({ commit }, obj) => {
      console.log('SET_CURRENT_POS', obj)
      commit('SET_CURRENT_POS', obj)
    },
    HandleCurrentPos: async ({ commit }) => {
      console.warn('Handle current pos get location')
      let c = await new Promise((resolve, reject) => {
        window.yl.call(
          'getLocation',
          {},
          {
            onSuccess: (res) => {
              // alert(JSON.stringify(res.param))
              resolve(res.param)
            },
            onFail: (err) => {
              console.log(err)
              reject(err)
            }
          })
      })
      c.location = `${c.longitude},${c.latitude}`
      // alert(JSON.stringify(c))
      commit('HANDLE_CURRENT_POS', c)
    },
    ExchangePos: ({ commit }) => {
      commit('EXCHANGE_POS')
    },
    SetStart: ({ commit }, obj) => {
      commit('SET_START', obj)
    },
    SetEnd: ({ commit }, pos) => {
      commit('SET_END', pos)
    },
    HandlePos: ({ commit }, pos) => {
      commit('HANDLE_POS', pos)
    }
  }
}

export default app
