<template>
  <li class="dropdown-option" :class="{ 'is-disabled': disabled  }">
    <slot></slot>
  </li>
</template>


<script setup lang="ts">


const props = defineProps<{ disabled?: boolean }>();

</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>

