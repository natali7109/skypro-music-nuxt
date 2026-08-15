import { defineStore } from 'pinia'

export const useSelectionsStore = defineStore('selections', {
  state: () => ({
    selections: [],
    currentSelection: null,
    loading: false,
    error: null,
  }),

  actions: {
    // Загружаем все подборки
    async fetchAllSelections() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/all/')
        if (!response.ok) throw new Error('Не удалось загрузить подборки')
        const data = await response.json()
        // Сохраняем только те, у которых есть треки
        this.selections = data.data?.filter(sel => sel.items?.length > 0) || []
        return this.selections
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Загружаем конкретную подборку по ID
    async fetchSelectionById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}/`)
        if (!response.ok) throw new Error('Не удалось загрузить подборку')
        const data = await response.json()
        this.currentSelection = data.data || null
        return this.currentSelection
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Получить подборку по ID из уже загруженного списка
    getSelectionById(id) {
      return this.selections.find(sel => sel._id === Number(id)) || null
    },
  },
})