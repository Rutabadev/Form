import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    removeUser (state) {
      state.user = null
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    removeUser ({ commit }) {
      commit('removeUser')
    }
  },
  modules: {
  }
})
