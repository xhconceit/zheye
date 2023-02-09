
<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body" @click.prevent="toPost(post)">
        <h4>{{ post.title }}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-3" v-if="post.image">
            <img :src="typeof post.image === 'string' ? post.image : post.image.url" :alt="post.title"
              class="rounded-lg w-100">
          </div>
          <p :class="{ 'col-9': post.image }">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>
<script setup lang="ts">


import { useRouter } from 'vue-router';
import { PostProps } from '../store';
// import { PostProps } from '../testData';

// import {generateFitUrl} from '../helper'

const router = useRouter()
const props = defineProps<{ list: PostProps[] }>();

const toPost = (post: PostProps) => {
  console.log('h')
  router.push({
    name: 'posts',
    params: {
      id: post._id
    }
  })
}

</script>
