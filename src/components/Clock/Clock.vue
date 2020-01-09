<template>
    <div class="clock">
      <p>
        {{ time | date }}
      </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  filters: {
    date: function (value: Date) {
      if (!value) return ''
      let hours = (value.getHours() < 10) ? '0' + value.getHours() : value.getHours()
      let minutes = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes()
      let seconds = (value.getSeconds() < 10) ? '0' + value.getSeconds() : value.getSeconds()
      return `${hours}:${minutes}:${seconds}`
    }
  }
})
export default class Clock extends Vue {
    private time: Date = new Date();
    private updateClockInterval: number = 0;

    mounted () {
      this.updateClockInterval = setInterval(this.updateTime, 1000)
    }

    beforeDestroy () {
      clearInterval(this.updateClockInterval)
    }

    updateTime () {
      this.time = new Date()
    }
}
</script>
