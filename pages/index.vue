<template>
  <div class="wrapper">
    <div class="container">
      <div class="main">
        <Navbar />
        <div class="main__centerblock">
          <FilterControls
            @update:search="searchQuery = $event"
            @update:filter="filterBy = $event"
          />
          <Playlist
            :tracks="tracks"
            :search-query="searchQuery"
            :filter-by="filterBy"
            @select="selectTrack"
          />
        </div>
        <div class="main__sidebar">
          <div class="sidebar__personal">
            <span class="sidebar__personal-name">Войти</span>
            <div class="sidebar__icon"></div>
          </div>
          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img
                    src="/img/playlist/playlist01.png"
                    alt="Плейлист 1"
                    class="sidebar__img"
                  />
                </a>
              </div>
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img
                    src="/img/playlist/playlist02.png"
                    alt="Плейлист 2"
                    class="sidebar__img"
                  />
                </a>
              </div>
              <div class="sidebar__item">
                <a href="#" class="sidebar__link">
                  <img
                    src="/img/playlist/playlist03.png"
                    alt="Плейлист 3"
                    class="sidebar__img"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayerBar :current-track="currentTrack" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { tracks as allTracks } from "../data/tracks";

const tracks = ref(allTracks);
const searchQuery = ref("");
const filterBy = ref(null);
const currentTrack = ref(null);

const selectTrack = (track) => {
  currentTrack.value = track;
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
}

.container {
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
}

.main {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: calc(100vh - 73px);
  overflow: hidden;
}

.main__centerblock {
  width: auto;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
  overflow-y: auto;
}

.main__sidebar {
  max-width: 418px;
  padding: 20px 90px 20px 78px;
}

.sidebar__personal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
}

.sidebar__personal-name {
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__block {
  height: 100%;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.sidebar__item {
  width: 250px;
  height: 150px;
}

.sidebar__link {
  width: 100%;
  height: 100%;
  display: block;
}

.sidebar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .main__sidebar {
    padding: 20px 40px 20px 40px;
  }
  .sidebar__item {
    width: 200px;
    height: 120px;
  }
  .main__centerblock {
    padding: 20px 24px 20px 24px;
  }
}

@media (max-width: 768px) {
  .main__nav {
    width: 60px;
    padding: 20px 10px;
  }
  .nav__logo {
    width: 40px;
  }
  .logo__image {
    width: 40px;
  }
  .main__sidebar {
    display: none;
  }
  .main__centerblock {
    padding: 20px 16px;
  }
}
</style>