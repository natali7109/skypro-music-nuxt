<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

if (process.client) {
  userStore.initializeAuth();
}
</script>
