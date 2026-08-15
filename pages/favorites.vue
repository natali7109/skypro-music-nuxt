<template>
  <div>
    <h2 class="centerblock__h2">Мои треки</h2>

    <!-- Состояние загрузки -->
    <div v-if="pending" class="skeleton-wrapper">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-message">
      {{ error.message || 'Ошибка загрузки треков' }}
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
        <span class="col-time">
          <NuxtImg src="/img/icon/watch.svg" alt="Длительность" class="col-time-icon" :placeholder="[5]" />
        </span>
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

// Сторы
const playerStore = usePlayerStore()
const favoritesStore = useFavoritesStore()
const tracksStore = useTracksStore()

// Ленивая загрузка всех треков (не блокирует рендеринг)
const { data: allTracks, pending, error } = await useFetch(
  'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',
  {
    lazy: true,
    transform: (response) => response.data || [],
  }
)

// Синхронизируем загруженные треки со стором (чтобы другие страницы тоже их имели)
// Если в сторе уже есть данные, то не перезаписываем, иначе сохраняем
if (allTracks.value && allTracks.value.length && !tracksStore.allTracks.length) {
  tracksStore.allTracks = allTracks.value
}

// Фильтруем избранные треки
const favoriteTracks = computed(() => {
  // Используем данные из стора, если они уже есть, иначе из локальной загрузки
  const tracks = tracksStore.allTracks.length ? tracksStore.allTracks : (allTracks.value || [])
  return tracks.filter(track => favoritesStore.isLiked(track._id))
})

const selectTrack = (track) => {
  playerStore.setCurrentTrack(track)
}

// Загружаем избранное из localStorage
onMounted(() => {
  favoritesStore.load()
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