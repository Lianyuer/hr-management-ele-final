<template>
  <div class="login-container">
    <div class="left" />
    <div class="right">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <h3 class="loginType">手机号登录</h3>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox v-model="loginForm.isAgree" />
          用户平台使用协议
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="login">登录</el-button>
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
      loginForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号格式不正确',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          {
            min: 6,
            max: 16,
            message: '密码长度应该为6-16位之间',
            trigger: 'blur'
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('您必须勾选用户的使用协议'))
            },
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      await this.$refs.loginFormRef.validate()
      // console.log('校验通过')
      await this.$store.dispatch('user/login', this.loginForm)
      this.$message.success('登录成功')
      // Vuex 中的action 返回的promise
      // 跳转主页
      this.$router.push('/')
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
