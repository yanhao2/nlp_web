import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key ='token'
export default new Vuex.Store({
  state: {
    urlApi: 'http://60.247.62.110:10047',
    clientId: process.env.NODE_ENV === 'development' ? 'nlp_web' : 'nlp_web',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  getters: {
    getSortage:function (state) {
      if(!state.token){
        state.token =JSON.parse(localStorage.getItem(key))
      }
      return state.token
    }
  },
  mutations: {
    setStorage(state,value){
      state.token =value;
      localStorage.setItem(key,JSON.stringify(value))
    },
    removeStorage(state){
      state.token =null;
      localStorage.removeItem(key)
    },
  },
  actions: {
  },
  modules: {
  }
})
