<template>
  <div>
    <div v-if="!tracks || !tracks.length" class="empty">
      Нет треков
    </div>

    <div v-else>
      <div class="playlist__header">
        <span class="col-track">ТРЕК</span>
        <span class="col-artist">ИСПОЛНИТЕЛЬ</span>
        <span class="col-album">АЛЬБОМ</span>
        <span class="col-time">
  <img src="/img/icon/watch.svg" alt="Длительность" class="col-time-icon" />
</span>
      </div>

      <div class="playlist__list">
        <Track
          v-for="track in filteredTracks"
          :key="track._id"
          :track="track"
          @select="$emit('select', track)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Track from './Track.vue'

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
    default: () => []
  },
  searchQuery: {
    type: String,
    default: ''
  },
  sortBy: {
    type: String,
    default: 'default'
  },
  selectedAuthors: {
    type: Array,
    default: () => []
  },
  selectedGenres: {
    type: Array,
    default: () => []
  },
  selectedYears: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select'])

const filteredTracks = computed(() => {
  let list = [...props.tracks]

  // Поиск
  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase()
    list = list.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.author?.toLowerCase().includes(q)
    )
  }

  // Фильтр по авторам
  if (props.selectedAuthors.length) {
    list = list.filter(t => props.selectedAuthors.includes(t.author))
  }

  // Фильтр по жанрам
  if (props.selectedGenres.length) {
    list = list.filter(t => {
      if (Array.isArray(t.genre)) {
        return t.genre.some(g => props.selectedGenres.includes(g.toLowerCase()))
      }
      return props.selectedGenres.includes(t.genre?.toLowerCase())
    })
  }

  // Фильтр по годам
  if (props.selectedYears.length) {
    list = list.filter(t => {
      const year = t.release_date?.split('-')[0]
      return props.selectedYears.includes(year)
    })
  }

  // Сортировка
  if (props.sortBy === 'newest') {
    list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
  } else if (props.sortBy === 'oldest') {
    list.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
  }

  return list
})
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

.skeleton {
  color: #888;
  padding: 20px;
}
.error {
  color: #ff6b6b;
  padding: 20px;
}
.empty {
  color: #888;
  padding: 20px;
  text-align: center;
}
</style>