<template>
  <div class="playlist__item" @click="$emit('select', track)">
    <div class="playlist__track">
      <!-- Название + обложка -->
      <div class="track__title">
        <div class="track__title-image">
          <img 
            v-if="coverUrl" 
            :src="coverUrl" 
            alt="Обложка" 
            class="track__cover" 
          />
          <svg v-else class="track__title-svg" width="18" height="17" viewBox="0 0 18 17">
            <path d="M8 2L8 15M12 4L12 13M4 6L4 11M16 6L16 11" stroke="#4e4e4e" stroke-width="2"/>
          </svg>
        </div>
        <span class="track__title-link">{{ track.name }}</span>
      </div>

      <!-- Исполнитель -->
      <div class="track__author">
        <span class="track__author-link">{{ track.author }}</span>
      </div>

      <!-- Альбом -->
      <div class="track__album">
        <span class="track__album-link">{{ track.album || '—' }}</span>
      </div>

      <!-- Сердечко + длительность -->
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

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select'])

const isLiked = ref(false)

// Получение URL обложки из разных форматов
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
  padding: 12px 16px;
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
  width: 30%;
}

.track__title-image {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
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

.track__title-link {
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
}

.track__author {
  width: 25%;
  display: flex;
  justify-content: flex-start;
}

.track__author-link {
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
}

.track__album {
  width: 25%;
  display: flex;
  justify-content: flex-start;
}

.track__album-link {
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  text-decoration: none;
}

.track__time {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.track__like-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #696969;
  transition: color 0.2s, transform 0.2s;
}

.track__like-btn:hover {
  color: #ff6b6b;
  transform: scale(1.1);
}

.track__like-btn .liked {
  color: #ff6b6b;
}

.track__like-btn svg {
  width: 16px;
  height: 16px;
}

.track__time-text {
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  text-align: right;
}
</style>