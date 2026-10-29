<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ServiceProvider } from '@/services/service-provider';
import type { User } from '@/types/user';

const props = defineProps<{ id: string }>();
const user = ref<User | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    user.value = await ServiceProvider.users.getById(Number(props.id));
  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="user-details">
    <div v-if="loading">Loading details...</div>
    <div v-else-if="user">
      <h2>User Details: {{ user.firstName }} {{ user.lastName }}</h2>
      <ul>
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Age:</strong> {{ user.age }}</li>
        <li><strong>Gender:</strong> {{ user.gender }}</li>
        <li><strong>Phone:</strong> {{ user.phone }}</li>
      </ul>
      <RouterLink to="/users" class="back-link">← Back to Users</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.user-details { padding: 1rem; }
.back-link { display: inline-block; margin-top: 1rem; color: #42b883; text-decoration: none; }
</style>