import Layout from '@/layout'

export default {
  path: '/salary',
  component: Layout,
  redirect: '/salary',
  children: [{
    path: '/salary',
    name: 'approval',
    component: () => import('@/views/salary/index'),
    meta: { title: '薪资', icon: 'money' }
  }]
}
