import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import store from './store/'
import './assets/css/global.css'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.use(ElementUI)
Vue.config.productionTip = false

// 页面刷新保持登录状态（登录拦截器）需要在挂载之前写
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    next()
  } else {
    if (sessionStorage.getItem('admin') != null) {
      // 已登录
      store.state.admin = JSON.parse(sessionStorage.getItem('admin'));
      next()
    } else {
      // 未登录
      ElementUI.Message.error('没有登录，请先登录')
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


