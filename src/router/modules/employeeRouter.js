import Layout from '@/layout'

export default {
  path: '/employee',
  component: Layout,
  redirect: '/employee',
  children: [{
    path: '/employee',
    name: 'employee',
    component: () => import('@/views/employee/index'),
    meta: { title: '员工', icon: 'people' }
  }]
}
