import axios from "axios"
import router from "../../router"
import { Notification } from 'element-ui'
import ElementUI from 'element-ui'
import qs from 'qs'

// Vue.use(ElementUI)

export default {
  namespaced: true,
  state: {
    admin: {
      adminId: '',
      adminName: '',
      adminPhone: '13162168412',
      adminPassword: '123',
      adminType: ''
    }
  },
  mutations: {
  },
  actions: {
    login() {
      axios({
        url: '/system/login',
        method: 'GET',
        params: this.state.admin
      }).then((res) => {
        var admin = res.data;
        if (admin.adminId != null) {
          console.log(admin);
          // 存储在vuex
          this.state.admin = admin
          // 存储在session
          sessionStorage.setItem('admin', JSON.stringify(this.state.admin))
          // console.log('admin:',(JSON.parse(sessionStorage.getItem('admin'))))

          Notification.success({
            title: 'success',
            message: '登录成功'
          })
          // 转去主页
          router.push('/main')
        } else {
          Notification.error({
            title: 'error',
            message: '登录失败'
          })
        }
      })
    },

    esc() {
      ElementUI.MessageBox.confirm('确定要退出系统吗？', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(1);
        sessionStorage.removeItem('admin')
        router.push('/login')
      }).catch(() => {
        console.log('取消操作');
      })
    },

    /**
     * 查询所有管理员
     * @returns 
     */
    async queryAllAdmin() {
      var adminList = await axios({
        url: '/system/queryAllAdmin',
        method: 'GET',
      }).then((res) => {
        return res.data != null ? res.data : null // --bug 写到这才发现有毛病，直接return res.data是一个意思
      })
      return adminList
    },

    /**
     * 根据id修改口令
     * @returns 
     */
    async updateAdminPasswordById(state, admin) {
      return await axios({
        url: '/system/updateAdminPasswordById',
        method: 'POST',
        data: qs.stringify(admin)
      }).then((res) => {
        return res.data
      })
    },

    /**
     * 根据id修改权限
     * @returns 
     */
    async updateAdminTypeById(state, admin) {
      return await axios({
        url: '/system/updateAdminTypeById',
        method: 'POST',
        data: qs.stringify(admin)
      }).then((res) => {
        return res.data
      })
    }
  },
  modules: {
  }
}
