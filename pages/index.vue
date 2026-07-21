<template>
  <div>
    <h2 class="centerblock__h2">Треки</h2>

    <FilterControls />

    <div v-if="pending" class="skeleton-wrapper">
      <div v-for="n in 10" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <div v-else-if="error" class="error-message">
      Не удалось загрузить треки: {{ error.message }}
    </div>

    <Playlist
      v-else
      :tracks="tracks"
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
import { ref, watchEffect } from 'vue'
import FilterControls from '@/components/FilterControls.vue'
import Playlist from '@/components/Playlist.vue'
import { usePlayerStore } from '~/stores/player'
import { useFiltersStore } from '~/stores/filters'

const playerStore = usePlayerStore()
const filterStore = useFiltersStore()

const { data: tracks, pending, error } = await useAsyncData('tracks', async () => {
  const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/')
  if (!response.ok) {
    throw new Error('Не удалось загрузить треки')
  }
  const result = await response.json()
  return result.data || []
})

// Сохраняем треки в стор фильтров
filterStore.setAllTracks(tracks.value || [])

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}

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