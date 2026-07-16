<template>
  <div class="bar">
    <div class="bar__content">
      <div class="bar__player-progress">
        <div class="bar__player-progress-line" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="bar__player-block">
        <div class="bar__player">
          <div class="player__controls">
            <button class="player__btn-prev _btn-icon">
              <svg class="player__btn-prev-svg" width="15" height="14" viewBox="0 0 15 14">
                <path d="M13 12L3 7L13 2V12Z" stroke="#D9D9D9" stroke-width="2"/>
                <path d="M2 2V12" stroke="#D9D9D9" stroke-width="2"/>
              </svg>
            </button>
            <button class="player__btn-play _btn-icon" @click="togglePlay">
              <svg class="player__btn-play-svg" width="22" height="20" viewBox="0 0 22 20">
                <path v-if="!isPlaying" d="M0 0L22 10L0 20V0Z" fill="#D9D9D9"/>
                <rect v-else x="0" y="0" width="7" height="20" fill="#D9D9D9"/>
                <rect x="14" y="0" width="7" height="20" fill="#D9D9D9"/>
              </svg>
            </button>
            <button class="player__btn-next _btn-icon">
              <svg class="player__btn-next-svg" width="15" height="14" viewBox="0 0 15 14">
                <path d="M2 12L12 7L2 2V12Z" stroke="#D9D9D9" stroke-width="2"/>
                <path d="M13 2V12" stroke="#D9D9D9" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <div class="player__track-play">
            <div class="track-play__contain">
              <div class="track-play__image">
                <svg class="track-play__svg" width="18" height="17" viewBox="0 0 18 17">
                  <path d="M8 2L8 15M12 4L12 13M4 6L4 11M16 6L16 11" stroke="#4e4e4e" stroke-width="2"/>
                </svg>
              </div>
              <div class="track-play__author">
                <span class="track-play__author-link">{{ currentTrack?.artist || 'Не выбрано' }}</span>
              </div>
              <div class="track-play__album">
                <span class="track-play__album-link">{{ currentTrack?.title || 'Выберите трек' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bar__volume-block">
          <div class="volume__content">
            <div class="volume__image">
              <svg class="volume__svg" width="13" height="18" viewBox="0 0 13 18">
                <path d="M0 6H3L8 1V17L3 12H0V6Z" stroke="white" stroke-width="2"/>
                <path d="M10 5C10.5 5.5 11 6.5 11 9C11 11.5 10.5 12.5 10 13" stroke="white" stroke-width="2"/>
              </svg>
            </div>
            <div class="volume__progress">
              <div class="volume__progress-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPlaying = ref(false)
const progress = ref(30)

const currentTrack = ref(null)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.8);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.bar__content {
  display: flex;
  flex-direction: column;
}

.bar__player-progress {
  width: 100%;
  height: 5px;
  background: #2e2e2e;
  position: relative;
}

.bar__player-progress-line {
  height: 100%;
  background: #7334EA;
  border-radius: 0 3px 3px 0;
  transition: width 0.3s ease;
}

.bar__player-block {
  height: 73px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
}

.bar__player {
  display: flex;
  align-items: center;
  gap: 24px;
}

.player__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.player__btn-prev,
.player__btn-play,
.player__btn-next {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
}

.player__btn-prev-svg {
  width: 15px;
  height: 14px;
}

.player__btn-play-svg {
  width: 22px;
  height: 20px;
}

.player__btn-next-svg {
  width: 15px;
  height: 14px;
}

._btn-icon:hover svg {
  stroke: #acacac;
}

.track-play__contain {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image author" "image album";
  align-items: center;
  gap: 0 12px;
}

.track-play__image {
  width: 51px;
  height: 51px;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  grid-area: image;
}

.track-play__svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track-play__author {
  grid-area: author;
}

.track-play__author-link {
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
}

.track-play__album {
  grid-area: album;
}

.track-play__album-link {
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
}

.bar__volume-block {
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
}

.volume__content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.volume__image {
  width: 13px;
  height: 18px;
}

.volume__svg {
  width: 13px;
  height: 18px;
  fill: transparent;
}

.volume__progress {
  width: 109px;
  height: 5px;
  background: #2e2e2e;
  border-radius: 3px;
}

.volume__progress-line {
  width: 60%;
  height: 100%;
  background: #7334EA;
  border-radius: 3px;
}
</style>