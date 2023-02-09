
<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img class="w-50" src="../assets/callout.svg" alt="callout">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p><router-link :to="{ name: 'create' }" class="btn btn-primary my-2">开始写文章</router-link></p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">
      发现精彩
    </h4>


    <ColumnList :list="list"></ColumnList>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import ColumnList from '../components/ColumnList.vue'

import {  useStore } from '../store'

const store = useStore()
onMounted(() => {
  store.dispatch('fetchColumns')
})



const list = computed(() => store.state.columns)



</script>
