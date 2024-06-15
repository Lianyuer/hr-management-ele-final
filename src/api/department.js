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
