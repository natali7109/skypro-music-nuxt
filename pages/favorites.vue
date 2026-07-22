<template>
  <div>
    <h2 class="centerblock__h2">Избранные треки</h2>

    <!-- Состояние загрузки -->
    <div v-if="tracksStore.loading" class="skeleton-wrapper">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="tracksStore.error" class="error-message">
      {{ tracksStore.error }}
    </div>

    <!-- Нет избранных -->
    <div v-else-if="!favoriteTracks.length" class="empty-message">
      У вас пока нет избранных треков
    </div>

    <!-- Список избранных -->
    <div v-else>
      <div class="playlist__header">
        <span class="col-track">ТРЕК</span>
        <span class="col-artist">ИСПОЛНИТЕЛЬ</span>
        <span class="col-album">АЛЬБОМ</span>
        <span class="col-time">ДЛИТЕЛЬНОСТЬ</span>
      </div>

      <div class="playlist__list">
        <Track
          v-for="track in favoriteTracks"
          :key="track._id"
          :track="track"
          @select="selectTrack"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import Track from '@/components/Track.vue'
import { usePlayerStore } from '~/stores/player'
import { useFavoritesStore } from '~/stores/favorites'
import { useTracksStore } from '~/stores/tracks'

const tracksStore = useTracksStore()
const playerStore = usePlayerStore()
const favoritesStore = useFavoritesStore()

// Фильтруем избранные треки из общего списка
const favoriteTracks = computed(() => {
  return tracksStore.allTracks.filter(track => favoritesStore.isLiked(track._id))
})

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}

onMounted(() => {
  favoritesStore.load() // загружаем лайки из localStorage
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

.empty-message {
  color: #888;
  padding: 40px;
  text-align: center;
  font-size: 18px;
}
</style>