import Vue from 'vue'
import Vuex from 'vuex'
import transfer from './modules/transfer'
import line from './modules/line'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    transfer,
    line
  },
  getters
})

export default store
