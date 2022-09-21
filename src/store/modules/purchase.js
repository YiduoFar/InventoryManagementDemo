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

    // 获取所有进货单
    async queryAllPurchaseTable() {
      var tableData = await axios({
        url: '/system/queryAllPurchaseTable',
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return tableData
    },

    // 获取所有进货单id
    async queryAllPurchaseId() {
      var idGroup = await axios({
        url: '/system/queryAllPurchaseId',
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return idGroup
    },

    // 新增空的进货单
    async insertPurchaseByStorageId(state, storageIdSelected) {
      return await axios({
        url: '/system/insertPurchaseByStorageId',
        method: 'POST',
        headers: {
          // 解决后端Content type 'application/x-www-form-urlencoded;charset=UTF-8' not supported
          'content-Type': 'application/json;charset=utf-8'
        },
        data: storageIdSelected
      }).then((res) => {
        if (res.data === true) {
          Notification.success({
            title: 'success',
            message: '成功添加一张空的进货单'
          })
        } else {
          Notification.success({
            title: 'failed',
            message: '操作失败'
          })
        }
        return res.data
      })
    },

    // 获取空的进货单id 进货时间为空
    async queryAllEmptyPurchaseIds() {
      var idGroup = await axios({
        url: '/system/queryAllEmptyPurchaseIds',
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return idGroup
    },

    // 获取空的进货单id 入库时间为空
    async queryAllEmptyPurchaseIds2() {
      var idGroup = await axios({
        url: '/system/queryAllEmptyPurchaseIds2',
        method: 'GET',
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return idGroup
    },

    // 获取选取的进货单对应的货物, state不可以省略，否则出错
    async queryGoodByPurchaseTableId(state, pid) {
      var goodList = await axios({
        url: '/system/queryGoodByPurchaseTableId',
        method: 'GET',
        params: {
          id: pid
        }
      }).then((res) => {
        console.log(res.data);
        return res.data != null ? res.data : null
      })
      return goodList
    },

    /**
     * 一键进货
     * @param {*} purchaseTable 
     */
    async updatePurchaseTableById(state, purchaseTable) {
      await axios({
        url: '/system/updatePurchaseTableById',
        method: 'POST',
        data: qs.stringify(purchaseTable)
      }).then((res) => {
        console.log(res.data);
        if (res.data === true) {
          Notification.success({
            title: 'success',
            message: '进货成功！'
          })
        }
      })
    },

    // 货物退出
    async updatePurchaseTableById2(state, purchaseTable) {
      console.log('pur2', purchaseTable);
      await axios({
        url: '/system/updatePurchaseTableById2',
        method: 'POST',
        data: qs.stringify(purchaseTable)
      }).then((res) => {
        console.log(res.data);
        if (res.data === true) {
          Notification.success({
            title: 'success',
            message: '操作成功！'
          })
        }
      })
    },


  },
  modules: {
  }
}
