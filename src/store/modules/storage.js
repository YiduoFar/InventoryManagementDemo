import axios from "axios"
import router from "../../router"
import { Notification } from 'element-ui'
import ElementUI from 'element-ui'
import qs from 'qs'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 获取所有仓库
    async queryAllStorage() {
      var tableData = await axios({
        url: '/system/queryAllStorage',
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return tableData
    },

    /**
     * 新建仓库
     * @param {*} storage 
     * @returns 
     */
    async insertStorage(state, storage) {
      var admin = JSON.parse(sessionStorage.getItem('admin'))
      storage.storageAdminId = admin.adminId
      var goodTypeList = await axios({
        url: '/system/insertStorage',
        method: 'POST',
        data: qs.stringify(storage)
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return goodTypeList
    },

    // 入库
    async enterStorage(state, purchaseIdSelected2) {
      await axios({
        url: '/system/enterStorage',
        method: 'POST',
        headers: {
          // 解决后端Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported
          'content-Type': 'application/json;charset=utf-8'
        },
        data: purchaseIdSelected2
      }).then((res) => {
        if (res.data === true) {
          Notification.success({
            title: 'success',
            message: '入库成功'
          })
        } else {
          Notification.success({
            title: 'failed',
            message: '操作失败'
          })
        }
      })
    },
  },
  modules: {
  }
}
