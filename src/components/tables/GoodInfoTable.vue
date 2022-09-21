<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.goodName.toLowerCase().includes(search.toLowerCase())
        )
      "
      v-loading="loading"
      style="width: 100%; font-size: 17px"
      highlight-current-row
      border
      height="900"
    >
      <el-table-column prop="goodId" label="货物ID" width="200">
      </el-table-column>
      <el-table-column prop="goodName" label="名称" width="280">
      </el-table-column>
      <el-table-column prop="goodTypeId" label="类型ID" width="120">
      </el-table-column>
      <el-table-column prop="goodTypeName" label="类型名称" width="150">
      </el-table-column>
      <el-table-column prop="goodSpec" label="规格" width="150">
      </el-table-column>
      <el-table-column prop="goodUnit" label="计量单位" width="150">
      </el-table-column>
      <el-table-column prop="goodSupplier" label="供应商(店铺)">
      </el-table-column>
      <el-table-column prop="goodSupplyPrice" label="供应单价" width="130">
      </el-table-column>
      <!-- 自带的搜索功能 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入货物名搜索"
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
    ...mapActions("good", ["queryAllGood"]),
  },
  mounted: function () {
    this.queryAllGood().then((res) => {
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