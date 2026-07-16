<template>
  <div class="wrapper">
    <div class="container">
      <!-- Левое меню -->
      <aside class="sidebar" :class="{ open: isMenuOpen }">
        <div class="sidebar__logo">
          <img src="/logo.png" alt="Skypro.Music" class="logo__image" />
        </div>

        <!-- Бургер -->
        <div class="sidebar__burger" @click="toggleMenu">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </div>

        <!-- Меню (видимость зависит от isMenuOpen) -->
        <nav class="sidebar__menu" v-if="isMenuOpen">
          <ul class="menu__list">
            <li class="menu__item"><a href="#" class="menu__link">Главное</a></li>
            <li class="menu__item"><a href="#" class="menu__link">Мои треки</a></li>
            <li class="menu__item">
              <button class="menu__link logout-btn" @click="handleLogout">Выйти</button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Хедер -->
      <header class="main__header">
        <div class="header__search">
          <svg class="search__icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="white" stroke-width="1.5"/>
            <path d="M13 13L17 17" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="search__input"
            placeholder="Поиск"
            @input="updateSearch"
          />
        </div>
        <button class="header__logout" @click="handleLogout">Выйти</button>
      </header>

      <!-- Контент -->
      <div class="main">
        <section class="main__content">
          <h2 class="main__title">Треки</h2>

          <FilterControls
            @update:search="searchQuery = $event"
            @update:sort="sortBy = $event"
          />

          <Playlist
            :search-query="searchQuery"
            :sort-by="sortBy"
            @select="selectTrack"
          />
        </section>

        <aside class="main__sidebar">
          
          <div class="sidebar__list">
            <div class="sidebar__item">
              <img src="/img/playlist/playlist01.png" alt="Плейлист дня" class="sidebar__img" />
            </div>
            <div class="sidebar__item">
              <img src="/img/playlist/playlist02.png" alt="100 танцевальных хитов" class="sidebar__img" />
            </div>
            <div class="sidebar__item">
              <img src="/img/playlist/playlist03.png" alt="Инди-заряд" class="sidebar__img" />
            </div>
          </div>
        </aside>
      </div>

      <PlayerBar :current-track="currentTrack" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FilterControls from '@/components/FilterControls.vue'
import Playlist from '@/components/Playlist.vue'
import PlayerBar from '@/components/PlayerBar.vue'

const currentTrack = ref(null)
const searchQuery = ref('')
const sortBy = ref('default')

// Состояние меню — по умолчанию закрыто
const isMenuOpen = ref(false)

// При монтировании — меню закрыто (это и так по умолчанию)
onMounted(() => {
  isMenuOpen.value = false
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectTrack = (track) => {
  currentTrack.value = track
}

const updateSearch = () => {
  // поиск уже обновляется через v-model
}

const handleLogout = () => {
  localStorage.clear()
  window.location.href = '/login'
}
</script>

<style scoped>
/* ===== ЛЕВОЕ МЕНЮ ===== */
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

/* ===== ХЕДЕР ===== */
.main__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #181818;
  border-bottom: 1px solid #2a2a2a;
  margin-left: 200px;
}

.header__search {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search__icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.search__input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: none;
  border-bottom: 1px solid #4e4e4e;
  background: transparent;
  color: #fff;
  font-size: 14px;
  outline: none;
}

.search__input::placeholder {
  color: #888;
}

.search__input:focus {
  border-bottom-color: #7334ea;
}

.header__logout {
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.header__logout:hover {
  color: #ff6b6b;
}

/* ===== КОНТЕНТ ===== */
.main {
  margin-left: 200px;
  padding: 20px 24px;
  display: flex;
  gap: 40px;
  height: calc(100vh - 70px);
  overflow: hidden;
}

.main__content {
  flex: 1;
  overflow-y: auto;
  padding-right: 20px;
}

.main__title {
  font-size: 48px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 20px;
}

/* ===== ПЛЕЙЛИСТ ДНЯ ===== */
.main__sidebar {
  width: 250px;
  flex-shrink: 0;
  padding-top: 300px;
  overflow-y: auto;
}

.sidebar__title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 510px;
  overflow: hidden;
}

.sidebar__item {
  flex: 1;
}

.sidebar__img {
  width: 100%;
  height: 100%;
  
  object-fit: cover;
}

@media (max-width: 768px) {
  .sidebar,
  .main__sidebar {
    display: none;
  }
  .main__header,
  .main {
    margin-left: 0;
  }
}
</style>
