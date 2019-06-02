import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  user: null,
  user_loading: true,
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
