import Layout from '@/layout'

export default {
  path: '/role',
  component: Layout,
  redirect: '/role',
  children: [{
    path: '/role',
    name: 'approval',
    component: () => import('@/views/role/index'),
    meta: { title: '角色', icon: 'setting' }
  }]
}
