
<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: background || '' }">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <p class="text-primary small" v-if="text">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>


<script setup lang="ts">
import { onUnmounted } from 'vue';


defineProps<{ text?: string, background?: string }>()

const node = document.createElement('div')
node.id = 'back'
document.body.appendChild(node)
onUnmounted(() => {
  document.body.removeChild(node)
})

</script>


<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.loading-content {
  text-align: center;
}
</style>
