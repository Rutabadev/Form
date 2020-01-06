import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'

interface FormError {
  message: string;
  fixed: boolean;
  id: number;
}

@Component({})
export default class Form extends Vue {
  private errors: Array<FormError> = [];
  private username: string = '';
  private password: string = '';
  private success: boolean = false;
  private rules: Array<Rule> = rules;
  private seenErrors: Array<number> = [];

  checkForm (event: Event) {
    event.preventDefault()

    this.errors = []

    if (!this.username) {
      this.errors.push({ message: 'Username required', fixed: false, id: -2 })
      this.seenErrors.push(-2)
    } else {
      if (this.seenErrors.includes(-2)) {
        this.errors.push({ message: 'Username required', fixed: true, id: -2 })
      }
    }

    if (!this.password) {
      this.errors.push({ message: 'Password required', fixed: false, id: -1 })
      this.seenErrors.push(-1)
    } else {
      if (this.seenErrors.includes(-1)) {
        this.errors.push({ message: 'Password required', fixed: true, id: -1 })
      }
      this.validatePassword(this.password)
    }
  }

  validatePassword (pwd: string): void {
    this.success = false

    for (let i = 0; i < this.rules.length; i++) {
      if (this.rules[i].check(pwd)) {
        if (this.seenErrors.includes(i)) {
          this.errors.push({ message: this.rules[i].message, fixed: true, id: i })
        }
      }
      if (!this.rules[i].check(pwd)) {
        this.errors.push({ message: this.rules[i].message, fixed: false, id: i })
        this.seenErrors.push(i)
        return
      }
    }

    this.success = true
  }
}
