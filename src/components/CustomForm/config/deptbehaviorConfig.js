import { getManagerList } from '@/api/department'

export const getFormItem = async () => {
  const res = await getManagerList()
  const managerList = res
  return (
    [
      {
        type: 'input',
        label: '部门名称',
        prop: 'name',
        field: 'name',
        size: 'mini',
        placeholder: '2-10个字符',
        rule: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'input',
        label: '部门编码',
        prop: 'code',
        field: 'code',
        size: 'mini',
        placeholder: '2-10个字符',
        rule: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'select',
        label: '部门负责人',
        prop: 'managerId',
        field: 'managerId',
        size: 'mini',
        placeholder: '请选择负责人',
        option: managerList,
        rule: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'input',
        iptType: 'textarea',
        rows: 3,
        label: '部门介绍',
        prop: 'introduce',
        field: 'introduce',
        placeholder: '1-100个字符',
        rule: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] }
        ]
      }
    ]
  )
}
