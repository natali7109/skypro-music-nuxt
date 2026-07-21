<template>
  <div class="bar">
    <div class="bar__content">
      <div class="bar__player-progress" @click="handleProgressClick">
        <div
          class="bar__player-progress-line"
          :style="{ width: playerStore.progress + '%' }"
        ></div>
      </div>
      <div class="bar__player-block">
        <div class="bar__player">
          <div class="player__controls">
            <button class="player__btn" @click="prevTrack" title="Предыдущий">
              <svg width="24" height="20" viewBox="0 0 15 14">
                <path d="M13 12L3 7L13 2V12Z" stroke="currentColor" stroke-width="2"/>
                <path d="M2 2V12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            <button class="player__btn" @click="togglePlay" :title="playerStore.isPlaying ? 'Пауза' : 'Воспроизвести'">
              <svg width="22" height="20" viewBox="0 0 22 20">
                <path v-if="!playerStore.isPlaying" d="M0 0L22 10L0 20V0Z" fill="currentColor"/>
                <rect v-else x="0" y="0" width="7" height="20" fill="currentColor"/>
                <rect x="14" y="0" width="7" height="20" fill="currentColor"/>
              </svg>
            </button>
            <button class="player__btn" @click="nextTrack" title="Следующий">
              <svg width="24" height="20" viewBox="0 0 15 14">
                <path d="M2 12L12 7L2 2V12Z" stroke="currentColor" stroke-width="2"/>
                <path d="M13 2V12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            <button class="player__btn" @click="toggleRepeat" :class="{ active: playerStore.repeat }" title="Повтор">
              <svg width="24" height="20" viewBox="0 0 18 12">
                <path d="M4 2L1 5L4 8" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M17 5L14 2L14 8" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M1 5H17" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            <button class="player__btn" @click="toggleShuffle" :class="{ active: playerStore.shuffle }" title="Перемешать">
              <svg width="24" height="20" viewBox="0 0 19 12">
                <path d="M1 2H5L8 5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M18 10H14L11 7" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M18 2H14L11 5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M1 10H5L8 7" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </button>
          </div>

          <div class="player__track-play">
            <div class="track-play__contain">
              <div class="track-play__image">
                <img
                  v-if="playerStore.currentTrack?.logo && typeof playerStore.currentTrack.logo === 'string'"
                  :src="playerStore.currentTrack.logo"
                  alt="Обложка"
                  class="track-play__cover"
                />
                <svg v-else width="18" height="17" viewBox="0 0 18 17">
                  <path d="M8 2L8 15M12 4L12 13M4 6L4 11M16 6L16 11" stroke="#4e4e4e" stroke-width="2"/>
                </svg>
              </div>
              <div class="track-play__info">
                <div class="track-play__title-row">
                  <span class="track-play__author">{{ playerStore.currentTrack?.name || 'Не выбрано' }}</span>
                  <button class="track-play__like-btn" @click.stop="toggleLike" :title="isLiked ? 'Убрать лайк' : 'Поставить лайк'">
                    <svg v-if="!isLiked" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="liked">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                </div>
                <span class="track-play__album">{{ playerStore.currentTrack?.author || 'Выберите трек' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bar__volume-block">
          <div class="volume__content">
            <div class="volume__image">
              <svg width="24" height="19" viewBox="0 0 13 18">
                <path d="M0 6H3L8 1V17L3 12H0V6Z" stroke="currentColor" stroke-width="2"/>
                <path d="M10 5C10.5 5.5 11 6.5 11 9C11 11.5 10.5 12.5 10 13" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="volume__progress">
              <input
                v-model="playerStore.volume"
                class="volume__progress-line"
                type="range"
                min="0"
                max="100"
                @input="updateVolume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioPlayer"
      @timeupdate="handleTimeUpdate"
      @ended="handleTrackEnd"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePlayerStore } from '~/stores/player'
import { useAudioPlayer } from '~/composables/useAudioPlayer'

const playerStore = usePlayerStore()
const audioPlayer = ref(null)

const {
  togglePlay,
  handleTimeUpdate,
  handleTrackEnd,
  seekTo,
  updateVolume,
  nextTrack,
  prevTrack,
  toggleRepeat,
  toggleShuffle,
  initPlayer,
} = useAudioPlayer()

onMounted(() => {
  if (audioPlayer.value) {
    initPlayer(audioPlayer.value)
  }
})

const handleProgressClick = (event) => {
  if (!playerStore.currentTrack) return
  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = (x / rect.width) * 100
  seekTo(percentage)
}

const isLiked = computed(() => {
  if (!playerStore.currentTrack) return false
  const liked = JSON.parse(localStorage.getItem('likedTracks') || '[]')
  return liked.includes(playerStore.currentTrack._id)
})

const toggleLike = () => {
  if (!playerStore.currentTrack) return
  const id = playerStore.currentTrack._id
  const liked = JSON.parse(localStorage.getItem('likedTracks') || '[]')
  const idx = liked.indexOf(id)
  if (idx > -1) liked.splice(idx, 1)
  else liked.push(id)
  localStorage.setItem('likedTracks', JSON.stringify(liked))
}
</script>

<style scoped>
/* ===== ОСНОВНЫЕ СТИЛИ ===== */
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid #2a2a2a;
  z-index: 100;
}

.bar__content {
  display: flex;
  flex-direction: column;
}

.bar__player-progress {
  width: 100%;
  height: 4px;
  background: #2e2e2e;
  cursor: pointer;
  position: relative;
}

.bar__player-progress-line {
  height: 100%;
  background: #7334ea;
  border-radius: 0 2px 2px 0;
  transition: width 0.1s ease;
}

.bar__player-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px;
  height: 73px;
}

.bar__player {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  min-width: 0;
}

/* ===== КНОПКИ ===== */
.player__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.player__btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #d9d9d9;
  transition: color 0.2s;
}

.player__btn:hover {
  color: #fff;
}

.player__btn.active {
  color: #7334ea;
}
.player__btn.active svg {
  stroke: #7334ea;
}
.player__btn-svg {
  display: block;
  width: auto;
  height: 20px; 
}

/* ===== ИНФОРМАЦИЯ О ТРЕКЕ ===== */
.player__track-play {
  flex: 1;
  min-width: 0;
}

.track-play__contain {
  display: flex;
  align-items: center;
  gap: 12px;
}

.track-play__image {
  width: 51px;
  height: 51px;
  background: #313131;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.track-play__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.track-play__svg {
  width: 18px;
  height: 17px;
  stroke: #4e4e4e;
}

.track-play__info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.track-play__title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.track-play__author {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-play__like-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #696969;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.track-play__like-btn:hover {
  color: #ff6b6b;
}

.track-play__like-btn .liked {
  color: #ff6b6b;
}

.track-play__album {
  font-size: 12px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== ГРОМКОСТЬ ===== */
.bar__volume-block {
  display: flex;
  align-items: center;
  
  flex-shrink: 0;
}

.volume__content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.volume__image {
  display: flex;
  align-items: center;
  color: #b3b3b3;
}

.volume__svg {
  stroke: currentColor;
}

.volume__progress {
  width: 110px;
}

.volume__progress-line {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #2e2e2e;
  border-radius: 2px;
  outline: none;
}

.volume__progress-line::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7334ea;
  cursor: pointer;
}

@media (max-width: 768px) {
  .bar__player-block {
    flex-wrap: wrap;
    height: auto;
    gap: 8px;
  }
  .bar__volume-block {
    padding-left: 0;
  }
}
</style>