<template>
  <div>
    <div class="playlist__header">
      <span class="col-track">ТРЕК</span>
      <span class="col-artist">ИСПОЛНИТЕЛЬ</span>
      <span class="col-album">АЛЬБОМ</span>
      <span class="col-time">⏱️</span>
    </div>

    <div v-if="loading" class="skeleton">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="playlist__list">
      <div
        v-for="track in filtered"
        :key="track._id"
        class="playlist__track"
        @click="$emit('select', track)"
      >
        <span class="col-track">{{ track.name }}</span>
        <span class="col-artist">{{ track.author }}</span>
        <span class="col-album">{{ track.album || '—' }}</span>
        <span class="col-time">{{ formatDuration(track.duration_in_seconds) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTracks } from '@/composables/useTracks'

const props = defineProps({
  searchQuery: String,
  sortBy: String
})

const { tracks, loading, error, fetchTracks } = useTracks()

const filtered = computed(() => {
  let list = [...tracks.value]

  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase()
    list = list.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.author?.toLowerCase().includes(q)
    )
  }

  if (props.sortBy === 'newest') {
    list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
  } else if (props.sortBy === 'oldest') {
    list.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
  }

  return list
})

const formatDuration = (s) => {
  if (!s) return '0:00'
  const m = Math.floor(s / 60)
  const sec = String(Math.floor(s % 60)).padStart(2, '0')
  return `${m}:${sec}`
}

onMounted(fetchTracks)
</script>

<style scoped>
.playlist__header {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #4e4e4e;
  color: #696969;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.col-track { width: 30%; }
.col-artist { width: 30%; }
.col-album { width: 30%; }
.col-time { width: 10%; text-align: right; }

.playlist__track {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #2a2a2a;
  cursor: pointer;
  transition: 0.2s;
}
.playlist__track:hover {
  background: #1f1f1f;
}

.skeleton {
  color: #888;
  padding: 20px;
}
.error {
  color: #ff6b6b;
  padding: 20px;
}
</style>