<template>
  <div class="form">
    <h2>Form</h2>
    <form @submit="checkForm">
      <div class="inputs">
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" v-model="username" name="username" />
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" type="text" v-model="password" name="password" />
        </div>

        <p>
          <input type="submit" value="Submit" />
        </p>
      </div>

      <div class="rules">
        <div v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error.id">{{error}}</li>
          </ul>
        </div>
      </div>

      <b class="success" v-if="success">Success!</b>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

class Validation {
  constructor (
    public valid: boolean,
    public rule: number,
    public error: string
  ) {
    this.valid = valid
    this.rule = rule
    this.error = error
  }
}

@Component({})
export default class Form extends Vue {
  private errors: Array<string> = [];
  private username: string = '';
  private password: string = '';
  private success: boolean = false;

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
    this.success = true
    return { valid: true, rule: 0, error: '' }
  }
}
</script>

<style lang="scss">
.form {
  display: grid;
  grid-template: auto 1fr / 1fr;

  form {
    display: grid;
    grid-template: 1fr auto 4fr / repeat(6, 1fr);
    grid-gap: 0 3em;

    .inputs {
      grid-area: 2 / 2;

      & > div {
        display: flex;
        justify-content: space-between;
        padding: .3em;
      }
    }

    .rules {
      grid-area: 2 / 4 / span 1 / span 2;
      text-align: left;
    }

    .success {
      grid-area: 2 / 4 / span 1 / span 2;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }
  }
}
</style>
