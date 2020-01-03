<template>
  <div class="game">
    <h1>Game</h1>
    <Form></Form>
  </div>
</template>

<script>
import Form from '@/components/Form'

export default {
  name: 'game',
  components: {
    Form
  }
}
</script>

<style lang="scss">
  .game {
    display: grid;
    grid-template: auto 1fr / 1fr
  }
</style>
