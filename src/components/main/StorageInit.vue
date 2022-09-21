<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      height="780"
      style="font-size: 16px; width: 100%"
      header-row-class-name="table-header"
      highlight-current-row
    >
      <el-table-column prop="storageId" label="仓库号"> </el-table-column>
      <el-table-column prop="storageName" label="仓库名称"> </el-table-column>
      <el-table-column prop="storageGoodType" label="仓库存货类型">
      </el-table-column>
      <el-table-column prop="storageStock" label="当前库存量">
      </el-table-column>
      <el-table-column prop="storageBeginStock" label="期初库存量">
      </el-table-column>
      <el-table-column prop="storageAdminId" label="创建人ID">
      </el-table-column>
    </el-table>
    <el-button
      type="warning"
      class="el-b"
      plain
      @click="dialogFormVisible = true"
      >新建仓库（空库录入）</el-button
    >
    <el-dialog title="空库录入" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="storage">
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input
            v-model="storage.storageName"
            autocomplete="off"
            style="width: 70%"
            placeholder="请输入仓库名称（例：22.1季度生鲜仓）"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物类型" :label-width="formLabelWidth">
          <el-select
            v-model="storage.storageGoodType"
            placeholder="请选择所存储的货物类型"
            clearable
            style="width: 70%"
          >
            <el-option
              v-for="item in goodType"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存量" :label-width="formLabelWidth">
          <el-input-number
            v-model="storage.storageStock"
            :min="0"
            label="描述文字"
            :step="100"
            style="width: 70%"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="期初存量" :label-width="formLabelWidth">
          <el-input-number
            v-model="storage.storageBeginStock"
            :min="0"
            label="描述文字"
            :step="100"
            style="width: 70%"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            cleanDialog();
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            insert();
          "
          >确 定（一键录入并清空该库进单（添加空进单））</el-button
        >
      </div>
    </el-dialog>
        <!-- 刷新 -->
    <el-button type="text" class="el-button-refresh" @click="refresh()"
      >刷新</el-button
    >
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "StorageInit",
  data() {
    return {
      tableData: [],
      goodType: [],
      dialogFormVisible: false,
      storage: {
        storageId: 0,
        storageName: "",
        storageGoodType: "",
        storageStock: 100,
        storageBeginStock: 100,
        storageAdminId: 0,
      },
      formLabelWidth: "120px",
      num1: 100,
      num2: 100,
      loading: true,
    };
  },
  computed: {
    ...mapState(["admin"]),
  },
  methods: {
    ...mapActions("storage", ["queryAllStorage"]),
    ...mapActions("good", ["queryAllGoodType"]),
    ...mapActions("storage", ["insertStorage"]),
    cleanDialog() {
      this.storage.storageName = "";
      this.storage.storageGoodType = "";
      this.storage.storageStock = 100;
      this.storage.storageBeginStock = 100;
    },
    insert() {
      this.insertStorage(this.storage).then((res) => {
        if (res != "") {
          this.$notify({
            title: "success",
            type: "success",
            message: "添加成功",
          });
          this.tableData = res;
        } else {
          this.$notify({
            title: "success",
            type: "warning",
            message: "添加失败",
          });
        }
      });
    },
    refresh(){
      this.queryAllStorage().then((res)=>{
        this.tableData = res === "" ? [] : res
      })
    }
    
  },
  mounted: function () {
    // 获取仓库并赋值
    this.queryAllStorage().then((res) => {
      this.tableData = res === "" ? [] : res;
      this.loading = false;
    });
    // 获取货物类型
    this.queryAllGoodType().then((res) => {
      for (var i in res) {
        this.goodType.push({
          value: res[i].goodTypeId,
          label: res[i].goodTypeName,
        });
      }
    });
  },
};
</script>

<style>
.table-header {
  height: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0;
}
.el-b {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 89.58%;
  height: 160px;
  font-size: 28px;
  border-radius: 0;
  transition: all 0.5s;
}
.el-button-refresh {
  position: absolute;
  top: 10px;
  right: 250px;
  font-size: 18px;
  color: #fff;
}
</style>