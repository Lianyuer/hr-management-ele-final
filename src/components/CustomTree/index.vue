<template>
  <el-tree
    :data="data"
    :show-checkbox="showCheckBox"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false"
    :current-node-key="currNodeKey"
    :highlight-current="ishighlightCurrent"
    :style="`width:${width}`"
  >
    <el-row slot-scope="{ data }" style="width: 100%; height: 40px" class="custom-tree-node">
      <el-col>{{ data.name }}</el-col>
      <slot name="right" :row="data" />
    </el-row>
  </el-tree>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: ''
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    currNodeKey: {
      type: Number,
      default: null
    },
    ishighlightCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
