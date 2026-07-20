<template>
  <div class="wrapper">
    <div class="container">
      <Navbar />

      <div class="main">
        <div class="main__centerblock">
          <h2 class="centerblock__h2">Мои треки</h2>

          <div v-if="loading" class="skeleton">Загрузка...</div>
          <div v-else-if="error" class="error">{{ error }}</div>

          <div v-else class="playlist__list">
            <Track
              v-for="track in favoriteTracks"
              :key="track._id"
              :track="track"
              @select="selectTrack"
            />
          </div>
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

      <PlayerBar :current-track="currentTrack" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Track from '@/components/Track.vue'
import PlayerBar from '@/components/PlayerBar.vue'
import { useTracks } from '@/composables/useTracks'
import { useFavorites } from '@/composables/useFavorites'

const { tracks, loading, error, fetchTracks } = useTracks()
const { likedIds } = useFavorites()

const currentTrack = ref(null)

const favoriteTracks = computed(() => {
  return tracks.value.filter(track => likedIds.value.includes(track._id))
})

const selectTrack = (track) => {
  currentTrack.value = track
}

onMounted(() => {
  fetchTracks()
})
</script>

<style scoped>
/* ===== КОНТЕНТ ===== */
.main {
  margin-left: 244px;
  padding: 20px 24px;
  display: flex;
  gap: 40px;
  height: calc(100vh - 70px);
  overflow: hidden;
}

.main__centerblock {
  flex: 1;
  overflow-y: auto;
  padding-right: 20px;
}

.centerblock__h2 {
  font-size: 64px;
  font-weight: 400;
  line-height: 72px;
  letter-spacing: -0.8px;
  color: #ffffff;
  margin-bottom: 45px;
}

/* ===== САЙДБАР ===== */
.main__sidebar {
  max-width: 418px;
  padding: 20px 90px 20px 78px;
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

.skeleton {
  color: #888;
  padding: 20px;
}

.error {
  color: #ff6b6b;
  padding: 20px;
}

@media (max-width: 768px) {
  .main__sidebar {
    display: none;
  }
}
</style>