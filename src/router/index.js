import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import ReportCase from '../views/ReportCase'
import BrowseCases from '../views/BrowseCases'
import ViewCases from '../views/ViewCase'
import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: '',
        redirect: 'login',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'signup',
        component: Signup,
      },
    ],
  },
  {
    path: '/report-case',
    component: ReportCase,
  },
  {
    path: '/cases',
    component: BrowseCases,
  },
  {
    path: '/cases/:slug',
    component: ViewCases
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
