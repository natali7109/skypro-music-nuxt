import { defineStore } from "pinia";
import { usePlayerStore } from "~/stores/player";
import { useFiltersStore } from "~/stores/filters";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          this.token = token;
          this.user = JSON.parse(user);
          this.isAuthenticated = true;
        }
      }
    },

    login(token, user) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;

      if (process.client) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;

      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      const playerStore = usePlayerStore();
      playerStore.resetPlayer();

      const filtersStore = useFiltersStore();
      filtersStore.resetFilters();
    },

    setUser(user) {
      this.user = user;
      if (process.client) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
  },
});
