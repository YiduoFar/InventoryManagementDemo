<template>
  <div>
    <div class="system-title">库存管理信息系统</div>
    <div class="admin-img">
      <el-avatar :size="40" :src="circleUrl"></el-avatar>
    </div>
    <div class="admin-text">
      欢迎您，{{ admin.adminName }}({{ adminTypeCall }})
    </div>
    <div class="esc-text" @click="esc">退出系统</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  computed: {
    ...mapState(["admin"]),
    adminTypeCall: function () {
      if (this.admin.adminType === 1) {
        return "仓库管理员";
      }
      if (this.admin.adminType === 2) {
        return "系统管理员";
      }
    },
  },
  methods:{
    ...mapActions('admin', ['esc'])
  }
};
</script>

<style lang="less">
.system-title {
  position: absolute;
  left: 5%;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.admin-img {
  position: absolute;
  left: 300px;
  top: 8px;
}
.admin-text {
  position: absolute;
  left: 350px;
  font-size: 18px;
  color: #fff;
}
.esc-text {
  position: absolute;
  right: 100px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
.esc-text:hover{
  color: #a6deff;
}
</style>
