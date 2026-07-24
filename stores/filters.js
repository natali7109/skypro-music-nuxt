import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    searchQuery: '',
    selectedAuthors: [],
    selectedGenres: [],
    selectedYears: [],
    sortBy: 'default',
    activeFilter: null,
    allTracks: []  
  }),

  actions: {
    setSearch(query) {
      this.searchQuery = query
    },
    setAllTracks(tracks) {
      this.allTracks = tracks
    },
    toggleAuthor(author) {
      const idx = this.selectedAuthors.indexOf(author)
      if (idx > -1) this.selectedAuthors.splice(idx, 1)
      else this.selectedAuthors.push(author)
    },
    toggleGenre(genre) {
      const idx = this.selectedGenres.indexOf(genre)
      if (idx > -1) this.selectedGenres.splice(idx, 1)
      else this.selectedGenres.push(genre)
    },
    toggleYear(year) {
      const idx = this.selectedYears.indexOf(year)
      if (idx > -1) this.selectedYears.splice(idx, 1)
      else this.selectedYears.push(year)
    },
    setSort(sort) {
      this.sortBy = sort
    },
    setActiveFilter(filter) {
      this.activeFilter = this.activeFilter === filter ? null : filter
    },
    resetFilters() {
      this.searchQuery = ''
      this.selectedAuthors = []
      this.selectedGenres = []
      this.selectedYears = []
      this.sortBy = 'default'
      this.activeFilter = null
    }
  },

  getters: {
     
    authorItems: (state) => {
      const set = new Set()
      state.allTracks.forEach(t => t.author && set.add(t.author))
      return Array.from(set).sort()
    },
    yearItems: (state) => {
      const set = new Set()
      state.allTracks.forEach(t => {
        const year = t.release_date?.split('-')[0]
        if (year) set.add(year)
      })
      return Array.from(set).sort((a, b) => b - a)
    },
    genreItems: (state) => {
      const set = new Set()
      state.allTracks.forEach(t => {
        if (Array.isArray(t.genre)) t.genre.forEach(g => set.add(g.toLowerCase()))
        else if (t.genre) set.add(t.genre.toLowerCase())
      })
      return Array.from(set).sort()
    }
  }
})
