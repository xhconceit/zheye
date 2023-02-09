
<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader action="/upload" @file-uploaded="handleFileUpload" :before-upload="uploadCheck"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传文件</h2>

      <template #loading>
        <div class="d-flex ">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>

      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="">
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <ValidateInput tag="input" :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text">
        </ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <ValidateInput tag="textarea" type="password" placeholder="文章详情" :rules="contentRules" v-model="contentVal">
        </ValidateInput>
      </div>
      <template>
        <button class="btn btn-primary btn-large">
          发表文章
        </button>
      </template>
    </ValidateForm>

  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useStore, PostProps, ResponseType, ImageProps } from '../store';
import Uploader from '../components/Uploader.vue';
import { beforeUploadCheck } from '../helper'
import createMessage from '../components/createMessage';

const titleVal = ref('')
const router = useRouter()
const store = useStore()
let imageId = ''

const titleRules: RulesProp = [
  { type: 'required', message: '文章标题不能为空' }
]

const contentVal = ref('')

const contentRules: RulesProp = [
  { type: 'required', message: '文章详情不能为空' }
]

const handleFileUpload = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}

const onFormSubmit = (result: boolean) => {
  if (result) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id,

      }

      if (imageId) {
        newPost.image = imageId
      }

      store.dispatch('createPost', newPost).then(() => {
        createMessage('发表成功，跳转文章页', 'success')
        router.push({ name: 'column', params: { id: column } })
        // router.push('')
      })
    }
  }
}


const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  const { passed, error } = result
  if (error === 'format') {
    createMessage('上传图片只能是 JPG/PNG 格式', 'error')
  } else if (error === 'size') {
    createMessage('图片不可以大于 1 M', 'error')
  }

  return passed
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files) {
    const uploadedFile = files[0]
    const formData = new FormData()

    console.log(uploadedFile)
    formData.append('file', uploadedFile)
    // formData.append('name', "hel")
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((resp) => {
      console.log(resp)
    })
  }
}

</script>

<style>
.create-post-page .file-upload-container {

  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
