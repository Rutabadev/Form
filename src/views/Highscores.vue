<template>
  <div class="highscores">
    <h1>Highscores</h1>
    <HighscoresTable></HighscoresTable>
  </div>
</template>

<script>
import HighscoresTable from '@/components/HighscoresTable.vue'

export default {
  name: 'highscores',
  components: {
    HighscoresTable
  }
}
</script>

<style lang="scss">
  .highscores {
    display: grid;
    grid-template: auto 1fr / 1fr
  }
</style>
