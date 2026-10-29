<script setup lang="ts">
import Logo from './Logo.vue'
import AppNavigation from './AppNavigation.vue'
</script>

<template>
  <header>
    <Logo />
    <AppNavigation />
  </header>
</template>

<style scoped>
header { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 1rem 2rem; border-bottom: 1px solid #ddd; background: #f9f9f9;
}
</style>