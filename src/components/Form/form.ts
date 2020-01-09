import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'

interface FormError {
  message: string;
  fixed: boolean;
}

@Component({
  filters: {
    date: function (value: Date) {
      if (!value) return ''
      return `${value.getHours()}:${value.getMinutes()}:${(value.getSeconds() < 10) ? '0' + value.getSeconds() : value.getSeconds()}`
    }
  }
})
export default class Form extends Vue {
  private errors: Array<FormError> = [];
  private errorsMemory: Map<number, FormError> = new Map();
  private username: string = '';
  private password: string = '';
  private rules: Array<Rule> = rules;
  private success: boolean = false;
  private time: Date = new Date();
  private updateClockInterval: number = 0;

  mounted () {
    this.updateClockInterval = setInterval(this.updateTime, 1000)
    this.rules = this.shuffle(rules)
  }

  beforeDestroy () {
    clearInterval(this.updateClockInterval)
  }

  updateTime () {
    this.time = new Date()
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
      let nextInvalidRuleIndex = rules.findIndex(rule => !rule.check(username, password))
      if (nextInvalidRuleIndex !== -1) {
        this.errorsMemory.set(nextInvalidRuleIndex, { message: rules[nextInvalidRuleIndex].message, fixed: false })
      }
    }

    this.errors = Array.from(this.errorsMemory.values())

    this.success = this.allErrorsFixed()
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
