import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
import storage from './modules/storage'
import purchase from './modules/purchase'
import good from './modules/good'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toCompArr: [0, 0, 0, 0]
  },
  mutations: {
    setToCompArr(state, value) {
      // 浅拷贝无法改变state，需深拷贝数组
      state.toCompArr = [...value]
    }
  },
  actions: {

  },
  modules: {
    admin, storage, purchase, good
  },

  getters: {
    toCompArr_get: state => state.toCompArr,
  }
})
