import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { Message } from 'element-ui'

router.beforeEach(async(to, from, next) => {
  nProgress.start()
  // 白名单
  const whiteList = ['/login', '/404']
  const token = store.getters.token
  if (token) { // 有token
    if (to.path === '/login') {
      next('/')
      // next（地址）并没有执行后置守卫
      nProgress.done()
    } else {
      // 有token，但不是登录页，需要获取用户基本信息
      if (!store.getters.userId) { // 没有用户id才获取基本信息，避免重复获取
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else { // 无token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      Message({ message: '请先登录', type: 'error' })
      next('/login')
      // next（地址）并没有执行后置守卫
      nProgress.done()
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
