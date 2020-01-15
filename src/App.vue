<template>
  <div id="app">
    <router-view />
    <nav>
      <router-link to="/">Game</router-link>
      <router-link to="/highscores">Highscores</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>

<style lang="scss">
@import "@/variables.scss";

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: grid;
  grid-template: 1fr auto / 1fr;
  min-height: 100vh;
  color: white;
  background-color: $background-dark;
}

nav {
  background-color: $background;
  display: flex;
  justify-content: space-around;

  a {
    flex: 1 1 auto;
    padding: 1em;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    text-decoration: none;

    &:hover {
      background-color: $background-light;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  @media screen and (max-width: $break-large) {
    a {
      padding: 0.5em;
    }
  }
}
</style>
