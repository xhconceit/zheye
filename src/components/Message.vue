
<template>
  <Teleport to="#message">
    <div class="alert message-info  fixed-top w-50 mx-auto d-flex justify-content-between mt-2" role="alert"
      :class="classObject" v-if="isVisible">
      <span>{{ message }}</span>
      <button type="button" class="close " data-dismiss="alert" aria-label="Close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </Teleport>

</template>
<script setup lang="ts">
import {  ref } from 'vue';

import useDOMCreate from '../hooks/useDOMCreate'


export type MessageType = 'success' | 'error' | 'default'

const props = defineProps<{ type: MessageType, message: string }>()


useDOMCreate('message')

const isVisible = ref(true)

const classObject = {
  'alert-success': props.type === 'success',
  'alert-danger': props.type === 'error',
  'alert-primary': props.type === 'default',
}

const emits = defineEmits<{ (e: 'close-message', val: boolean): void }>();
const hide = () => {
  isVisible.value = false
  emits('close-message', true)
}


// onUnmounted(() => {
//   document.body.removeChild(node)
//
// })

</script>

<style scoped>
button.close {
  background: transparent;
  border: none;
  font-weight: 900;
}
</style>
