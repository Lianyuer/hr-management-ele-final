import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
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
