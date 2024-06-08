import Layout from '@/layout'

export default {
  path: '/approval',
  component: Layout,
  redirect: '/approval',
  children: [{
    path: '/approval',
    name: 'approval',
    component: () => import('@/views/approval/index'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}
