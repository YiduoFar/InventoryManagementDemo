<template>
    <div class="login-view">
        <img src="../assets/img/login-bg.jpg" alt="" class="login-bg">
        <LoginDiv></LoginDiv>
    </div>
</template>

<script>
import LoginDiv from '../components/login/LoginDiv.vue'

export default {
  components: {
    LoginDiv
  }
}
</script>

<style lang="less">
.login-view{
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  .login-bg{
    width: 100%;
    height: 100%;
    transform: scale(1);
    filter: blur(0px) brightness(100%);
  }
}
</style>
