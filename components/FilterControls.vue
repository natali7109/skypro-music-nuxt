<template>
  <div class="filter__row">
    <span class="filter__title">Искать по:</span>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: activeFilter === 'author' }" @click="toggleFilter('author')">
        исполнителю
        <span v-if="selectedAuthors.length" class="badge">{{ selectedAuthors.length }}</span>
      </button>
      <div v-if="activeFilter === 'author'" class="filter__dropdown">
        <div v-for="item in authorItems" :key="item" class="filter__item" :class="{ selected: selectedAuthors.includes(item) }" @click="toggleAuthor(item)">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: activeFilter === 'year' }" @click="toggleFilter('year')">
        году выпуска
        <span v-if="selectedYears.length" class="badge">{{ selectedYears.length }}</span>
      </button>
      <div v-if="activeFilter === 'year'" class="filter__dropdown">
        <div v-for="item in yearItems" :key="item" class="filter__item" :class="{ selected: selectedYears.includes(item) }" @click="toggleYear(item)">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: activeFilter === 'genre' }" @click="toggleFilter('genre')">
        жанру
        <span v-if="selectedGenres.length" class="badge">{{ selectedGenres.length }}</span>
      </button>
      <div v-if="activeFilter === 'genre'" class="filter__dropdown">
        <div v-for="item in genreItems" :key="item" class="filter__item" :class="{ selected: selectedGenres.includes(item) }" @click="toggleGenre(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTracks } from '@/composables/useTracks'

const { tracks } = useTracks()

const activeFilter = ref(null)
const selectedAuthors = ref([])
const selectedGenres = ref([])
const selectedYears = ref([])

const toggleFilter = (filter) => {
  activeFilter.value = activeFilter.value === filter ? null : filter
}

const authorItems = computed(() => {
  const set = new Set()
  tracks.value.forEach(t => t.author && set.add(t.author))
  return Array.from(set).sort()
})

const yearItems = computed(() => {
  const set = new Set()
  tracks.value.forEach(t => {
    const year = t.release_date?.split('-')[0]
    if (year) set.add(year)
  })
  return Array.from(set).sort((a, b) => b - a)
})

const genreItems = computed(() => {
  const set = new Set()
  tracks.value.forEach(t => {
    if (Array.isArray(t.genre)) t.genre.forEach(g => set.add(g.toLowerCase()))
    else if (t.genre) set.add(t.genre.toLowerCase())
  })
  return Array.from(set).sort()
})

const toggleAuthor = (item) => {
  const idx = selectedAuthors.value.indexOf(item)
  idx > -1 ? selectedAuthors.value.splice(idx, 1) : selectedAuthors.value.push(item)
}
const toggleGenre = (item) => {
  const idx = selectedGenres.value.indexOf(item)
  idx > -1 ? selectedGenres.value.splice(idx, 1) : selectedGenres.value.push(item)
}
const toggleYear = (item) => {
  const idx = selectedYears.value.indexOf(item)
  idx > -1 ? selectedYears.value.splice(idx, 1) : selectedYears.value.push(item)
}
</script>

<style scoped>
.filter__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.filter__title {
  color: #fff;
  font-size: 16px;
}

.filter__wrapper {
  position: relative;
}

.filter__btn {
  padding: 6px 18px;
  border: 1px solid #555;
  border-radius: 20px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.filter__btn:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
}
.filter__btn.active {
  border-color: #ad61ff;
  color: #ad61ff;
}

.badge {
  background: #7334ea;
  border-radius: 50%;
  padding: 1px 8px;
  font-size: 11px;
  color: #fff;
  margin-left: 4px;
}

.filter__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  min-width: 160px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.filter__item {
  padding: 6px 14px;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
}
.filter__item:hover {
  background: #3a3a3a;
}
.filter__item.selected {
  background: #7334ea;
}
</style>
