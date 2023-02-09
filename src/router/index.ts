import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import Signup from '../views/Signup.vue'
import PostDetail from '../views/PostDetail.vue'
import store from '../store'
import axios from 'axios'


let routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      redirectAlreadyLogin: true
    }
  }, {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail

  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/posts/:id',
    name: 'posts',
    component: PostDetail
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {

        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.log(e)
          store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   next({ name: 'login' })
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   next('/')
  // }
  // next()
})

export default router
