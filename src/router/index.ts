import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: 'Login', layout: 'AuthLayout' }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true, title: 'Users' }
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('../views/UserDetailsView.vue'),
      props: true,
      meta: { requiresAuth: true, title: 'User Details' }
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('../views/UserEditView.vue'),
      props: true,
      meta: { requiresAuth: true, title: 'Edit User' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '404 - Not Found' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  
  // Зміна заголовка вкладки
  document.title = (to.meta.title as string) || 'Vue Lottery App';

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.name === 'login' && auth.isAuthenticated) {
    next({ name: 'users' });
  } else {
    next();
  }
});

export default router;