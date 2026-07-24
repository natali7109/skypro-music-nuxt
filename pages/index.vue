<template>
  <div>
    <h2 class="centerblock__h2">Треки</h2>

    <FilterControls />

    <!-- Скелетон во время загрузки -->
    <div v-if="pending" class="skeleton-wrapper">
      <div v-for="n in 10" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-message">
      Не удалось загрузить треки: {{ error.message }}
    </div>

    <!-- Список треков -->
    <Playlist
      v-else
      :tracks="tracksStore.allTracks"
      :search-query="filterStore.searchQuery"
      :sort-by="filterStore.sortBy"
      :selected-authors="filterStore.selectedAuthors"
      :selected-genres="filterStore.selectedGenres"
      :selected-years="filterStore.selectedYears"
      @select="selectTrack"
    />
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import FilterControls from '@/components/FilterControls.vue'
import Playlist from '@/components/Playlist.vue'
import { usePlayerStore } from '~/stores/player'
import { useFiltersStore } from '~/stores/filters'
import { useTracksStore } from '~/stores/tracks'

const tracksStore = useTracksStore()
const playerStore = usePlayerStore()
const filterStore = useFiltersStore()

// Ленивая загрузка треков (не блокирует рендеринг)
const { data: tracksData, pending, error } = await useFetch(
  'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',
  {
    lazy: true,
    transform: (response) => response.data || [],
  }
)

// Синхронизация с хранилищем, если данные ещё не загружены
if (tracksData.value && tracksData.value.length && !tracksStore.allTracks.length) {
  tracksStore.allTracks = tracksData.value
  filterStore.setAllTracks(tracksData.value)
  playerStore.setPlaylist(tracksData.value)
}

// Реактивное обновление при изменении треков (если они изменятся в сторе)
watchEffect(() => {
  if (tracksStore.allTracks.length) {
    filterStore.setAllTracks(tracksStore.allTracks)
    playerStore.setPlaylist(tracksStore.allTracks)
    console.log('📋 Плейлист передан в плеер, треков:', tracksStore.allTracks.length)
  }
})

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}

// Отладочный лог (можно убрать позже)
watchEffect(() => {
  console.log('Фильтры изменились:', {
    search: filterStore.searchQuery,
    authors: filterStore.selectedAuthors,
    genres: filterStore.selectedGenres,
    years: filterStore.selectedYears,
    sort: filterStore.sortBy
  })
})
</script>

<style scoped>
.centerblock__h2 {
  font-size: 64px;
  font-weight: 400;
  line-height: 72px;
  letter-spacing: -0.8px;
  color: #ffffff;
  margin-bottom: 45px;
}

.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #2a2a2a;
  border-radius: 8px;
}

.skeleton-line {
  height: 16px;
  background: #3a3a3a;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.error-message {
  color: #ff6b6b;
  padding: 20px;
  text-align: center;
}
</style>