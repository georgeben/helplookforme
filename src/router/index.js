import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import ReportCase from '../views/ReportCase'
import BrowseCases from '../views/BrowseCases'
import SearchPage from '../views/Search'
import ViewCases from '../views/ViewCase'
import UserProfile from '../views/UserProfile'
import ReportedCases from '../views/ReportedCases'
import EditCase from '../views/EditCase';
import ContactUs from '../views/ContactUs';
import PageNoFound from '../views/PageNoFound';
import Login from '@/components/Auth/Login.vue'
import Signup from '@/components/Auth/SignUp.vue'
import ForgotPassword from '@/components/Auth/ForgotPassword.vue';
import ResetPassword from '@/components/Auth/ResetPassword.vue';
import VerifyEmail from '@/components/Auth/VerifyEmail.vue';
import TwitterCallback from '@/components/Auth/TwitterCallback.vue';
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
        name: 'login',
        component: Login,
      },
      {
        path: 'login/twitter',
        name: 'twitter-callback',
        component: TwitterCallback,
      },
      {
        path: 'signup',
        name: 'signup',
        component: Signup,
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: ResetPassword,
      },
    ],
    meta: {
      guest: true,
    },
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmail,
    meta: {
      unverified: true,
    },
  },
  {
    path: '/report-case',
    name: 'report-case',
    component: ReportCase,
    meta: {
      requiresAuth: true,
      complete: true,
    },
  },
  {
    path: '/cases',
    name: 'cases',
    component: BrowseCases,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
  },
  {
    path: '/cases/:slug',
    name: 'view-case',
    component: ViewCases,
    beforeEnter: (to, from, next) => {
      const slugPattern = /^[a-z]+(?:-([a-z]+|[0-9]{4}|([a-z]+[0-9]{4})))*$/;
      if (slugPattern.test(to.params.slug)) {
        return next();
      }
      return next({name: 'not-found'})
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reported-cases',
    name: 'reported-cases',
    component: ReportedCases,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:caseSlug',
    name: 'edit-case',
    component: EditCase,
    beforeEnter: (to, from, next) => {
      const slugPattern = /^[a-z]+(?:-([a-z]+|[0-9]{4}|([a-z]+[0-9]{4})))*$/;
      if (slugPattern.test(to.params.caseSlug)) {
        return next();
      }
      return next({name: 'not-found'})
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactUs,
  },
  {
    path: '*',
    name: 'not-found',
    component: PageNoFound,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let loggedIn = store.getters['Auth/getLoginStatus'];
  let user = store.getters['Auth/getCurrentUser'];
  // Don't allow logged in users to view pages for only guests e.g signup, login
  if (loggedIn && to.matched.some(record => record.meta.guest)) {
    next({
      path: '/'
    })
  }

  // Don't allow guests (people who have not signed in to view protected routes)
  if (!loggedIn && to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  // Don't allow people who have verified their email, to view the verify email page
  if (user && user.verifiedEmail && to.matched.some(record => record.meta.unverified)) {
    next({
      path: '/',
    });
  }

  // Check that a user's profile is complete before allowing them create a case
  if (loggedIn && to.matched.some(record => record.meta.complete)) {
    if (!user.completedProfile) {
      next({
        path: '/profile'
      });
    }
  }
  next()
});

// eslint-disable-next-line no-unused-vars
router.beforeResolve((to, from, next) => {
  if (to.name) {
    // eslint-disable-next-line no-undef
    NProgress.start();
  }
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // eslint-disable-next-line no-undef
  NProgress.done();
})

export default router
