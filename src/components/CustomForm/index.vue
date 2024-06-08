<template>
  <el-form ref="pwdRef" :model="formData" :rules="rules">
    <slot name="header" />
    <el-form-item
      v-for="(item, index) in formItem"
      :key="index"
      :label="item.label"
      :label-width="labelWidth"
      :prop="item.prop"
    >
      <template v-if="item.type === 'input'">
        <el-input
          v-model="formData[item.field]"
          :style="`width:${iptWidth}`"
          :show-password="item.isPwd"
        />
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select
          v-model="formData[item.field]"
          @change="
            (e) => {
              issueEvent(e, item.onChange)
            }
          "
        >
          <el-option
            v-for="optItem in item.option"
            :key="optItem.value"
            :label="optItem.label"
            :value="optItem.value"
          />
        </el-select>
      </template>
      <template v-else-if="item.type === 'switch'">
        <el-switch v-model="formData[item.field]" />
      </template>
    </el-form-item>
    <slot name="footer" />
  </el-form>
</template>

<script>
export default {
  props: {
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItem: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {}
    },
    iptWidth: {
      type: String,
      default: '80%'
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // select选择的数据改变时，触发的方法
    issueEvent(value, mouseEvent) {
      if (mouseEvent) {
        return mouseEvent(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
