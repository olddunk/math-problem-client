<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" /> -->
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/about">關於</router-link> |
      <router-link to="/online_math">線上測驗</router-link> |
      <router-link to="/math_database">題庫維護</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
