<template>
  <div class="container">
    <div class="app-container">
      <MyTree :data="deptList">
        <template #right="{ row }">
          <el-col :span="4" class="right">
            <span class="managerName">
              {{ row.managerName }}
            </span>
            <el-dropdown>
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
                <el-dropdown-item>编辑部门</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </template>
      </MyTree>
    </div>
  </div>
</template>

<script>
import MyTree from '@/components/CustomTree'
import { getDept } from '@/api/department'
import { transListToTree } from '@/utils/transListToTree'
export default {
  name: 'Department',
  components: {
    MyTree
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
      deptList: []
    }
  },
  created() {
    this.getDept()
  },
  methods: {
    async getDept() {
      const res = await getDept()
      this.deptList = transListToTree(res, 0)
      console.log(this.deptList, 'this.deptList')
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
