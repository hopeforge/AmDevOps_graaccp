import Vue from 'vue'
import Vuex from 'vuex'
// import AuthService from '../services/AuthService.js'
const AuthService = require('../service/AuthService')
let nome
let token
Vue.use(Vuex)
function verifyToken () {
  AuthService.verifyToken(localStorage.getItem('token')).then(resp => {
    if (resp.data.token != null) {
      return resp.data.token
    } else {
      return ''
    }
  })
}
// Create a new store
const store = new Vuex.Store({
  actions: {
    login ({
      commit
    }, user) {
      // //console.log('commit', commit)
      return new Promise((resolve, reject) => {
        try {
          // debugger
          AuthService.authenticate(user.email, user.password)
            .then(res => {
              var data = JSON.parse(res.request.response)
              useNome = data.user.nome
              token = res.data.token

              localStorage.setItem('token', token)
              // Add the following line:
              commit('auth_success', token)
              resolve(res)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
            })
        } catch (err) {
          // console.log(err)
        }
      })
    },
    logout ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedUser: state => state.user
  },
  modules,
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token) {
      state.status = 'success'
      state.token = token
      state.user = nome
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  state: {
    status: '',
    token: verifyToken() || '',
    user: ''
  }

})

export default store
