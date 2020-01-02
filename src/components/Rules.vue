<template>
  <div class="rules">
    <h3>Rules</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Rules extends Vue {
  private msg: string = 'Ok les règles';
}
</script>
