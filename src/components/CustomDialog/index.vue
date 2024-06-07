<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    :fullscreen="fullscreen"
    @close="onClose"
  >
    <slot name="body" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    onConfirm: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    issueEvent(value, mouseEvent) {
      if (mouseEvent) {
        return mouseEvent(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
