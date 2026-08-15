import { defineStore } from 'pinia'

export const useTracksStore = defineStore('tracks', {
  state: () => ({
    allTracks: [],
    loading: false,
    error: null,
    loaded: false,
    searchQuery: '', 
  }),

  actions: {
    async fetchTracks() {
      if (this.loaded) return  
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/')
        if (!response.ok) throw new Error('Не удалось загрузить треки')
        const data = await response.json()
        this.allTracks = data.data || []
        this.loaded = true
      } catch (err) {
        this.error = 'Сервер временно недоступен. Попробуйте позже.'
  console.error('Ошибка загрузки треков:', err)
      } finally {
        this.loading = false
      }
    },
    clearTracks() {
      this.allTracks = []
      this.loaded = false
    }
  },

  
  getters: {
    filteredTracks: (state) => {
      
      if (!state.searchQuery || !state.searchQuery.trim()) {
        return state.allTracks
      }

      const query = state.searchQuery.toLowerCase().trim()
      
      // Фильтруем по названию трека
      return state.allTracks.filter(track => 
        track.title?.toLowerCase().includes(query) || 
        track.name?.toLowerCase().includes(query)
      )
    }
  }
})