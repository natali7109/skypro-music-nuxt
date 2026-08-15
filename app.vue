<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// Инициализируем авторизацию при загрузке приложения
if (process.client) {
  userStore.initializeAuth()
}
</script>