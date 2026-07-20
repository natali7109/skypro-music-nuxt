import { ref, watch } from 'vue'

const likedIds = ref([])

export const useFavorites = () => {
  const load = () => {
    likedIds.value = JSON.parse(localStorage.getItem('likedTracks') || '[]')
  }

  const toggle = (id) => {
    const index = likedIds.value.indexOf(id)
    if (index > -1) {
      likedIds.value.splice(index, 1)
    } else {
      likedIds.value.push(id)
    }
    localStorage.setItem('likedTracks', JSON.stringify(likedIds.value))
  }

  const isLiked = (id) => likedIds.value.includes(id)

  // Загружаем при инициализации
  load()

  return { likedIds, toggle, isLiked, load }
}