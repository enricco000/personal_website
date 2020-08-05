import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue')
  },
  {
    path: '/math',
    name: 'Math',
    component: () => import('../views/Math.vue')
  },
  {
    path: '/ds',
    name: 'DataScience',
    component: () => import('../views/DataScience.vue')
  },
  {
    path: '/dev',
    name: 'Dev',
    component: () => import('../views/Dev.vue')
  },
  {
    path: '/bio',
    name: 'Bio',
    component: () => import('../views/Bio.vue')
  },
  {
    path: '/createcontent',
    name: 'CreateContent',
    component: () => import('../views/CreateContent.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
