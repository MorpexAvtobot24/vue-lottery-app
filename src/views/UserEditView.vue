<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ServiceProvider } from '@/services/service-provider';
import type { User } from '@/types/user';

const props = defineProps<{ id: string }>();
const router = useRouter();
const user = ref<User | null>(null);
const loading = ref(true);
const isSaving = ref(false);

onMounted(async () => {
  try {
    user.value = await ServiceProvider.users.getById(Number(props.id));
  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    loading.value = false;
  }
});

const handleSave = async () => {
  if (!user.value) return;
  isSaving.value = true;
  try {
    await ServiceProvider.users.update(user.value.id, {
      firstName: user.value.firstName,
      lastName: user.value.lastName
    });
    router.push('/users');
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="user-edit">
    <div v-if="loading">Loading user data...</div>
    <div v-else-if="user" class="edit-form">
      <h2>Edit User: {{ user.username }}</h2>
      
      <div class="form-group">
        <label>First Name:</label>
        <input v-model="user.firstName" type="text" />
      </div>
      
      <div class="form-group">
        <label>Last Name:</label>
        <input v-model="user.lastName" type="text" />
      </div>

      <button @click="handleSave" :disabled="isSaving">
        {{ isSaving ? 'Saving...' : 'Save Changes' }}
      </button>
      <RouterLink to="/users" style="margin-left: 1rem;">Cancel</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.edit-form { display: flex; flex-direction: column; gap: 1rem; max-width: 400px; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button { padding: 0.5rem; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background: #a0d8c0; }
</style>