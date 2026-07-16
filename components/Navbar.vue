<template>
  <nav class="main__nav">
    <div class="nav__logo">
      <img src="/logo.png" alt="Skypro.Music" class="logo__image"/>
    </div>
    <div class="nav__burger">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>
    <div class="nav__menu">
      <ul class="menu__list">
        <li class="menu__item">
          <a href="#" class="menu__link">Главное</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Мой плейлист</a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">Войти</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.main__nav {
  width: 244px;
  background-color: #181818;
  padding: 20px 0 20px 36px;
}

.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0;
  margin-bottom: 20px;
}

.logo__image {
  width: 113.33px;
  height: 17px;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}

.menu__list {
  padding: 18px 0 10px 0;
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}

.menu__link:hover {
  color: #d9b6ff;
}
</style>
