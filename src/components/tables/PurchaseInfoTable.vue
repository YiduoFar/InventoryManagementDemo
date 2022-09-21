<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.purchaseStorageId
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      "
      v-loading="loading"
      style="width: 100%; font-size: 17px"
      highlight-current-row
      height="900"
      border
    >
      <el-table-column prop="purchaseId" label="进单ID" width="150">
      </el-table-column>
      <el-table-column prop="purchaseDate" label="进货日期"> </el-table-column>
      <el-table-column prop="purchaseGoodId" label="货物ID（组）">
      </el-table-column>
      <el-table-column prop="purchaseGoodPrice" label="进货单价（组）">
      </el-table-column>
      <el-table-column prop="purchaseGoodNum" label="货物数量（组）">
      </el-table-column>
      <el-table-column prop="purchaseStorageId" label="仓库号" width="100">
      </el-table-column>
      <el-table-column prop="purchaseEnterDate" label="入库日期">
      </el-table-column>
      <el-table-column prop="purchaseAdminId" label="创建人ID" width="100">
      </el-table-column>
      <!-- 自带的搜索功能 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入仓库号搜索其对应的进货单"
            style="width: 200px"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" disabled>Edit</el-button>
          <el-button size="mini" type="danger" disabled>Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      loading: true,
    };
  },
  methods: {
    ...mapActions("purchase", ["queryAllPurchaseTable"]),
  },
  mounted: function () {
    this.queryAllPurchaseTable().then((res) => {
      this.tableData = res;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  },
};
</script>

<style lang="less">
</style>