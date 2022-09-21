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

        // 获取所有货物
        async queryAllGood() {
            var goodList = await axios({
                url: '/system/queryAllGood',
                method: 'GET',
            }).then((res) => {
                console.log(res.data);
                return res.data != null ? res.data : null
            })
            return goodList
        },

        // 获取所有类型
        async queryAllGoodType() {
            var goodTypeList = await axios({
                url: '/system/queryAllGoodType',
                method: 'GET',
            }).then((res) => {
                console.log(res.data);
                return res.data != null ? res.data : null
            })
            return goodTypeList
        },

        // 通过选择的进货单号获取类型
        async queryGoodTypeByPurchaseId(state, purchaseId) {
            var goodType = await axios({
                url: '/system/queryGoodTypeByPurchaseId',
                method: 'GET',
                params: {
                    purchaseId: purchaseId
                }
            }).then((res) => {
                console.log(res.data);
                return res.data != null ? res.data : null
            })
            return goodType
        },

        // 通过选择的进货单号获取类型 进而获取类型下的所有货物
        async queryGoodByGoodTypeBById(state, purchaseId) {
            var goodList = await axios({
                url: '/system/queryGoodByGoodTypeBById',
                method: 'GET',
                params: {
                    purchaseId: purchaseId
                }
            }).then((res) => {
                console.log(res.data);
                return res.data != null ? res.data : null
            })
            return goodList
        },

    },
    modules: {
    }
}
