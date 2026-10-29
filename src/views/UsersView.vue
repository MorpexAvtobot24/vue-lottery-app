<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ServiceProvider } from '@/services/service-provider';
import type { User } from '@/types/user';

const users = ref<User[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await ServiceProvider.users.getAll({ limit: 10 });
    users.value = response.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="users-page">
    <h2>Users List</h2>
    <div v-if="loading">Loading users...</div>
    <div v-else class="users-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>{{ user.email }}</p>
        <div class="actions">
          <RouterLink :to="{ name: 'user-details', params: { id: user.id } }">Details</RouterLink>
          <RouterLink :to="{ name: 'user-edit', params: { id: user.id } }">Edit</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-grid { display: flex; flex-direction: column; gap: 1rem; }
.user-card { border: 1px solid #ddd; padding: 1rem; border-radius: 8px; }
.actions { display: flex; gap: 1rem; margin-top: 0.5rem; }
</style>