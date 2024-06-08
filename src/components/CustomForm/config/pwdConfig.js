export default {
  formItem: [
    {
      type: 'input',
      label: '原密码',
      prop: 'oldPassword',
      field: 'oldPassword',
      isPwd: true,
      rule: [
        { required: true, message: '原密码不能为空', trigger: ['blur', 'change'] }
      ]
    },
    {
      type: 'input',
      label: '新密码',
      prop: 'newPassword',
      field: 'newPassword',
      isPwd: true,
      rule: [
        { required: true, message: '新密码不能为空', trigger: ['blur', 'change'] }
      ]
    },
    {
      type: 'input',
      label: '重复密码',
      prop: 'repnewPassword',
      field: 'repnewPassword',
      isPwd: true,
      rule: [
        { required: true, message: '重复密码不能为空', trigger: ['blur', 'change'] },
        { validator: (rule, value, callback) => {
          if (value !== sessionStorage.getItem('newPwd')) {
            callback(new Error('两次输入密码不一致'))
          } else {
            callback()
          }
        } }
      ]
    }
  ]
}
