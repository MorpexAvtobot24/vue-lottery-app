<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const apiError = ref('');
const isLoading = ref(false);

// Схема валідації
const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const onSubmit = async (values: any) => {
  apiError.value = '';
  isLoading.value = true;
  try {
    await authStore.login(values.username, values.password);
    const redirectPath = (route.query.redirect as string) || '/users';
    router.push(redirectPath);
  } catch (e: any) {
    apiError.value = e.message || 'Login failed. Check your credentials.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-card">
    <h2>Login</h2>
    <p class="hint">Use: <strong>emilys</strong> / <strong>emilyspass</strong></p>
    
    <Form @submit="onSubmit" :validation-schema="schema" class="login-form">
      <div class="form-group">
        <label>Username:</label>
        <Field name="username" type="text" class="input" />
        <ErrorMessage name="username" class="error-text" />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <Field name="password" type="password" class="input" />
        <ErrorMessage name="password" class="error-text" />
      </div>

      <div v-if="apiError" class="api-error">{{ apiError }}</div>

      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Loading...' : 'Login' }}
      </button>
    </Form>
  </div>
</template>

<style scoped>
.login-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
.login-form { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.3rem; }
.input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.error-text { color: red; font-size: 0.8rem; }
.api-error { color: white; background: red; padding: 0.5rem; border-radius: 4px; text-align: center; font-size: 0.9rem; }
.submit-btn { padding: 0.7rem; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.submit-btn:disabled { background: #a0d8c0; cursor: not-allowed; }
.hint { font-size: 0.9rem; color: #666; margin-bottom: 1rem; }
</style>