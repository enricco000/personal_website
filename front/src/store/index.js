import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'personal_website',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [vuexPersist.plugin],
  state: {
    token: null,
    user: null,
    isAdmin: null,
    isUserLoggedin: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token != null) {
        state.isUserLoggedin = true
      } else {
        state.isUserLoggedin = false
      }
    },
    setUser (state, user) {
      state.username = user
    },
    setIsAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setIsAdmin ({ commit }, isAdmin) {
      commit('setIsAdmin', isAdmin)
    },
    logout ({ commit }) {
      commit('setUser', null)
      commit('setToken', null)
    }
  },
  getters: {
    isUserLoggedin: state => {
      return state.isUserLoggedin
    },
    isAdmin: state => {
      return state.isAdmin
    },
    username: state => {
      return state.user
    }
  }
})
