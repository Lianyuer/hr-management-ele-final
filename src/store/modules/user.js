import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // token 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除 token
    state.token = null
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    const token = await login(data)
    // 返回一个token 123456
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

