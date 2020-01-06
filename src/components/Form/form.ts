import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'

interface Validation {
  valid: boolean,
  rule: number,
  error: string
}

@Component({})
export default class Form extends Vue {
  private errors: Array<string> = [];
  private username: string = '';
  private password: string = '';
  private success: boolean = false;
  private rules: Array<Rule> = rules;

  checkForm (event: Event) {
    event.preventDefault()

    this.errors = []

    if (!this.username) {
      this.errors.push('Username required')
    }

    if (!this.password) {
      this.errors.push('Password required')
    } else {
      let validation = this.validatePassword(this.password)
    }
  }

  validatePassword (pwd: string): void {
    this.success = false

    for (let i = 0; i < this.rules.length; i++) {
      if (!this.rules[i].check(pwd)) {
        this.errors.push(this.rules[i].message)
        return
      }
    }

    this.success = true
  }
}
