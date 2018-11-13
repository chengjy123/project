import Vue from 'vue'
import Router from 'vue-router'
import Manager from '@/views/manager.vue'
import login from '@/views/login.vue'
import User from '@/views/user/index'
import Org from '@/views/org/form'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager,
      children: [{
        path: '/user',
        component: User,
        meta:['组织用户管理']
      }, {
        path: '/form',
        component: Org,
        meta:['组织管理']
      }
      ]
    }
  ],
  mode: "history"
})

//对每次访问之前都要先看是否已经登录
router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/login')){
    window.sessionStorage.removeItem('access-token');
    next();
  }else{
    let token = window.sessionStorage.getItem('access-token');
    if(!token){
      next({path:'/login'});
    }else{
      next();
    }
  }
});
export default router
