<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()

// Динамічний вибір макету на основі meta.layout з роутера
const layout = computed(() => {
  return route.meta.layout === 'AuthLayout' ? AuthLayout : DefaultLayout
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style>
/* Глобальні стилі */
body { margin: 0; font-family: Arial, sans-serif; }
</style>