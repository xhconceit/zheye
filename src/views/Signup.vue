
<template>
  <div class="signup-page mx-auto p-3 w-330">
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput :rules="emailRules" v-model="formData.email" placeholder="请输入邮箱地址" type="text"></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">名字</label>
        <ValidateInput :rules="nameRules" v-model="formData.nickName" placeholder="请输入名字" type="text"></ValidateInput>
      </div>
      <!-- 密码 -->
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput :rules="passwordRules" v-model="formData.password" placeholder="请输入密码" type="password">
        </ValidateInput>
      </div>
      <!-- 重复密码 -->
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <ValidateInput :rules="repeatPasswordRules" v-model="formData.repeatPassword" placeholder="请输入重新密码"
          type="password">
        </ValidateInput>

      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large ">注册</button>
      </template>
    </ValidateForm>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'
import axios from 'axios'
import { useRouter } from 'vue-router'


const router = useRouter()

const formData = reactive({
  email: '',
  nickName: '',
  password: '',
  repeatPassword: ''
})

// email

const emailRules: RulesProp = [
  {
    type: 'required', message: '邮箱不能为空',
  },
  {
    type: 'email', message: '请输入正确的邮箱地址'
  }
]

// nickName

const nameRules: RulesProp = [

  {
    type: 'required', message: '名字不能为空',
  },
]

// 密码
const passwordRules: RulesProp = [

  {
    type: 'required', message: '密码不能为空',
  },
]

const repeatPasswordRules: RulesProp = [
  {
    type: 'required', message: '重复密码不能为空',
  }, 
  {
    type: 'custom', message: '密码不相同',
    validator: () => {
      return  formData.password === formData.repeatPassword
    }
  }
]

const onFormSubmit = async (result: boolean) => {

  if (result) {
    const payload = {
      email: formData.email,
      password: formData.password,
      nickName: formData.nickName
    }
    
    axios.post('/users/', payload).then(data => {
      createMessage('注册成功跳转登录页','success')
      
      router.push('/login')

    }).catch(e=> {

        console.log(e)
      })
  }
}
</script>
