import { defineStore } from 'pinia'

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    allTracks: [],
    loading: false,
    error: null,
    loaded: false,
  }),

  actions: {
    async fetchTracks() {
      if (this.loaded) return // уже загружены
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/')
        if (!response.ok) throw new Error('Не удалось загрузить треки')
        const data = await response.json()
        this.allTracks = data.data || []
        this.loaded = true
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    clearTracks() {
      this.allTracks = []
      this.loaded = false
    }
  }
})