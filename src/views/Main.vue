 <template>
  <div class="main-view">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 切换组件 -->
            <div :is="myComp"></div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/main/Menu.vue";
import Header from "../components/main/Header.vue";
import StorageInit from "../components/main/StorageInit.vue";
import PurchaseTable from "../components/main/PurchaseTable.vue";
import QueryInfo from "../components/main/QueryInfo.vue";
import AdminManage from "../components/main/AdminManage.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {
    Menu,
    Header,
    StorageInit,
    PurchaseTable,
    QueryInfo,
    AdminManage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["toCompArr"]),
    myComp() {
      var compNum;
      for (var i in this.toCompArr) {
        if (this.toCompArr[i] === 1) {
          compNum = i;
        }
      }
      switch (compNum) {
        case "0": {
          console.log("StorageInit");
          return "StorageInit";
          break;
        }
        case "1": {
          console.log("PurchaseTable");
          return "PurchaseTable";
          break;
        }
        case "2": {
          console.log("QueryInfo");
          return "QueryInfo";
          break;
        }
        case "3": {
          console.log("AdminManage");
          return "AdminManage";
          break;
        }
        default: {
          return "StorageInit";
        }
      }
    },
  },
  methods: {},
  watch: {
    toCompArr: function (val) {},
  },
  mounted: function () {},
};
</script>

<style lang="less">
.main-view {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
}
.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 950px;
  overflow: hidden;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  padding: 10px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>