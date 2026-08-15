import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: []
  }),

  actions: {
     
    load() {
      const stored = localStorage.getItem('likedTracks')
      this.ids = stored ? JSON.parse(stored) : []
    },

     
    add(id) {
      if (!this.ids.includes(id)) {
        this.ids.push(id)
        this.save()
      }
    },

     
    remove(id) {
      this.ids = this.ids.filter(item => item !== id)
      this.save()
    },

     
    toggle(id) {
      if (this.ids.includes(id)) {
        this.remove(id)
      } else {
        this.add(id)
      }
    },

     
    save() {
      localStorage.setItem('likedTracks', JSON.stringify(this.ids))
    },

     
    isLiked(id) {
      return this.ids.includes(id)
    }
  }
})
