<template>
  <div class="filter__row">
    <span class="filter__title">Искать по:</span>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: filterStore.activeFilter === 'author' }" @click="filterStore.setActiveFilter('author')">
        исполнителю
        <span v-if="filterStore.selectedAuthors.length" class="badge">{{ filterStore.selectedAuthors.length }}</span>
      </button>
      <div v-if="filterStore.activeFilter === 'author'" class="filter__dropdown">
        <div v-for="item in filterStore.authorItems" :key="item" class="filter__item" :class="{ selected: filterStore.selectedAuthors.includes(item) }" @click="filterStore.toggleAuthor(item)">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: filterStore.activeFilter === 'year' }" @click="filterStore.setActiveFilter('year')">
        году выпуска
        <span v-if="filterStore.selectedYears.length" class="badge">{{ filterStore.selectedYears.length }}</span>
      </button>
      <div v-if="filterStore.activeFilter === 'year'" class="filter__dropdown">
        <div v-for="item in filterStore.yearItems" :key="item" class="filter__item" :class="{ selected: filterStore.selectedYears.includes(item) }" @click="filterStore.toggleYear(item)">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="filter__wrapper">
      <button class="filter__btn" :class="{ active: filterStore.activeFilter === 'genre' }" @click="filterStore.setActiveFilter('genre')">
        жанру
        <span v-if="filterStore.selectedGenres.length" class="badge">{{ filterStore.selectedGenres.length }}</span>
      </button>
      <div v-if="filterStore.activeFilter === 'genre'" class="filter__dropdown">
        <div v-for="item in filterStore.genreItems" :key="item" class="filter__item" :class="{ selected: filterStore.selectedGenres.includes(item) }" @click="filterStore.toggleGenre(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from '~/stores/filters'

const filterStore = useFiltersStore()
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
