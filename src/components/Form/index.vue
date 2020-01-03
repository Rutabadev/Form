<template>
  <div class="form">
    <h2>Form</h2>
    <form id="form" @submit="checkForm">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error.id">{{error}}</li>
        </ul>
      </p>

      <p>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username" name="username" />
      </p>

      <p>
        <label for="password">Password</label>
        <input id="password" type="text" v-model="password" name="password" />
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

class Validation {
  constructor (public valid: boolean) {
    this.valid = valid
  }
}

@Component({})
export default class Form extends Vue {
  private errors: Array<string> = [];
  private username: string = '';
  private password: string = '';

  checkForm (event: Event) {
    event.preventDefault()

    this.errors = []

    if (!this.username) {
      this.errors.push('Username required')
    }

    if (!this.password) {
      this.errors.push('Password required')
    } else {
      let validation = this.validatePassword(this.password)
      if (!validation.valid) {
        this.errors.push(validation.error)
      }
    }
  }

  validatePassword (pwd: string): Validation {
    if (pwd[0] !== '7') {
      return { valid: false, rule: 0, error: 'First character must be 7' }
    }
    return { valid: true }
  }
}
</script>

<style lang="scss">
  .form {
    ul {
      list-style-type: none;
    }
  }
</style>
