import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { ServiceProvider } from '@/services/service-provider';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = computed(() => accessToken.value !== null);

  async function login(username: string, password: string) {
    const response = await ServiceProvider.auth.login(username, password);
    accessToken.value = response.accessToken;
    localStorage.setItem('token', response.accessToken);
  }

  function logout() {
    accessToken.value = null;
    localStorage.removeItem('token');
  }

  return { accessToken, isAuthenticated, login, logout };
});