<template>
  <div id="app">
    <router-view />
    <div>
      <button @click="login" class="google-login">
        <img v-if="!this.user" src="./assets/google.png" alt="Google logo">
        {{ this.user ? this.user.displayName : '' }}
      </button>
    </div>
    <nav>
      <router-link to="/">Game</router-link>
      <router-link to="/highscores">Highscores</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { isMobile } from 'mobile-device-detect'

@Component
export default class App extends Vue {
  get user () {
    return this.$store.state.user
  }
  get firebase () {
    return this.$store.state.firebase
  }

  mounted () {
    const firebaseConfig = {
      apiKey: 'AIzaSyDcEqFaxz969Ve5inMbfRI7qodcZPD6hVo',
      authDomain: 'form-79a24.firebaseapp.com',
      databaseURL: 'https://form-79a24.firebaseio.com',
      projectId: 'form-79a24',
      storageBucket: 'form-79a24.appspot.com',
      messagingSenderId: '201666686554',
      appId: '1:201666686554:web:2f1a246b66c4e9104ab263',
      measurementId: 'G-PHD843ZHNF'
    }

    firebase.initializeApp(firebaseConfig)

    this.$store.dispatch('setFirebase', firebase)

    this.firebase.auth().onAuthStateChanged((user: any) => {
      this.$store.dispatch('setUser', user)
    })
  }

  login () {
    if (!this.$store.state.user) {
      const provider = new firebase.auth.GoogleAuthProvider()

      if (isMobile) {
        this.firebase.auth().signInWithRedirect(provider)
      } else {
        this.firebase.auth().signInWithPopup(provider)
      }
    } else {
      this.firebase.auth().signOut().then(() => {
        this.$store.dispatch('removeUser')
      })
    }
  }
}
</script>

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
  padding: .8rem 1rem;
  margin: 2rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 6rem;
  outline: none;
  color: black;

  img {
    width: 50px;
  }

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
