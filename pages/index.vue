<template>
  <div>
    <h2 class="centerblock__h2">Треки</h2>

    <FilterControls />

    <div v-if="tracksStore.loading" class="skeleton-wrapper">
      <div v-for="n in 10" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <div v-else-if="tracksStore.error" class="error-message">
      Не удалось загрузить треки: {{ tracksStore.error }}
    </div>

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
import { watch, watchEffect } from 'vue'
import FilterControls from '@/components/FilterControls.vue'
import Playlist from '@/components/Playlist.vue'
import { usePlayerStore } from '~/stores/player'
import { useFiltersStore } from '~/stores/filters'
import { useTracksStore } from '~/stores/tracks'

const tracksStore = useTracksStore()
const playerStore = usePlayerStore()
const filterStore = useFiltersStore()

// Когда треки загружены – сохраняем их в сторе фильтров и передаём в плеер
watchEffect(() => {
  if (tracksStore.allTracks.length) {
    filterStore.setAllTracks(tracksStore.allTracks)
    // Устанавливаем плейлист в плеер
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