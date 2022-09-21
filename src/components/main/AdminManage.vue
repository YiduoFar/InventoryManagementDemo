<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 70%"
      v-loading="loading"
      height="600"
    >
      <el-table-column fixed prop="adminId" label="管理员工号" width="150">
      </el-table-column>
      <el-table-column prop="adminName" label="管理员名称" width="150">
      </el-table-column>
      <el-table-column prop="adminPhone" label="电话号码" width="150">
      </el-table-column>
      <el-table-column prop="adminPassword" label="登录口令" width="150">
      </el-table-column>
      <el-table-column label="管理员类型" width="300">
        <template slot-scope="scope">
          {{ `${scope.row.adminType === 1 ? "仓库管理员" : "系统管理员"}` }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick1(scope.row)" type="text" size="big"
            >修改口令</el-button
          >
          <el-button type="text" size="big" @click="handleClick2(scope.row)"
            >权限更改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="'管理员 `' + adminInfos.adminName + '` 口令修改'"
      :visible.sync="dialogFormVisible1"
    >
      <el-form :model="adminInfos">
        <el-form-item label="口令" :label-width="formLabelWidth">
          <el-input
            v-model="adminPasswordObj"
            autocomplete="off"
            style="width: 60%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible1 = false;
            updateAdminPassword();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :title="'管理员 `' + adminInfos.adminName + '` 权限修改'"
      :visible.sync="dialogFormVisible2"
    >
      <el-form :model="adminInfos">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select
            v-model="adminTypeObj"
            placeholder="请选择管理员类型"
            style="width: 60%"
          >
            <el-option label="1" value="1">
              <span style="float: left">1</span>
              <span style="float: right; color: #8492a6; font-size: 13px"
                >仓库管理员</span
              >
            </el-option>
            <el-option label="2" value="2">
              <span style="float: left">2</span>
              <span style="float: right; color: #8492a6; font-size: 13px"
                >系统管理员</span
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible2 = false;
            updateAdminType();
          "
          >确 定?</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      adminInfos: "",
      adminPasswordObj: "",
      adminTypeObj: "",
      timer: "",
    };
  },
  methods: {
    ...mapState(["admin"]),
    ...mapActions("admin", ["queryAllAdmin"]),
    ...mapActions("admin", ["queryAllAdmin"]),
    ...mapActions("admin", ["updateAdminPasswordById"]),
    ...mapActions("admin", ["updateAdminTypeById"]),
    handleClick1(row) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (JSON.parse(sessionStorage.getItem("admin")).adminType === 1) {
          this.$notify({
            title: "警告",
            type: "warning",
            message: "您无权操作",
          });
          return;
        }
        this.dialogFormVisible1 = true;
        this.adminInfos = JSON.parse(JSON.stringify(row));
        this.adminPasswordObj = this.adminInfos.adminPassword;
      }, 400);
    },
    handleClick2(row) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (JSON.parse(sessionStorage.getItem("admin")).adminType === 1) {
          this.$notify({
            title: "警告",
            type: "warning",
            message: "您无权操作",
          });
          return;
        }
        if (
          row.adminId === JSON.parse(sessionStorage.getItem("admin")).adminId
        ) {
          this.$notify({
            title: "failed",
            type: "warning",
            message: "不能修改自己的权限",
          });
          return;
        }
        this.dialogFormVisible2 = true;
        this.adminInfos = JSON.parse(JSON.stringify(row));
        this.adminTypeObj = this.adminInfos.adminType;
      }, 400);
    },
    updateAdminPassword() {
      var o = JSON.parse(JSON.stringify(this.adminInfos));
      o.adminPassword = this.adminPasswordObj;
      // promise的then函数获取数据在res，不需要res.data
      this.updateAdminPasswordById(o).then((res) => {
        if (res === true) {
          this.queryAllAdmin().then((res) => {
            this.tableData = res === "" ? [] : res;
          });
        }
      });
    },
    updateAdminType() {
      console.log("r");
      var o = JSON.parse(JSON.stringify(this.adminInfos));
      o.adminType = this.adminTypeObj;
      this.updateAdminTypeById(o).then((res) => {
        console.log("res", res);
        if (res === true) {
          this.queryAllAdmin().then((res) => {
            this.tableData = res === "" ? [] : res;
          });
        }
      });
    },
  },
  mounted: function () {
    this.queryAllAdmin().then((res) => {
      this.tableData = res === "" ? [] : res;
      console.log("adminList", this.tableData);
      this.loading = false;
    });
  },
};
</script>