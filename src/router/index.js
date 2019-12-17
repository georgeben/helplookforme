import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import ReportCase from '../views/ReportCase'
import BrowseCases from '../views/BrowseCases'
import ViewCases from '../views/ViewCase'
import UserProfile from '../views/UserProfile'
import ReportedCases from '../views/ReportedCases'
import EditCase from '../views/EditCase';
import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/SignUp.vue'
import ForgotPassword from '@/components/Auth/ForgotPassword.vue'
import store from '../store'

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
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
    ],
    meta: {
      guest: true,
    },
  },
  {
    path: '/report-case',
    component: ReportCase,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/cases',
    component: BrowseCases,
  },
  {
    path: '/cases/:slug',
    component: ViewCases,
  },
  {
    path: '/profile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reported-cases',
    component: ReportedCases,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:caseSlug',
    component: EditCase,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('Matched routes', to.matched)
  let loggedIn = store.getters['Auth/getLoginStatus'];
  console.log({loggedIn})
  if (loggedIn && to.matched.some(record => record.meta.guest)) {
    next({
      path: '/'
    })
  }
  if (!loggedIn && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router
