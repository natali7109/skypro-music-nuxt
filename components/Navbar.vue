<template>
  <nav class="main__nav">
    <!-- Логотип (ссылка на Треки) -->
    <NuxtLink to="/" class="nav__logo-link">
      <div class="nav__logo">
        <img src="/logo.png" alt="Skypro.Music" class="logo__image" />
      </div>
    </NuxtLink>

    <!-- Бургер -->
    <div class="nav__burger" @click="toggleMenu">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>

    <!-- Меню -->
    <div class="nav__menu" v-if="isOpen">
      <ul class="menu__list">
        <li class="menu__item">
          <NuxtLink to="/" class="menu__link">Главное</NuxtLink>
        </li>
        <li class="menu__item">
          <NuxtLink to="/favorites" class="menu__link">Мои треки</NuxtLink>
        </li>
        <li class="menu__item">
          <button class="menu__link logout-btn" @click="handleLogout">Выйти</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = () => {
  localStorage.clear()
  window.location.href = '/login'
}
</script>

<style scoped>
/* ===== ЛЕВОЕ МЕНЮ (из твоего CSS) ===== */
.main__nav {
  width: 244px;
  background-color: #181818;
  padding: 20px 0 20px 36px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
}

.logo__image {
  width: 113.33px;
  height: 17px;
  color: #181818;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}

.nav__menu {
  display: block;
  visibility: visible;
}

.menu__list {
  padding: 18px 0 10px 0;
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
}

.menu__link:hover {
  color: #d9b6ff;
}

.logout-btn {
  color: #ffffff;
}

.logout-btn:hover {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .main__nav {
    display: none;
  }
}
</style>