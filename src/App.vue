<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'


import createMessage from './components/createMessage'
// import Message from './components/Message.vue'
import Loader from './components/Loader.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from './store';
import { computed, onMounted, watch } from 'vue';



const store = useStore()
const currentUser = computed(() => store.state.user)

const isLoading = computed(() => store.state.loading)


// onMounted(() => {
//   if (!currentUser.value.isLogin && token.value) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
//     store.dispatch('fetchCurrentUser')
//   }
// })

const error = computed(() => store.state.error)

watch(() => error.value.status, () => {
  const { status, message } = error.value
  if (status && message) {
    createMessage(message, 'error')
  }
})


</script>

<template>

  <GlobalHeader :user="currentUser"></GlobalHeader>
  <!-- v-if="isLoading" -->
  <Loader v-if="isLoading" text="加载中..." background="rgba(0,0,0,.8)"></Loader>
  <div class="container">
    <router-view></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-auto">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">©2023 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<style scoped>

</style>
