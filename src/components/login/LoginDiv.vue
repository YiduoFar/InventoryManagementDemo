<template>
  <div class="login-div">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>库存管理信息系统</span>
        <el-button style="float: right; padding: 3px 0;" type="text" @click="login"
          >登录</el-button
        >
      </div>
      <div  class="text item">
        <!-- {{ "列表内容 " + o }} -->
        <el-input placeholder="请输入电话号码" v-model="admin.adminPhone" clearable></el-input>
        <div>&nbsp;</div>
        <el-input placeholder="请输入密码"  v-model="admin.adminPassword" show-password ></el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
    data:function(){
      return{

      }
    },
    computed:{
        ...mapState(["admin"]),
    },
    methods:{
        ...mapActions('admin', ["login"]),
    },
    mounted:function(){
    },
};
</script>

<style lang="less">
.login-div {
  position: absolute;
  top: 32%;
  left: 37%;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
}
</style>>

</style>