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

<script lang="ts" src="./form.ts"></script>

<style lang="scss" src="./form.scss"></style>
