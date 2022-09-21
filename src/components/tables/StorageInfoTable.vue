<template>
  <div>
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.storageName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%; font-size: 17px"
      v-loading="loading"
      border
      highlight-current-row
      height="900"
    >
      <el-table-column prop="storageId" label="仓库号"> </el-table-column>
      <el-table-column prop="storageAdminId" label="创建人ID">
      </el-table-column>
      <el-table-column prop="storageName" label="仓库名称"> </el-table-column>
      <el-table-column prop="storageGoodType" label="仓库存货类型">
      </el-table-column>
      <el-table-column prop="storageStock" label="当前库存量">
      </el-table-column>
      <el-table-column prop="storageBeginStock" label="期初库存量">
      </el-table-column>

      <!-- 自带的搜索功能 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入仓库名称进行搜索"
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
    ...mapActions("storage", ["queryAllStorage"]),
  },
  mounted: function () {
    // 获取仓库并赋值
    this.queryAllStorage().then((res) => {
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