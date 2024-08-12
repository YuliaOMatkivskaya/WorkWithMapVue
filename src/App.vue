<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div>

      <nav>
        <RouterLink to="/">Карта</RouterLink>
        <RouterLink to="/table">Таблица объектов</RouterLink>
        <RouterLink to="/statistic">Статистика</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

a {
  text-decoration: none;
  color: #30596b;
  transition: 0.4s;
  padding: 3px;
  font-size: 18px;
}

@media (hover: hover) {
  a:hover {
    background-color: #91b0bd;
  }
}

.router-link-exact-active {
  text-decoration: underline ;
}
</style>
