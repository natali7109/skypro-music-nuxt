import { defineStore } from 'pinia'

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

    // Выход — очищаем всё
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
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