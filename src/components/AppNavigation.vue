<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About author</RouterLink>
    <RouterLink v-if="auth.isAuthenticated" to="/users">Users</RouterLink>
    
    <button v-if="auth.isAuthenticated" @click="handleLogout" class="logout-btn">Logout</button>
    <RouterLink v-else to="/login">Login</RouterLink>
  </nav>
</template>

<style scoped>
nav { display: flex; gap: 1rem; align-items: center; }
a { text-decoration: none; color: #333; }
.router-link-active { font-weight: bold; color: #42b883; text-decoration: underline; }
.logout-btn { cursor: pointer; padding: 0.2rem 0.5rem; }
</style>