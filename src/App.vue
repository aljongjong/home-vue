<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/board" class="nav-link">Board</router-link>
        </li>
        <li class="nav-item">
          <!-- <router-link to="/board2" class="nav-link">Board2</router-link> -->
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
a.router-link-exact-active {
  color: red;
}
</style>
