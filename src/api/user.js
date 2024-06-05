import request1 from '@/utils/request'

/**
 * 登录接口
 *
 * @param {Object} data - 登录所需的数据
 * @param {string} data.mobile - 手机号
 * @param {string} data.password - 密码
 * @returns {Promise<any>} - 登录成功或失败的Promise
 */
export const login = (data) => {
  return request1({
    method: 'post',
    url: '/sys/login',
    data
  })
}

