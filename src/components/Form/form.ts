import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'
import Clock from '@/components/Clock.vue'

interface FormError {
  message: string;
  fixed: boolean;
}

@Component({
  filters: {
    time: function (value: number) {
      if (!value) return '0s'
      let seconds = Math.round(value / 1000)
      if (seconds < 60) {
        return `${seconds}s`
      }
      if (seconds < 3600) {
        let minutes = Math.round(seconds / 60)
        seconds = seconds % 60
        return `${minutes}m${seconds}s`
      }
      let hours = Math.round(seconds / 3600)
      let minutes = Math.round((seconds % 3600) / 60)
      seconds = seconds % 60
      return `${hours}h${minutes}m${seconds}s`
    }
  },
  components: {
    Clock
  }
})
export default class Form extends Vue {
  private errors: Array<FormError> = [];
  private errorsMemory: Map<number, FormError> = new Map();
  private username: string = '';
  private password: string = '';
  private rules: Array<Rule> = rules;
  private success: boolean = false;
  private startTime: number = 0;
  private endTime: number = 0;
  private elapsedTime: number = 0;
  private updateGameTimeInterval: number = 0;
  get firebase () {
    return this.$store.state.firebase
  }
  get user () {
    return this.$store.state.user
  }

  mounted () {
    this.rules = this.shuffle(rules)
    this.rules.length = 8
    this.startTime = Date.now()
    this.updateGameTimeInterval = setInterval(this.updateGameTime, 1000)
  }

  beforeDestroy () {
    clearInterval(this.updateGameTimeInterval)
  }

  updateGameTime () {
    this.endTime = Date.now()
    this.elapsedTime = this.endTime - this.startTime
  }

  checkForm (event: Event): void {
    event.preventDefault()
    this.success = false
    this.errors = []
    this.validateForm(this.username, this.password)
  }

  validateForm (username: string, password: string): void {
    Array.from(this.errorsMemory.keys()).forEach(key => {
      let rule = rules[key]
      this.errorsMemory.set(key, { message: rule.message, fixed: rule.check(username, password) })
    })

    if (this.allErrorsFixed()) {
      let nextInvalidRuleIndex = this.rules.findIndex(rule => !rule.check(username, password))
      if (nextInvalidRuleIndex !== -1) {
        this.errorsMemory.set(nextInvalidRuleIndex, { message: rules[nextInvalidRuleIndex].message, fixed: false })
      }
    }

    this.errors = Array.from(this.errorsMemory.values())

    if (this.allErrorsFixed()) {
      this.handleSuccess()
    }
  }

  handleSuccess () {
    this.success = true
    clearInterval(this.updateGameTimeInterval)
    if (this.user) {
      const db = this.firebase.firestore()
      db.collection('highscores').doc().set({
        user: {
          uid: this.user.uid,
          displayName: this.user.displayName
        },
        time: this.elapsedTime
      })
    }
  }

  allErrorsFixed () {
    return Array.from(this.errorsMemory.values()).reduce((a, b) => a && b.fixed, true)
  }

  shuffle (a: Array<any>) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }
}
