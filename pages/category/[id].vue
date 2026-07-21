<template>
  <div>
    <h2 class="centerblock__h2">Категория: {{ categoryName }}</h2>

    <div v-if="pending" class="skeleton-wrapper">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <div v-else-if="error" class="error-message">
      Не удалось загрузить треки: {{ error.message }}
    </div>

    <div v-else-if="!filteredTracks.length" class="empty-message">
      В этой категории пока нет треков
    </div>

    <div v-else>
      <div class="playlist__header">
        <span class="col-track">ТРЕК</span>
        <span class="col-artist">ИСПОЛНИТЕЛЬ</span>
        <span class="col-album">АЛЬБОМ</span>
        <span class="col-time">ДЛИТЕЛЬНОСТЬ</span>
      </div>

      <div class="playlist__list">
        <Track
          v-for="track in filteredTracks"
          :key="track._id"
          :track="track"
          @select="selectTrack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Track from '@/components/Track.vue'
import { usePlayerStore } from '~/stores/player'

const route = useRoute()
const playerStore = usePlayerStore()
const categoryId = route.params.id

// Определяем название категории (можно расширить)
const categoryName = computed(() => {
  // Здесь можно сделать маппинг, если нужно
  return categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
})

// Загружаем все треки
const { data: allTracks, pending, error } = await useAsyncData(`category-${categoryId}`, async () => {
  const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/')
  if (!response.ok) {
    throw new Error('Не удалось загрузить треки')
  }
  const result = await response.json()
  return result.data || []
})

// Фильтруем треки по категории (по жанру или автору, зависит от данных)
const filteredTracks = computed(() => {
  if (!allTracks.value) return []
  return allTracks.value.filter(track => {
    // Ищем категорию в жанрах (если genre — массив)
    if (Array.isArray(track.genre)) {
      return track.genre.some(g => g.toLowerCase() === categoryId.toLowerCase())
    }
    // Или если genre — строка
    return track.genre?.toLowerCase() === categoryId.toLowerCase()
  })
})

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}
</script>

<style scoped>
/* те же стили, что на странице избранного */
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
.skeleton-line.short { width: 60%; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.error-message {
  color: #ff6b6b;
  padding: 20px;
  text-align: center;
}
.empty-message {
  color: #888;
  padding: 40px;
  text-align: center;
  font-size: 18px;
}
</style>