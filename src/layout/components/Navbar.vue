<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="staffPhoto" :src="staffPhoto" class="user-avatar" />
          <span v-else class="username-o">{{ username?.charAt(0) }}</span>
          <p class="user-name">{{ username }}</p>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_self" href="javascript:;">
            <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <MyDialog
      ref="pwdDialogRef"
      :on-confirm="onConfirm"
      :on-close="onClose"
      width="35%"
      title="修改密码"
    >
      <template #body>
        <MyForm ref="pwdFormRef" :form-item="formItem" :form-data="formData" :rules="rules" />
      </template>
    </MyDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

import MyDialog from '@/components/CustomDialog'
import MyForm from '@/components/CustomForm'
import pwdConfig from '@/components/CustomForm/config/pwdConfig'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    MyDialog,
    MyForm
  },
  data() {
    return {
      formItem: pwdConfig.formItem ?? [],
      formData: {},
      rules: {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'username', 'staffPhoto'])
  },
  watch: {
    'formData.newPassword'(newValue, oldValue) {
      console.log(newValue)
      sessionStorage.setItem('newPwd', newValue)
    }
  },
  created() {
    this.formItem.forEach((item) => {
      // 初始化表单数据
      this.$set(this.formData, item.field, item.type === 'switch' ? false : '')
      // 初始化表单校验规则
      this.$set(this.rules, item.prop, item.rule)
    })
    console.log(this.rules, 'rules')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    },
    changePwd() {
      this.$refs.pwdDialogRef.dialogVisible = true
    },
    async onConfirm() {
      await this.$refs.pwdFormRef.$refs.pwdRef.validate() // 表单校验
      await updatePassword(this.formData)
      this.$message({ type: 'success', message: '密码更新成功' })
      this.onClose()
    },
    onClose() {
      this.$refs.pwdDialogRef.dialogVisible = false // 关闭弹框
      this.$refs.pwdFormRef.$refs.pwdRef.resetFields() // 重置表单
      sessionStorage.removeItem('newPwd') // 清除会话保存的新密码
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          margin-right: 18px;
        }
        .user-name {
          margin: 0;
          font-size: 16px;
          margin-right: 45px;
        }
        .username-o {
          background-color: lightcoral;
          border-radius: 20px;
          width: 35px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
