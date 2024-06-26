/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import ModuleVue from '@/pages/Module.vue'
import ProfileVue from '@/pages/Profile.vue'
import LogcatVue from '@/pages/Logcat.vue'
import ManagerVue from '@/pages/Manager.vue'
import {createRouter, createWebHistory} from 'vue-router'
import LoginVue from "@/pages/Login.vue"
import FirstLoginVue from "@/pages/FirstLogin.vue"
import AccountVue from "@/pages/Account.vue"


const routes = [
  {
    path: '/',
    component: ProfileVue,
  },
  {
    path: '/modules',
    component: ModuleVue,
  },
  {
    path: '/profile',
    component: ProfileVue
  },
  {
    path: '/logcat',
    component: LogcatVue
  },
  {
    path: '/manager',
    component: ManagerVue
  },
  {
    path: '/account',
    component: AccountVue
  },
  {
    path: '/login',
    component: LoginVue
  },
  {
    path: '/first_login',
    component: FirstLoginVue
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
