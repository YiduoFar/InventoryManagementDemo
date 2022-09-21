<template>
  <div>
    <el-tag style="width: 200px; border-radius: 0; font-size: 15px"
      >选择一个表格进行查询信息</el-tag
    >
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
    <div :is="myComp2"></div>
  </div>
</template>

<script>
import StorageInfoTable from "../tables/StorageInfoTable.vue";
import PurchaseInfoTable from "../tables/PurchaseInfoTable.vue";
import GoodInfoTable from "../tables/GoodInfoTable.vue";
export default {
  components: {
    StorageInfoTable,
    PurchaseInfoTable,
    GoodInfoTable,
  },
  data() {
    return {
      options: [
        {
          value: "0",
          label: "仓库",
        },
        {
          value: "1",
          label: "进货单",
        },
        {
          value: "提货单",
          label: "提货单",
          disabled: true,
        },
        {
          value: "盘存单",
          label: "盘存单",
          disabled: true,
        },
        {
          value: "2",
          label: "货物",
        },
      ],
      value: "",
    };
  },
  computed: {
    myComp2() {
      switch (this.value) {
        case "0": {
          console.log("StorageInfoTable");
          return "StorageInfoTable";
          break;
        }
        case "1": {
          console.log("PurchaseInfoTable");
          return "PurchaseInfoTable";
          break;
        }
        case "2": {
          console.log("GoodInfoTable");
          return "GoodInfoTable";
          break;
        }
        default: {
          return "StorageInfoTable";
        }
      }
    },
  },
};
</script>

<style lang="less">
</style>