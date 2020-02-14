<template>
  <div class="highscores-table">
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="highscore in highscores" :key="highscore.id">
          <td>{{ highscore.user.displayName }}</td>
          <td>{{ highscore.time | time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  filters: {
    time: function (value: number) {
      if (!value) return '0s'
      let seconds = Math.round(value / 1000)
      if (seconds < 60) return `${seconds}s`
      let minutes = Math.trunc(seconds / 60)
      seconds %= 60
      if (minutes < 60) return `${minutes}min ${seconds}s`
      const hours = Math.trunc(minutes / 60)
      minutes %= 60
      return `${hours}h ${minutes}min ${seconds}s`
    }
  }
})
export default class HighscoresTable extends Vue {
  get firebase () {
    return this.$store.state.firebase
  }
  private highscores: Array<any> = [];

  created () {
    const db = this.firebase.firestore()
    const highscoresRef = db.collection('highscores')
    highscoresRef
      .orderBy('time')
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc: any) => {
          this.highscores.push({ ...doc.data(), id: doc.id })
        })
      })
  }
}
</script>

<style lang="scss">
@import "@/variables.scss";

.highscores-table {
  display: flex;
  justify-content: space-around;

  table {
    min-width: 50vw;
    border-collapse:separate;
    border:solid white 1px;
    border-radius:6px;
    background: linear-gradient(to right, $primary, $secondary);
  }

  td, th {
    border-left:solid white 1px;
    border-top:solid white 1px;
    padding: .5em 0;
  }

  th {
    border-top: none;
  }

  td:first-child, th:first-child {
    border-left: none;
  }
}
</style>
