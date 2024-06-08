import Layout from '@/layout'

export default {
  path: '/department',
  component: Layout,
  redirect: '/department',
  children: [{
    path: '/department',
    name: 'approval',
    component: () => import('@/views/department/index'),
    meta: { title: '组织', icon: 'tree' }
  }]
}
