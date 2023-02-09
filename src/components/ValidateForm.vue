<template>
  <form action="#" class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>



<script setup lang="ts">
import { getCurrentInstance, onUnmounted } from 'vue';
import emitter, { ValidateFunc } from '../utils/mitt'


const instance = getCurrentInstance()

const emits = defineEmits<{
  (e: 'form-submit', value: boolean): void
}>();



// type ValidateFunc = () => boolean
let funcArr: ValidateFunc[] = []
const callback = (func: ValidateFunc) => {
  funcArr.push(func)
}

emitter.on('form-item-created', callback)

// instance?.proxy?.$Bus.on('form-item-created', callback)

onUnmounted(() => {
  emitter.off('form-item-created', callback)
  // instance?.proxy.$Bus.off('form-item-created',  callback)
  funcArr = []
})


const submitForm = () => {
  const result = funcArr.map(func => func()).every(e=>e)
  emits('form-submit', result)
}




</script>
