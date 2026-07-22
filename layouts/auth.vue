<template>
  <div class="auth-layout">
    <div class="auth-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #181818; /* тёмный фон */
  padding: 20px;
}
.auth-wrapper {
  width: 100%;
  max-width: 380px;
}
</style>
