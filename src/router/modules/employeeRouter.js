import Layout from '@/layout'

export default {
  path: '/employee',
  component: Layout,
  redirect: '/employee',
  children: [{
    path: '/employee',
    name: 'approval',
    component: () => import('@/views/employee/index'),
    meta: { title: '员工', icon: 'people' }
  }]
}
