import { defineStore } from 'pinia'
import { usePlayerStore } from '~/stores/player'
import { useFiltersStore } from '~/stores/filters' // ★ ДОБАВИТЬ ★

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    // Инициализация из localStorage при загрузке приложения
    initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true
        }
      }
    },

    // Вход — сохраняем данные
    login(token, user) {
      this.token = token
      this.user = user
      this.isAuthenticated = true

      if (process.client) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },

    // ★ ИСПРАВЛЕННЫЙ ВЫХОД ★
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }

      // ★ СБРАСЫВАЕМ ПЛЕЕР ★
      const playerStore = usePlayerStore()
      playerStore.resetPlayer()

      // ★ СБРАСЫВАЕМ ФИЛЬТРЫ ★
      const filtersStore = useFiltersStore()
      filtersStore.resetFilters()

      // ★ НЕ ТРОГАЕМ ЛАЙКИ (они остаются в localStorage) ★
    },

    // Обновление данных пользователя (если понадобится)
    setUser(user) {
      this.user = user
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
  },
})
