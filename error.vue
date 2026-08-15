<template>
  <div class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__text">Страница не найдена</p>
    <NuxtLink to="/" class="not-found__link">Вернуться на главную</NuxtLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #181818;
  font-family: 'Montserrat', sans-serif;
}

.not-found__title {
  font-size: 100px;
  font-weight: 700;
  color: #7334ea;
  margin-bottom: 20px;
}

.not-found__text {
  font-size: 24px;
  color: #b3b3b3;
  margin-bottom: 30px;
}

.not-found__link {
  color: #7334ea;
  font-size: 18px;
  text-decoration: none;
  border-bottom: 2px solid #7334ea;
  padding-bottom: 4px;
  transition: opacity 0.2s;
}

.not-found__link:hover {
  opacity: 0.7;
}
</style>
