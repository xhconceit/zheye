<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue';
import { useStore } from '../store'
import { computed, onMounted } from 'vue';
const store = useStore()
const route = useRoute()
const currentId = route.params.id

onMounted(() => {
  store.dispatch('fetchColumn', currentId)
  store.dispatch('fetchPosts', currentId)
})


const column = computed(() => store.getters.getColumnById(currentId))
const list = computed(() => store.getters.getPostsById(currentId))
</script>
