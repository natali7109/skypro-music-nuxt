import { ref, computed } from "vue";

export const useFilters = (tracks) => {
  const activeFilter = ref(null);
  const selectedAuthors = ref([]);
  const selectedGenres = ref([]);
  const selectedYears = ref([]);

  const toggleFilter = (filter) => {
    activeFilter.value = activeFilter.value === filter ? null : filter;
  };

  const authorItems = computed(() => {
    if (!tracks.value || !tracks.value.length) return [];
    const items = new Set();
    tracks.value.forEach((track) => {
      if (track.author) {
        items.add(track.author);
      }
    });
    return Array.from(items).sort((a, b) => {
      if (a === "Неизвестно") return 1;
      if (b === "Неизвестно") return -1;
      return a.localeCompare(b);
    });
  });

  const yearItems = computed(() => {
    if (!tracks.value || !tracks.value.length) return [];
    const items = new Set();
    tracks.value.forEach((track) => {
      const year = track.release_date?.split("-")[0] || "Неизвестно";
      items.add(year);
    });
    return Array.from(items).sort((a, b) => {
      if (a === "Неизвестно") return 1;
      if (b === "Неизвестно") return -1;
      return b.localeCompare(a);
    });
  });

  const genreItems = computed(() => {
    if (!tracks.value || !tracks.value.length) return [];
    const items = new Set();
    tracks.value.forEach((track) => {
      if (Array.isArray(track.genre)) {
        track.genre.forEach((g) => g && items.add(g.toLowerCase().trim()));
      } else if (track.genre) {
        items.add(track.genre.toLowerCase().trim());
      }
    });
    return Array.from(items).sort((a, b) => {
      if (a === "неизвестно") return 1;
      if (b === "неизвестно") return -1;
      return a.localeCompare(b);
    });
  });

  // Проверка, выбран ли автор
  const isAuthorSelected = (author) => selectedAuthors.value.includes(author);
  const toggleAuthor = (author) => {
    const index = selectedAuthors.value.indexOf(author);
    if (index > -1) {
      selectedAuthors.value.splice(index, 1);
    } else {
      selectedAuthors.value.push(author);
    }
  };

  // Проверка, выбран ли жанр
  const isGenreSelected = (genre) => selectedGenres.value.includes(genre);
  const toggleGenre = (genre) => {
    const index = selectedGenres.value.indexOf(genre);
    if (index > -1) {
      selectedGenres.value.splice(index, 1);
    } else {
      selectedGenres.value.push(genre);
    }
  };

  return {
    activeFilter,
    toggleFilter,
    authorItems,
    yearItems,
    genreItems,
    selectedAuthors,
    selectedGenres,
    selectedYears,
    isAuthorSelected,
    toggleAuthor,
    isGenreSelected,
    toggleGenre,
  };
};