<template>
  <aside class="sidebar">
    <!-- Логотип -->
    <div class="sidebar__logo">
      <img src="/logo.png" alt="Skypro.Music" class="logo__image" />
    </div>

    <!-- Бургер -->
    <div class="sidebar__burger" @click="toggleMenu">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>

    <!-- Меню -->
    <nav class="sidebar__menu" v-if="isOpen">
      <ul class="menu__list">
        <li class="menu__item">
          <a href="#" class="menu__link">Главное</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Мои треки</a>
        </li>
        <li class="menu__item">
          <button class="menu__link logout-btn" @click="handleLogout">Выйти</button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(true)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = () => {
  localStorage.clear()
  window.location.href = '/login'
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #181818;
  border-right: 1px solid #2a2a2a;
  padding: 24px 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.sidebar__logo {
  margin-bottom: 20px;
}

.logo__image {
  height: 24px;
  width: auto;
}

.sidebar__burger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  margin-bottom: 30px;
}

.burger__line {
  width: 24px;
  height: 2px;
  background: #d3d3d3;
}

.sidebar__menu {
  flex: 1;
}

.menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item {
  padding: 10px 0;
}

.menu__link {
  color: #b3b3b3;
  text-decoration: none;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.menu__link:hover {
  color: #fff;
}

.logout-btn {
  color: #b3b3b3;
}

.logout-btn:hover {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>