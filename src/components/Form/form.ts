import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'
import Clock from '@/components/Clock/Clock.vue'

interface FormError {
  message: string;
  fixed: boolean;
}

@Component({
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

  mounted () {
    this.rules = this.shuffle(rules)
    this.rules.length = 8
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
