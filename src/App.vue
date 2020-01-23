<template>
  <div id="app">
    <router-view />
    <div>
      <button @click="logInOrOut"
              v-bind:class="[user ? 'logout' : 'google-login', retract ? 'retract' : '']" ref="buttonLogin"
      >
        <img v-if="!this.user" src="./assets/google.png" alt="Google logo" />
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
  private retract: boolean = false;

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
      if (user) {
        this.retract = true
        setTimeout(() => {
          this.$store.dispatch('setUser', user)
          this.retract = false
        }, 400)
      }
    })
  }

  logInOrOut () {
    if (this.user) {
      this.retract = true
      setTimeout(() => {
        this.firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.dispatch('removeUser')
          })
        this.retract = false
      }, 400)
      return
    }
    const provider = new this.firebase.auth.GoogleAuthProvider()
    if (isMobile) {
      this.firebase.auth().signInWithRedirect(provider)
    } else {
      this.firebase.auth().signInWithPopup(provider)
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

button {
  margin: 2rem;
  border: none;
  outline: none;
  transition: transform .4s ease;

  &:hover {
    filter: brightness(0.7);
    box-shadow: 0 3px 10px black;
  }

  &:active {
    box-shadow: 0 1px 3px black;
  }
}

.retract {
  transform: scale(0);
}

.google-login {
  padding: 0.8rem 0.95rem 0.65rem 0.9rem;
  border-radius: 50%;

  img {
    width: 50px;
  }
}

.logout {
  font-size: 1.4rem;
  border-radius: 2rem;
  padding: 0.8rem 1.2rem;
  color: black;
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
