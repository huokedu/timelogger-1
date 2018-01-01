import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import LoggedIn from '@/components/LoggedIn'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      
    },
    {
      path: '/logged',
      name: 'LoggedIn',
      component:LoggedIn,
      props: true 
    },
    {
      path: '/admin',
      name: 'adminLoggedIn',
      component:Admin,
      props: true 
    }
  ]
})
