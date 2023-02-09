<template>
  <div class="validate-input-container pb-3">
    <input type="text" class="form-control " v-if="tag !== 'textarea'" :class="{
      'is-invalid': inputRef.error
    }" :value="inputRef.val" @input="updateValue" @blur="validateInput" v-bind='$attrs'>
    <textarea v-else rows="10" class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val"
      @blur="validateInput" @input="updateValue" v-bind="$attrs"></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive } from 'vue';

import emitter from '../utils/mitt';


export interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean
}

export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'

const instance = getCurrentInstance()
const props = defineProps<{ rules: RulesProp, modelValue: string, tag?: TagType }>()

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: ''
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()


const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue

  emits('update:modelValue', targetValue)

}

const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const validateInput = () => {

  if (props.rules) {
    const allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = (inputRef.val.trim() !== '')
          break;
        case 'email':
          emailReg.lastIndex = 0
          passed = emailReg.test(inputRef.val)
          break;
        case 'custom':
        passed = rule.validator ? rule.validator() : true
        break;
        default:
          break;
      }
      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}


onMounted(() => {
  emitter.emit('form-item-created', validateInput)
  // instance?.proxy.$Bus.emit('form-item-created', validateInput)
})

</script>
