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

/**
 * 获取用户基本资料
 */
export const getUserInfo = () => {
  return request1({
    method: 'get',
    url: '/sys/profile'
  })
}

/**
 *
 * @param {Object} data
 * @param {String} data.oldPassword 旧密码
 * @param {String} data.newPassword 新密码
 * @returns
 */
export const updatePassword = (data) => {
  return request1({
    method: 'put',
    url: '/sys/user/updatePass',
    data
  })
}
