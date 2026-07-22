<template>
  <div class="wrapper">
    <div class="container">
      <Navbar />

      <!-- ХЕДЕР -->
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
        <button class="header__logout" @click="handleLogout">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#696969"
            stroke-width="0.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" />
            <path d="M15 9l3 3-3 3" stroke="currentColor" />
            <path d="M10 12h8" stroke="currentColor" />
            <path d="M8 3v18" stroke="currentColor" />
          </svg>
        </button>
      </header>

      <!-- КОНТЕНТ -->
      <div class="main">
        <div class="main__centerblock">
          <slot />  <!-- Содержимое страниц -->
        </div>

        <div class="main__sidebar">
          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img src="/img/playlist/playlist01.png" alt="Плейлист дня" class="sidebar__img" />
                </a>
              </div>
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img src="/img/playlist/playlist02.png" alt="100 танцевальных хитов" class="sidebar__img" />
                </a>
              </div>
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img src="/img/playlist/playlist03.png" alt="Инди-заряд" class="sidebar__img" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ПЛЕЕР (скрыт, пока нет трека) -->
      <PlayerBar v-if="currentTrack" :current-track="currentTrack" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import PlayerBar from '@/components/PlayerBar.vue'
import { usePlayerStore } from '~/stores/player'
import { useTracksStore } from '~/stores/tracks'
import { useHead } from '#app'

const tracksStore = useTracksStore()
const playerStore = usePlayerStore()
const searchQuery = ref('')
const isMenuOpen = ref(false)

useHead({
  title: 'Skypro.Music',
  meta: [
    { name: 'description', content: 'Музыкальный сервис Skypro.Music' }
  ]
})

onMounted(() => {
  isMenuOpen.value = false
  tracksStore.fetchTracks() // ← загружаем треки при старте
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const updateSearch = () => {}

const handleLogout = () => {
  localStorage.clear()
  tracksStore.clearTracks() // ← очищаем при выходе
  window.location.href = '/login'
}

const currentTrack = computed(() => playerStore.currentTrack)
</script>


<style scoped>
/* ===== ЛЕВОЕ МЕНЮ ===== */
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

/* ===== ХЕДЕР ===== */
.main__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #181818;
 
  margin-left: 244px;
}

.header__search {
  position: relative;
  flex: 1;
  max-width: 1293px;
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
  padding: 8px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.header__logout:hover {
  color: #ff6b6b;
}

.header__logout svg {
  width: 40px;
  height: 40px;
}

/* ===== КОНТЕНТ ===== */
.main {
  margin-left: 244px;
  padding: 20px 24px;
  display: flex;
  gap: 40px;
  height: calc(100vh - 70px);
  overflow: hidden;
  max-width: 100%;
}

.main__centerblock {
  flex: 1;
  overflow-y: auto;
  padding-right: 20px;
}



/* ===== САЙДБАР ===== */
.main__sidebar {
  max-width: 450px;
  padding: 20px 80px 20px 90px;
  overflow-y: auto;
}

.sidebar__block {
  height: 100%;
  padding: 240px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar__item {
  width: 250px;
  height: 150px;
}

.sidebar__item:not(:last-child) {
  margin-bottom: 30px;
}

.sidebar__link {
  width: 100%;
  height: 100%;
  display: block;
}

.sidebar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .main__nav,
  .main__sidebar {
    display: none;
  }
  .main__header,
  .main {
    margin-left: 0;
  }
}
</style>