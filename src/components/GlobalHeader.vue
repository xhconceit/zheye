<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4  px-4">
    <a class="navbar-brand" href="">者也专栏</a>
    <!-- 未登录 -->
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <li class="list-inline-item">
        <Dropdown :title="`你好 ${user.nickName}`">
          <DropdownItem>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </DropdownItem>
          <DropdownItem disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item" @click.prevent="logout">退出登录</a>
          </DropdownItem>
        </Dropdown>
        <!-- <a href="#" class="btn btn-outline-light my-2">你好 {{ user.name }}</a> -->
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';


import { useStore } from '../store';
import { UserProps } from '../store';

const router = useRouter()

const store = useStore()

const props = defineProps<{ user: UserProps }>()

const logout = () => {
  store.commit('logout')
  router.push('/')
}
</script>


