
<template>
  <div class="dropdown" ref="dropdownRef">

    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen"> {{ title }}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside'


const dropdownRef = ref<null | HTMLElement>(null);

const props = defineProps<{ title: string }>()

const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}


const isClickOutside = useClickOutside(dropdownRef)


watch(isClickOutside, () => {

  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false

  }
})


</script>
