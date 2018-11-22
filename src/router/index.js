import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import login from '@/views/login.vue'
import User from '@/views/user/index'
import Org from '@/views/org/index'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/user-index',
        component: User,
        meta: ['组织用户管理']
      }, {
        path: '/org-index',
        component: Org,
        meta: ['组织管理']
      }
      ]
    }
  ],
  mode: 'history'
})

// 对每次访问之前都要先看是否已经登录
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-token')
    next()
  } else {
    let token = window.sessionStorage.getItem('access-token')
    if (!token) {
      next({name: 'login'})
    } else {
      next()
    }
  }
})
export default router
