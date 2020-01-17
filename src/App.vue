<template>
  <div id="app">
    <router-view />
    <div>
      <button class="google-login">
        Login with Google
      </button>
    </div>
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
  grid-template: 1fr auto auto / 1fr;
  min-height: 100vh;
  color: white;
  background-color: $background-dark;
}

.google-login {
  padding: .5rem 1rem;
  margin: 2rem;
  border: none;
  border-radius: 1rem;
  outline: none;
  color: white;
  background-color: red;

  &:hover {
    filter: brightness(.7);
    box-shadow: 0 3px 10px black;
  }

  &:active {
    box-shadow: 0 1px 3px black;
  }
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
