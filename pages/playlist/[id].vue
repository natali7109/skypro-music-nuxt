<template>
  <div>
    <h2 class="centerblock__h2">{{ selectionTitle }}</h2>

    <!-- Скелетон во время загрузки -->
    <div v-if="loading" class="skeleton-wrapper">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-message">
      Не удалось загрузить подборку: {{ error }}
    </div>

    <!-- Нет треков -->
    <div v-else-if="!tracks.length" class="empty-message">
      В этой подборке пока нет треков
    </div>

    <!-- Список треков -->
    <div v-else>
      <div class="playlist__header">
        <span class="col-track">ТРЕК</span>
        <span class="col-artist">ИСПОЛНИТЕЛЬ</span>
        <span class="col-album">АЛЬБОМ</span>
        <span class="col-time">
          <NuxtImg src="/img/icon/watch.svg" alt="Длительность" class="col-time-icon" :placeholder="[5]" />
        </span>
      </div>

      <div class="playlist__list">
        <Track
          v-for="track in tracks"
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
import { useRoute } from 'vue-router'
import Track from '@/components/Track.vue'
import { usePlayerStore } from '~/stores/player'
import { useSelectionsStore } from '~/stores/selections'
import { useTracksStore } from '~/stores/tracks'

const route = useRoute()
const playerStore = usePlayerStore()
const selectionsStore = useSelectionsStore()
const tracksStore = useTracksStore()

const selectionId = route.params.id

// Загружаем подборку при монтировании
onMounted(async () => {
  await selectionsStore.fetchSelectionById(selectionId)
})

// Получаем треки из подборки, используя уже загруженные треки из tracksStore
const tracks = computed(() => {
  const itemIds = selectionsStore.currentSelection?.items || []
  const allTracks = tracksStore.allTracks || []
  return allTracks.filter(track => itemIds.includes(track._id))
})

const loading = computed(() => selectionsStore.loading)
const error = computed(() => selectionsStore.error)

const selectionTitle = computed(() => {
  return selectionsStore.currentSelection?.name || 'Подборка'
})

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}
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

.playlist__header {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #4e4e4e;
  color: #696969;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.col-track { width: 680px; }
.col-artist { width: 560px; }
.col-album { width: 520px; }
.col-time {
  width: 20px;
  text-align: right;
}

.col-time-icon {
  width: 18px;
  height: 18px;
  display: block;
  margin: 0 auto;
}
</style>