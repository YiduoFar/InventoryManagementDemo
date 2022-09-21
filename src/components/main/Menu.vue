<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
    >
      <!-- 第一栏 系统初始化-->
      <el-menu-item index="1" @click="setMainComp(0)">
        <i class="el-icon-sunrise"></i>
        <span slot="title">仓库面板</span>
      </el-menu-item>

      <!-- 第二栏 进货管理-->
      <el-menu-item index="2" @click="setMainComp(1)">
        <i class="el-icon-menu"></i>
        <span slot="title">进货管理</span>
      </el-menu-item>

      <!-- 第三栏 提货管理-->
      <el-submenu index="3" disabled>
        <template slot="title">
          <span>提货管理</span>
        </template>
      </el-submenu>

      <!-- 第四栏 盘存管理-->
      <el-submenu index="4" disabled>
        <template slot="title">
          <span>盘存管理</span>
        </template>
      </el-submenu>

      <!-- 第五栏 信息查询-->
      <el-menu-item index="5" @click="setMainComp(2)">
        <i class="el-icon-document"></i>
        <span slot="title">信息查询</span>
      </el-menu-item>

      <!-- 第六栏 统计分析-->
      <el-submenu index="6" disabled>
        <template slot="title">
          <span>统计分析</span>
        </template>
      </el-submenu>

      <!-- 第七栏 安全设置-->
      <el-menu-item index="4" @click="setMainComp(3)">
        <i class="el-icon-setting"></i>
        <span>安全设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState(["toCompArr"]),
  },
  methods: {
    ...mapMutations(["setToCompArr"]),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    setMainComp(e) {
      for (var i in this.toCompArr) {
        if (i == e) {
          this.toCompArr[i] = 1;
        } else {
          this.toCompArr[i] = 0;
        }
      }
      this.$store.commit("setToCompArr", this.toCompArr);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>