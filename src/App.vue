<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">내홈피</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/board" class="nav-link">게시판</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style scoped>
</style>
