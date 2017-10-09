export default [
  {
    name: 'demo',
    path: '/demo',
    component: require('../routes/demo.vue'),
    meta: { login: true }
  },
  {
    name: 'login',
    path: '/login',
    component: require('../routes/login.vue')
  },
  {
    name: 'index',
    path: '*',
    component: require('../routes/index.vue'),
    meta: { login: true }
  }
]
