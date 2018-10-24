<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="login">Login</router-link> |
      <router-link to="/">Todos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 10px;
  }

  #nav {
    margin-bottom: 10px;
    text-align: right;
  }
</style>
