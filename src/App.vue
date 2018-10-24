<template>
  <div id="app" class="container">
    <div id="nav">
      <span v-if="Auth.user" class="greeting-message">Hello, {{ Auth.user.name }}!</span>
      <b-button
        v-if="Auth.user"
        @click="logout"
        variant="primary"
        size="sm"
        class="logout-btn"
      >Logout</b-button>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import Auth from './services/Auth'

  export default {
    name: 'App',
    data() {
      return {
        Auth
      };
    },

    methods: {
      logout () {
        Auth.logout();
      }
    }
  }
</script>
<style>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 10px;
  }

  #nav {
    margin-bottom: 10px;
    text-align: right;
  }

  .greeting-message {
    margin-right: 0.5rem;
  }

  .logout-btn {
    width: 70px;
  }
</style>
