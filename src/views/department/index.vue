<template>
  <div class="container">
    <div class="app-container">
      <MyTree :data="deptList">
        <template #right="{ row }">
          <el-col :span="4" class="right">
            <span class="managerName">
              {{ row.managerName }}
            </span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </template>
      </MyTree>
      <MyDialog ref="dialogRef" :title="behavior.title" :on-close="onClose" :on-confirm="onConfirm">
        <template #body>
          <MyForm
            ref="deptformRef"
            :form-item="behavior.formItem"
            :form-data="behavior.formData"
            :rules="behavior.rules"
            label-width="150px"
          />
        </template>
      </MyDialog>
    </div>
  </div>
</template>

<script>
import MyTree from '@/components/CustomTree'
import MyDialog from '@/components/CustomDialog'
import MyForm from '@/components/CustomForm'
import { getFormItem } from '@/components/CustomForm/config/deptbehaviorConfig'
import { getDept } from '@/api/department'
import { transListToTree } from '@/utils/transListToTree'
export default {
  name: 'Department',
  components: {
    MyTree,
    MyDialog,
    MyForm
  },
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        }
      ],
      deptList: [],
      behavior: {
        type: 'add',
        title: '新增子部门',
        formItem: [],
        formData: {},
        rules: {}
      }
    }
  },
  async created() {
    this.getDept()
    this.behavior.formItem = await getFormItem()
    // 初始化表单数据和校验规则
    this.behavior.formItem.forEach((item) => {
      this.$set(this.behavior.formData, item.field, '')
      this.$set(this.behavior.rules, item.prop, item.rule)
    })
  },
  methods: {
    // 获取组织架构
    async getDept() {
      const res = await getDept()
      this.deptList = transListToTree(res, 0)
      console.log(this.deptList, 'this.deptList')
    },
    // 显示弹框
    handleCommand(command) {
      this.$refs.dialogRef.dialogVisible = true
      if (command === 'add') {
        this.behavior.title = '添加子部门'
      } else if (command === 'edit') {
        this.behavior.title = '编辑部门'
      } else {
        this.onClose()
        console.log('删除')
      }
    },
    // 关闭弹框
    onClose() {
      this.$refs.dialogRef.dialogVisible = false
      this.$refs.deptformRef.$refs.formRef.resetFields()
    },
    // 确认提交
    async onConfirm() {
      await this.$refs.deptformRef.$refs.formRef.validate()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .app-container {
    height: 90vh;
    overflow: hidden;
    .el-tree {
      margin: 80px 160px 0 160px;
      .right {
        font-size: 14px;
        display: flex;
        width: 220px;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
