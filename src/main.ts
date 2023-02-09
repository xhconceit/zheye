import { createApp } from 'vue'
import './style.css'
// import mitt from 'mitt'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = '/api'


axios.interceptors.request.use(config => {
  store.commit('setError', { status: false, message:  ''})
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, err => {
  const { error } = err.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
    return Promise.reject(error)
})

// axios.get('/api/columns').then(res=>{
//   console.log(res);
//   
// })


// const Mit = mitt()
// //TypeScript注册
// // 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
// declare module "vue" {
//   export interface ComponentCustomProperties {
//     $Bus: typeof Mit
//   }
// }



const app = createApp(App)
app.use(router)
app.use(store)
//Vue3挂载全局API
// app.config.globalProperties.$Bus = Mit
app.mount('#app')
