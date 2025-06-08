import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../views/UserLogin.vue';
import AdminLogin from '../views/AdminLogin.vue';
import Register from '../views/Register.vue';
import UserIndex from '../views/UserIndex.vue';
import AdminIndex from '../views/AdminIndex.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/user/login'
    },
    {
      path: '/user/login',
      component: UserLogin
    },
    {
      path: '/user/register',
      component: Register
    },
    {
      path: '/user/index',
      component: UserIndex
    },
    {
      path: '/admin/login',
      component: AdminLogin
    },
    {
      path: '/admin/index',
      component: AdminIndex
    }
  ],
})

export default router
