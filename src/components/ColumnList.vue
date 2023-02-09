<template>
  <div class="row">
    <div class="col-4 mb-3" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img class="rounded-circle border border-light w-25 my-3" :src="column.avatar?.url" :alt="column.title">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text  text-left">{{ column.description }}</p>
          <router-link :to="{
            name: 'column',
            params: {id: column._id}
          }" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import columnImg from '../assets/column.jpg'
import { computed } from 'vue';

import { ColumnProps } from '../store';


const props = defineProps<{ list: ColumnProps[] }>();


const columnList = computed(() => {
  return props.list.map(column => {
    // console.log(import.meta.url)
    if (!column.avatar) {
      column.avatar = {
        url: columnImg
      } 
    }
    console.log(column)
    return column
  })
})


</script>

<style scoped>
.card-body img {}
</style>
