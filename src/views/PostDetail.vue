
<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto  mb-5 pb-3 " v-if="currentPost">
      <img v-if="currentPost.image"
        :src="typeof currentPost.image === 'string' ? currentPost.image : currentPost.image.url"
        :alt="currentPost.title">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <UserProfile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></UserProfile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentHTML"></div>
      <!--     <div v-if="showEditArea" class="btn-group mt-5"> -->
      <!--       <router-link :to="{name: 'create', query: {id: currentPost._id}}" type="button" class="btn btn-success">编辑</router-link> -->
      <!--       <button type="button" class="btn btn-danger">删除</button> -->
      <!--     </div> -->
    </article>
  </div>
</template>

<script setup lang="ts">
import MarkDownIt from 'markdown-it'
import { computed, onMounted, ref } from 'vue';
import { PostProps, useStore } from '../store';
import { useRoute, useRouter } from 'vue-router';
import UserProfile from '../components/UserProfile.vue';

const route = useRoute()
const store = useStore()
const md = new MarkDownIt()

const currentId = route.params.id

const currentPost = computed<PostProps>(() => store.getters.getPostById(currentId));
const currentHTML  = computed(() => {
  if (!currentPost.value.isHTML) {
    return md.render(currentPost.value.content || '')
  }
  return currentPost.value.content || ''
})


onMounted(() => {
  store.dispatch('fetchPost', currentId).then(data => {



    console.log(currentPost)
  })
})

</script>

<style>
.post-detail-page img {
  max-width: 100%;
}
</style>
