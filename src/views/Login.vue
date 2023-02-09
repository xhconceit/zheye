<template>
  <div class="login-page">
    <ValidateForm action="" @form-submit="onFormSubmit">
      <template v-slot:default>
        <div class="mb-3">
          <label for="form-label">邮箱地址</label>
          <ValidateInput :rules="emailRules" v-model="emailVal" id="exampleInputEmail" placeholder="hello world">
          </ValidateInput>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码</label>
          <ValidateInput :rules="passwordRules" v-model="passwordVal" type="password" class="form-control"
            id="exampleInputPassword1" placeholder="请输入密码" />
        </div>
      </template>
      <template v-slot:submit>
        <!-- <span class="btn btn-danger">Submit</span> -->
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { log } from 'console';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ValidateForm from '../components/ValidateForm.vue';
import ValidateInput from '../components/ValidateInput.vue';
import { RulesProp } from '../components/ValidateInput.vue';
import { useStore } from '../store';
import createMessage from '../components/createMessage'

const router = useRouter()
const store = useStore()

const emailVal = ref("111@test.com")
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱' }
]


const passwordVal = ref('111111')

const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]


const onFormSubmit = (result: boolean) => {
  console.log(result)
  if (result) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    store.dispatch('loginAndFetch', payload).then(data => {

      console.log(data)
      createMessage('登录成功', 'success')
      router.push('/')
    }).catch(e => {
        console.log(e)
      })
  }
}
</script>
