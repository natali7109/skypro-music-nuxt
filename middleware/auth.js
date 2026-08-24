export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (process.client) {
    userStore.initializeAuth();
  }

  if (!userStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
