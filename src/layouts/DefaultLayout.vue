<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="default-layout">
    <AppHeader />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.content { padding: 2rem; }
</style>