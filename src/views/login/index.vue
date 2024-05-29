<template>
  <div class="login-container">
    <div class="left" />
    <div class="right">
      <el-form>
        <h3 class="loginType">手机号登录</h3>
        <el-form-item>
          <el-input v-model="loginformData.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginformData.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginformData.isAgree" />
          用户平台使用协议
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginformData: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .left {
    width: 1130px;
    background: url('../../assets/common/login_back.png') no-repeat center / cover;
    border-radius: 0 40px 0 0;
  }
  .right {
    width: 40%;
    min-width: 566px;
    .el-form {
      margin: 300px auto;
      width: 350px;
      .loginType {
        margin-bottom: 30px;
      }
      .loginBtn {
        width: 100%;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
