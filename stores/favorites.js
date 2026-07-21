import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: []
  }),

  actions: {
    // Загружаем избранные из localStorage
    load() {
      const stored = localStorage.getItem('likedTracks')
      this.ids = stored ? JSON.parse(stored) : []
    },

    // Добавляем ID в избранное
    add(id) {
      if (!this.ids.includes(id)) {
        this.ids.push(id)
        this.save()
      }
    },

    // Удаляем ID из избранного
    remove(id) {
      this.ids = this.ids.filter(item => item !== id)
      this.save()
    },

    // Переключаем состояние (если есть – удаляем, если нет – добавляем)
    toggle(id) {
      if (this.ids.includes(id)) {
        this.remove(id)
      } else {
        this.add(id)
      }
    },

    // Сохраняем в localStorage
    save() {
      localStorage.setItem('likedTracks', JSON.stringify(this.ids))
    },

    // Проверка, избран ли трек
    isLiked(id) {
      return this.ids.includes(id)
    }
  }
})
