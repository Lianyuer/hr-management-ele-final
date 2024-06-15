import request1 from '@/utils/request'

/**
 * 获取组织架构
 * @returns
 */
export const getDept = () => {
  return request1({
    url: '/company/department'
  })
}
/**
 * 获取-部门负责人列表
 * @returns
 */
export const getManagerList = () => {
  return request1({
    url: '/sys/user/simple'
  })
}

/**
 * 新增-部门
 */
export const addDept = (data) => {
  return request1({
    method: 'post',
    url: '/company/department',
    data
  })
}
