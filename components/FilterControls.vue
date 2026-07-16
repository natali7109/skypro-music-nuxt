<template>
  <div class="centerblock__search">
    <svg class="search__svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M12.5 12.5L16 16M2 7.5C2 10.5376 4.46243 13 7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5Z" stroke="white" stroke-width="2"/>
    </svg>
    <input
      type="text"
      class="search__text"
      placeholder="Поиск"
      v-model="searchQuery"
    />
  </div>
  <div class="centerblock__filter">
    <span class="filter__title">Искать по:</span>
    <button class="filter__button" :class="{ active: activeFilter === 'artist' }" @click="setFilter('artist')">Исполнителю</button>
    <button class="filter__button" :class="{ active: activeFilter === 'year' }" @click="setFilter('year')">Году выпуска</button>
    <button class="filter__button" :class="{ active: activeFilter === 'title' }" @click="setFilter('title')">Названию</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const activeFilter = ref(null)

const emit = defineEmits(['update:search', 'update:filter'])

watch(searchQuery, (value) => {
  emit('update:search', value)
})

const setFilter = (filter) => {
  activeFilter.value = activeFilter.value === filter ? null : filter
  emit('update:filter', activeFilter.value)
}
</script>

<style scoped>
.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: flex;
  align-items: center;
}

.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}

.search__text {
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.search__text::placeholder {
  color: #ffffff;
}

.centerblock__filter {
  display: flex;
  align-items: center;
  margin-bottom: 51px;
  flex-wrap: wrap;
  gap: 10px;
}

.filter__title {
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
  color: #ffffff;
}

.filter__button {
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.filter__button:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
}

.filter__button.active {
  border-color: #ad61ff;
  color: #ad61ff;
}
</style>