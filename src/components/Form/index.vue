<template>
  <div class="form">
    <h2>Form</h2>
    <form @submit="checkForm">
      <div class="inputs">
        <div class="form-group">
          <input
            id="username"
            type="text"
            v-model="username"
            name="username"
            placeholder="Username"
          />
          <label for="username">Username</label>
        </div>

        <div class="form-group">
          <input
            id="password"
            type="text"
            v-model="password"
            name="password"
            placeholder="Password"
          />
          <label for="password">Password</label>
        </div>

        <p>
          <input type="submit" value="Submit" />
        </p>
      </div>

      <div class="rules">
        <div v-if="errors.length">
          <b>Please correct the following error{{errors.length > 1 ? 's' : ''}}:</b>
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
@import "@/variables.scss";

.form {
  display: grid;
  grid-template: auto 1fr / 1fr;

  form {
    display: grid;
    grid-template: 1fr / 1fr 1fr;

    & > div {
      margin: 0 10%;
    }

    .inputs {
      overflow: hidden;
      grid-area: 1 / 1;

      & > div {
        display: flex;
        justify-content: space-between;
      }
    }

    .rules {
      text-align: left;
    }

    .success,
    .rules {
      grid-area: 1 / 2;
    }

    .form-group {
      position: relative;
      padding: 15px 0 0;
      margin-top: 10px;
      width: 100%;

      input {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid $gray;
        outline: 0;
        font-size: 1rem;
        color: $white;
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;

        &::placeholder {
          color: transparent;
        }

        &:placeholder-shown ~ label {
          font-size: 1rem;
          cursor: text;
          top: 20px;
        }

        &:focus {
          ~ label {
            position: absolute;
            top: 6px;
            display: block;
            transition: 0.2s;
            font-size: .6rem;
            color: $primary;
          }
          padding-bottom: 6px;
          border-bottom: 2px solid teal;
          border-width: 3px;
          border-image: linear-gradient(to right, $primary, $secondary);
          border-image-slice: 1;
        }
      }

      label {
        position: absolute;
        top: 6px;
        display: block;
        transition: 0.2s;
        font-size: .6rem;
        color: $gray;
      }
    }
  }
}
</style>
