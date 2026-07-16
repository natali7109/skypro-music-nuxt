<template>
  <div class="playlist__item" @click="$emit('select', track)">
    <div class="playlist__track">
      <div class="track__title">
        <div class="track__cover-wrapper">
          <img 
            v-if="track.logo && typeof track.logo === 'string'" 
            :src="track.logo" 
            alt="Обложка" 
            class="track__cover" 
          />
          <div v-else class="track__cover-placeholder">🎵</div>
        </div>
        <span class="track__title-link">{{ track.name }}</span>
      </div>
      <div class="track__author">
        <span class="track__author-link">{{ track.author }}</span>
      </div>
      <div class="track__time">
        <span class="track__time-text">{{ formatDuration(track.duration_in_seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  track: {
    type: Object,
    required: true,
  },
});

defineEmits(["select"]);

const formatDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
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
  gap: 12px;
  width: 447px;
}

.track__cover-wrapper {
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

.track__cover-placeholder {
  font-size: 20px;
}

.track__title-link {
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
}

.track__author {
  width: 321px;
}

.track__author-link {
  font-size: 16px;
  color: #b3b3b3;
  text-decoration: none;
}

.track__time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.track__time-svg {
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
}

.track__time-text {
  font-size: 16px;
  color: #696969;
}
</style>
