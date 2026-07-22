<template>
  <div class="playlist__item" @click="selectTrack">
    <div class="playlist__track">
      <div class="track__title">
        <div class="track__cover-wrapper">
          <!-- Обложка -->
          <img 
            v-if="coverUrl" 
            :src="coverUrl" 
            alt="Обложка" 
            class="track__cover" 
          />
          <svg v-else class="track__title-svg" width="18" height="17" viewBox="0 0 18 17">
            <path d="M8 2L8 15M12 4L12 13M4 6L4 11M16 6L16 11" stroke="#4e4e4e" stroke-width="2"/>
          </svg>
          <!-- Индикатор текущего трека (точка) -->
          <div 
            v-if="isActive" 
            class="track__indicator" 
            :class="{ 'pulsing': isActive && isPlaying }"
          ></div>
        </div>
        <span class="track__title-link">{{ track.name }}</span>
      </div>

      <div class="track__author">
        <span class="track__author-link">{{ track.author }}</span>
      </div>

      <div class="track__album">
        <span class="track__album-link">{{ track.album || '—' }}</span>
      </div>

      <div class="track__time">
        <button class="track__like-btn" @click.stop="toggleLike" :title="isLiked ? 'Убрать лайк' : 'Поставить лайк'">
          <svg v-if="!isLiked" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="liked">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <span class="track__time-text">{{ formatDuration(track.duration_in_seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePlayerStore } from '~/stores/player'

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
})

const playerStore = usePlayerStore()

// === ВЫБОР ТРЕКА (БЕЗ СНЯТИЯ) ===
const selectTrack = () => {
  playerStore.setCurrentTrack(props.track)
}

// === ИНДИКАТОР ТЕКУЩЕГО ТРЕКА ===
const isActive = computed(() => {
  return playerStore.currentTrack && playerStore.currentTrack._id === props.track._id
})

const isPlaying = computed(() => playerStore.isPlaying)

// === ЛАЙКИ ===
const isLiked = ref(false)

const coverUrl = computed(() => {
  const logo = props.track.logo
  if (!logo) return null
  if (typeof logo === 'string') return logo
  if (typeof logo === 'object' && logo.url) return logo.url
  if (typeof logo === 'object' && logo.data && logo.data.url) return logo.data.url
  return null
})

onMounted(() => {
  const likedTracks = JSON.parse(localStorage.getItem('likedTracks') || '[]')
  isLiked.value = likedTracks.includes(props.track._id)
})

const toggleLike = () => {
  isLiked.value = !isLiked.value
  const likedTracks = JSON.parse(localStorage.getItem('likedTracks') || '[]')
  if (isLiked.value) {
    if (!likedTracks.includes(props.track._id)) {
      likedTracks.push(props.track._id)
    }
  } else {
    const index = likedTracks.indexOf(props.track._id)
    if (index !== -1) likedTracks.splice(index, 1)
  }
  localStorage.setItem('likedTracks', JSON.stringify(likedTracks))
}

const formatDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
</script>

<style scoped>
.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
  
}

.playlist__track {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
  background: #1a1a1a;
}

.playlist__track:hover {
  background: #2a2a2a;
}

.track__title {
  display: flex;
  align-items: center;
  width: 447px;
  gap: 12px;
}

.track__cover-wrapper {
  position: relative;
  width: 51px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
}

.track__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.track__title-svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

/* ===== ИНДИКАТОР ТЕКУЩЕГО ТРЕКА ===== */
.track__indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;         
  height: 14px;
  border-radius: 50%;
  background: #7334ea;
  border: 1.5px solid #1a1a1a;
  box-shadow: 0 0 6px rgba(115, 52, 234, 0.6);
  transition: transform 0.2s;
}

.pulsing {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.7;
  }
}

.track__title-link {
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
}

.track__author {
  width: 321px;
  display: flex;
  justify-content: flex-start;
}

.track__author-link {
  font-size: 16px;
  line-height: 24px;
  color: #b3b3b3;
  text-decoration: none;
}

.track__album {
  width: 245px;
}

.track__album-link {
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  text-decoration: none;
}

.track__time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.track__like-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #696969;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.track__like-btn:hover {
  color: #565496;
}

.track__like-btn .liked {
  color: #565496;
}

.track__time-text {
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  text-align: right;
}
</style>