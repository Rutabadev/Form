import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firebase: null,
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    removeUser (state) {
      state.user = null
    },
    setFirebase (state, firebase) {
      state.firebase = firebase
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    removeUser ({ commit }) {
      commit('removeUser')
    },
    setFirebase ({ commit }, firebase) {
      commit('setFirebase', firebase)
    }
  },
  modules: {
  }
})
