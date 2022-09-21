<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData1"
      height="400"
      style="font-size: 16px; width: 100%"
      header-row-class-name="table-header"
      highlight-current-row
      border
    >
      <el-table-column prop="purchaseId" label="进单ID"> </el-table-column>
      <el-table-column prop="purchaseDate" label="进货日期"> </el-table-column>
      <el-table-column prop="purchaseGoodId" label="货物ID（组）">
      </el-table-column>
      <el-table-column prop="purchaseGoodPrice" label="进货单价（组）">
      </el-table-column>
      <el-table-column prop="purchaseGoodNum" label="货物数量（组）">
      </el-table-column>
      <el-table-column prop="purchaseStorageId" label="仓库号">
      </el-table-column>
      <el-table-column
        prop="purchaseEnterDate"
        label="入库日期"
        :sortable="isSort"
        :sort-method="sortByEmptyDate"
      >
      </el-table-column>
      <el-table-column prop="purchaseAdminId" label="创建人ID">
      </el-table-column>
    </el-table>

    <!-- 新增进货单打开按钮 -->
    <el-button
      type="primary"
      class="el-button0"
      plain
      @click="dialogFormVisible0 = true"
      >添加空的进货单</el-button
    >

    <!-- 新增进货单表单 -->
    <el-dialog
      title="新增进货单"
      :visible.sync="dialogFormVisible0"
      width="40%"
    >
      <el-form :model="storageIdSelected">
        <el-form-item label="仓库号" :label-width="formLabelWidth">
          <el-select
            v-model="storageIdSelected"
            placeholder="请选择一个仓库"
            clearable
            style="width: 70%"
          >
            <el-option
              v-for="item in storageInfos"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible0 = false;
            cleanDialog0();
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible0 = false;
            insertPurchase();
            cleanDialog0();
          "
          >添加</el-button
        >
      </div>
    </el-dialog>

    <!-- 进单输入打开按钮 -->
    <el-button
      type="success"
      class="el-button1"
      plain
      @click="dialogFormVisible = true"
      >进货单编写（进单输入）</el-button
    >
    <!-- 进单输入表单 -->
    <el-dialog title="进货单填写" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="purchaseTable">
        <el-form-item label="单号" :label-width="formLabelWidth">
          <el-select
            v-model="purchaseTable.purchaseId"
            placeholder="请选择一张空的进货单"
            clearable
            style="width: 70%"
          >
            <el-option
              v-for="item in emptyPurchaseIds"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select
            v-model="value2"
            :placeholder="typePlaceholder"
            style="width: 70%"
            disabled
          >
          </el-select>
        </el-form-item>

        <el-form-item label="货物" :label-width="formLabelWidth">
          <el-table
            :data="tableData3"
            v-loading="loading3"
            header-row-class-name="table-header"
            height="330"
            highlight-current-row
            @selection-change="handleSelectionChange"
            :select-on-indeterminate="true"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="goodId" label="货物ID" width="80">
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="200">
            </el-table-column>
            <el-table-column prop="goodTypeName" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="goodUnit" label="计量单位" width="100">
            </el-table-column>
            <el-table-column
              prop="goodSupplier"
              label="供应商(店铺)"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="goodSupplyPrice"
              label="供应单价"
              width="100"
            >
            </el-table-column>
            <el-table-column label="数量选择">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
                  @change="handleChange"
                  :min="1"
                  :step="100"
                  label="描述文字"
                  size="mini"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
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
            updatePurchaseTable();
            cleanDialog();
          "
          >确 定（一键进货）</el-button
        >
      </div>
    </el-dialog>

    <!-- 进单号选择器 -->
    <el-select
      v-model="purchaseIdSelected"
      style="width: 320px"
      clearable
      placeholder="选择一个进货单，以展示其货物数据"
      class="el-select1"
    >
      <el-option
        v-for="item in purchaseIdGroup"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <!-- 单货不符打开按钮 -->
    <el-button
      type="warning"
      class="el-button2"
      plain
      @click="dialogFormVisible2 = true"
      >货物不符处理（验货）</el-button
    >
    <!-- 单货不符处理表单 -->
    <el-dialog
      title="货物不符处理"
      :visible.sync="dialogFormVisible2"
      width="60%"
    >
      <el-form :model="purchaseTable2">
        <el-form-item label="进货单号" :label-width="formLabelWidth">
          <el-select
            v-model="purchaseTable2.purchaseId"
            placeholder="请选择一张待入库的进货单"
            clearable
            style="width: 70%"
          >
            <el-option
              v-for="item in emptyPurchaseIds2"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="货物类型" :label-width="formLabelWidth">
          <el-select
            v-model="value2"
            :placeholder="typePlaceholder2"
            style="width: 70%"
            disabled
          >
          </el-select>
        </el-form-item>

        <el-form-item label="货物退出" :label-width="formLabelWidth">
          <el-table
            :data="tableData4"
            header-row-class-name="table-header"
            height="330"
            highlight-current-row
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="goodId" label="货物ID" width="80">
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="200">
            </el-table-column>
            <el-table-column prop="goodTypeName" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="goodUnit" label="计量单位" width="100">
            </el-table-column>
            <el-table-column
              prop="goodSupplier"
              label="供应商(店铺)"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="goodSupplyPrice"
              label="供应单价"
              width="100"
            >
            </el-table-column>
            <el-table-column label="数量选择">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
                  @change="handleChange"
                  :min="1"
                  :step="100"
                  label="描述文字"
                  size="mini"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible2 = false;
            cleanDialog2();
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible2 = false;
            updatePurchaseTable2();
            cleanDialog2();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-button
      type="primary"
      class="el-button3"
      @click="dialogFormVisible3 = true"
      >一键入库<i class="el-icon-upload el-icon--right"></i
    ></el-button>

    <el-dialog title="货品入库" :visible.sync="dialogFormVisible3" width="40%">
      <el-form :model="purchaseIdSelected2">
        <el-form-item label="单号" :label-width="formLabelWidth">
          <el-select
            v-model="purchaseIdSelected2"
            placeholder="请选择一个待入库的进货单"
            clearable
            style="width: 70%"
          >
            <el-option
              v-for="item in emptyPurchaseIds2"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible3 = false;
            cleanDialog3();
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible3 = false;
            enterStorage(purchaseIdSelected2);
            cleanDialog3();
          "
          >一键入库</el-button
        >
      </div>
    </el-dialog>

    <!-- 货物表格 -->
    <el-table
      :data="tableData2"
      v-loading="loading2"
      height="477"
      style="font-size: 16px; width: 72%"
      header-row-class-name="table-header"
      highlight-current-row
      class="table2"
    >
      <el-table-column prop="goodId" label="货物ID"> </el-table-column>
      <el-table-column prop="goodName" label="名称"> </el-table-column>
      <el-table-column prop="goodTypeId" label="类型ID"> </el-table-column>
      <el-table-column prop="goodTypeName" label="类型名称"> </el-table-column>
      <el-table-column prop="goodSpec" label="规格"> </el-table-column>
      <el-table-column prop="goodUnit" label="计量单位"> </el-table-column>
      <el-table-column prop="goodSupplier" label="供应商(店铺)">
      </el-table-column>
      <el-table-column prop="goodSupplyPrice" label="供应单价">
      </el-table-column>
    </el-table>

    <!-- 刷新 -->
    <el-button type="text" class="el-button-refresh" @click="refresh()"
      >刷新</el-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PurchaseTable",
  data() {
    return {
      tableData1: [], // 全部进单
      tableData2: [], // 根据单号得出的货物
      tableData3: [], // 根据类型得出的货物
      tableData4: [], // 根据单号得出的货物
      goodType: [],
      emptyPurchaseIds: [], // 进货时间为空的进货单id
      emptyPurchaseIds2: [], // 入库时间为空的进货单id
      storageInfos: [], // 仓库id
      loading: true,
      loading2: true,
      loading3: true,
      loading4: true,
      purchaseIdSelected: "", // 进货单id选择，以展示其货物信息
      purchaseIdSelected2: "",
      storageIdSelected: "", // 仓库id选择，为其新增进货单
      purchaseIdGroup: [],
      dialogFormVisible0: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      storage: {
        storageId: 0,
        storageName: "",
        storageGoodType: "",
        storageStock: 100,
        storageBeginStock: 100,
        storageAdminId: 0,
      },
      purchaseTable: {
        purchaseId: "",
        purchaseDate: "NOW",
        purchaseGoodId: [],
        purchaseGoodPrice: [],
        purchaseGoodNum: [],
        purchaseStorageId: 0,
        purchaseEnterDate: "",
        purchaseAdminId: 0,
      },
      purchaseTable2: {
        purchaseId: "",
        purchaseDate: "NOW",
        purchaseGoodId: [],
        purchaseGoodPrice: [],
        purchaseGoodNum: [],
        purchaseStorageId: 0,
        purchaseEnterDate: "",
        purchaseAdminId: 0,
      },
      typePlaceholder: "请选择一个单号以显示其存货类型",
      typePlaceholder2: "请选择一个单号以显示其存货类型",
      formLabelWidth: "120px",
      value1: "",
      value2: "",
      multipleSelection: [],
      multipleSelection2: [],
      isSort: true,
    };
  },
  methods: {
    ...mapActions("purchase", ["queryAllPurchaseTable"]),
    ...mapActions("purchase", ["queryAllPurchaseId"]),
    ...mapActions("purchase", ["queryGoodByPurchaseTableId"]),
    ...mapActions("purchase", ["queryAllEmptyPurchaseIds"]),
    ...mapActions("purchase", ["queryAllEmptyPurchaseIds2"]),
    ...mapActions("purchase", ["updatePurchaseTableById"]),
    ...mapActions("purchase", ["updatePurchaseTableById2"]),
    ...mapActions("purchase", ["insertPurchaseByStorageId"]),
    ...mapActions("good", ["queryAllGood"]), // --bug
    ...mapActions("good", ["queryAllGoodType"]),
    ...mapActions("good", ["queryGoodTypeByPurchaseId"]),
    ...mapActions("good", ["queryGoodByGoodTypeBById"]),
    ...mapActions("storage", ["queryAllStorage"]),
    ...mapActions("storage", ["enterStorage"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    handleChange(value) {
      console.log(value);
    },
    cleanDialog0() {
      this.storageIdSelected = "";
    },
    cleanDialog() {
      this.purchaseTable.purchaseId = "";
    },
    cleanDialog2() {
      this.purchaseTable2.purchaseId = "";
    },
    cleanDialog3() {
      this.purchaseIdSelected2 = "";
      this.refresh();
    },

    /**
     * 新增进货单
     */
    insertPurchase() {
      this.insertPurchaseByStorageId(this.storageIdSelected).then((res) => {
        if (res === true) {
          this.refresh();
        }
      });
    },

    /**
     * 进货，往进货单加货物
     */
    updatePurchaseTable() {
      var prTable = JSON.parse(JSON.stringify(this.purchaseTable));
      for (var i in this.multipleSelection) {
        // ID
        prTable.purchaseGoodId.push(this.multipleSelection[i].goodId);
        // 单价
        prTable.purchaseGoodPrice.push(
          this.multipleSelection[i].goodSupplyPrice
        );
        // 数量
        prTable.purchaseGoodNum.push(this.multipleSelection[i].num);
      }
      prTable.purchaseGoodId = prTable.purchaseGoodId.toString();
      prTable.purchaseGoodPrice = prTable.purchaseGoodPrice.toString();
      prTable.purchaseGoodNum = prTable.purchaseGoodNum.toString();
      this.updatePurchaseTableById(prTable);

      this.refresh();
    },

    /**
     * 进货退出，往进货单删货物
     */
    updatePurchaseTable2() {
      var prTable = JSON.parse(JSON.stringify(this.purchaseTable2));
      for (var i in this.multipleSelection2) {
        // ID
        prTable.purchaseGoodId.push(this.multipleSelection2[i].goodId);
        // 单价
        prTable.purchaseGoodPrice.push(
          this.multipleSelection2[i].goodSupplyPrice
        );
        // 数量
        prTable.purchaseGoodNum.push(this.multipleSelection2[i].num);
      }
      prTable.purchaseGoodId = prTable.purchaseGoodId.toString();
      prTable.purchaseGoodPrice = prTable.purchaseGoodPrice.toString();
      prTable.purchaseGoodNum = prTable.purchaseGoodNum.toString();
      this.updatePurchaseTableById2(prTable);

      this.refresh();
    },

    // 表格排序，无法生效，待研究
    sortByEmptyDate(obj1, obj2) {
      // if (obj1.purchaseEnterDate === '' || obj2.purchaseEnterDate === '') {
      //   return -1
      // }
      let val1 = new Date(obj1.purchaseEnterDate).getTime();
      let val2 = new Date(obj2.purchaseEnterDate).getTime();
      console.log(1);
      if (val1 > val2) {
        return -1;
      } else {
        return 1;
      }
    },

    /**
     * 进货管理页面刷新
     */
    refresh() {
      // 获取进货单 this.queryAllPurchaseTable()返回的是promise对象，需用then获取值
      this.queryAllPurchaseTable().then((res) => {
        this.tableData1 = res === "" ? [] : res;
        this.loading = false;
      });

      // 获取所有货物（假定无限供应）
      this.queryAllGood().then((res) => {
        this.tableData3 = res === "" ? [] : res;
        this.loading3 = false;
      });

      // 获取选取的进货单对应的货物
      this.queryAllGood().then((res) => {
        this.tableData2 = res === "" ? [] : res;
        this.loading2 = false;
      });

      // 获取空的进货单ID 进货时间为空
      this.queryAllEmptyPurchaseIds().then((res) => {
        var o = [];
        for (var i in res) {
          o.push({
            value: res[i],
          });
        }
        this.emptyPurchaseIds = JSON.parse(JSON.stringify(o));
      });

      // 获取空的进货单ID 入库时间为空
      this.queryAllEmptyPurchaseIds2().then((res) => {
        var o = [];
        for (var i in res) {
          o.push({
            value: res[i],
          });
        }
        this.emptyPurchaseIds2 = JSON.parse(JSON.stringify(o));
      });

      // 获取进货单id组
      this.queryAllPurchaseId().then((res) => {
        var o = [];
        for (var i in res) {
          o.push({ value: res[i] });
        }
        this.purchaseIdGroup = JSON.parse(JSON.stringify(o));
      });

      // 获取货物类型
      this.queryAllGoodType().then((res) => {
        var o = [];
        for (var i in res) {
          o.push({
            value: res[i].goodTypeId,
            label: res[i].goodTypeName,
          });
        }
        this.goodType = JSON.parse(JSON.stringify(o));
      });

      // 获取所有仓库
      this.queryAllStorage().then((res) => {
        var o = [];
        for (var i in res) {
          o.push({
            value: res[i].storageId,
            label: res[i].storageGoodType,
          });
        }
        this.storageInfos = JSON.parse(JSON.stringify(o));
      });
    },
  },
  watch: {
    /**
     * 监听选择的进货单 展示其货物信息
     * @param {*} purchaseId
     */
    purchaseIdSelected: function (val) {
      if (val == "") {
        this.queryAllGood().then((res) => {
          this.tableData2 = res === "" ? [] : res;
          this.loading2 = false;
        });
        return;
      }
      // 获取选取的进货单对应的货物
      this.queryGoodByPurchaseTableId(val).then((res) => {
        this.tableData2 = res === "" ? [] : res;
        this.loading2 = false;
      });
    },

    /**
     * 监听选择的空的进货单 展示其货物信息
     * @param {*} purchaseId
     */
    "purchaseTable.purchaseId": function (purchaseId) {
      if (purchaseId === "") {
        this.typePlaceholder = "请选择一个单号以显示其存货类型";
        this.queryAllGood().then((res) => {
          this.tableData3 = res === "" ? [] : res;
        });
        return;
      }
      // 查询其存货类型
      this.queryGoodTypeByPurchaseId(purchaseId).then((res) => {
        this.typePlaceholder =
          res === "" ? "请选择一个单号以显示其存货类型" : res;
      });
      // 根据类型查询该类型下的所有货物
      this.queryGoodByGoodTypeBById(purchaseId).then((res) => {
        this.tableData3 = res === "" ? [] : res;
      });
    },

    /**
     * 监听选择的未入库的进货单 展示其货物信息
     * @param {*} val
     */
    "purchaseTable2.purchaseId": function (val) {
      if (val === "") {
        this.queryAllGood().then((res) => {
          this.typePlaceholder2 = "请选择一个单号以显示其存货类型";
          this.tableData4 = res === "" ? [] : res;
          this.loading4 = false;
        });
        return;
      }
      // 查询其存货类型
      this.queryGoodTypeByPurchaseId(val).then((res) => {
        this.typePlaceholder2 =
          res === "" ? "请选择一个单号以显示其存货类型" : res;
      });
      // 获取选取的进货单对应的货物
      this.queryGoodByPurchaseTableId(val).then((res) => {
        this.tableData4 = res === "" ? [] : res;
        this.loading4 = false;
      });
    },
  },
  mounted: function () {
    this.refresh();
  },
};
</script>

<style>
.table2 {
  position: absolute;
  right: 0;
  bottom: 58px;
}
.el-button0 {
  position: absolute;
  bottom: 490px;
  left: 210px;
  width: 320px;
  transition: all 0.5s;
}
.el-button1 {
  position: absolute;
  bottom: 444px;
  left: 210px;
  width: 320px;
  transition: all 0.5s;
}
.el-button2 {
  position: absolute;
  bottom: 345px;
  left: 210px;
  width: 320px;
  transition: all 0.5s;
}
.el-button3 {
  position: absolute;
  bottom: 275px;
  left: 210px;
  height: 60px;
  width: 320px;
  transition: all 0.5s;
}
.el-button-refresh {
  position: absolute;
  top: 10px;
  right: 250px;
  font-size: 18px;
  color: #fff;
}
.el-select1 {
  position: absolute;
  bottom: 395px;
  left: 210px;
}
</style>