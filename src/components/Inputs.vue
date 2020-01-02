<template>
  <div class="inputs">
    <h3>Inputs</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Inputs extends Vue {
  private msg: string = 'Ok les inputs';
}
</script>
