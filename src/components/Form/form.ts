import { Component, Vue } from 'vue-property-decorator'

class Validation {
  constructor (
    public valid: boolean,
    public rule: number,
    public error: string
  ) {
    this.valid = valid
    this.rule = rule
    this.error = error
  }
}

@Component({})
export default class Form extends Vue {
  private errors: Array<string> = [];
  private username: string = '';
  private password: string = '';
  private success: boolean = false;

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
      if (!validation.valid) {
        this.errors.push(validation.error)
      }
    }
  }

  validatePassword (pwd: string): Validation {
    if (pwd[0] !== '7') {
      return { valid: false, rule: 0, error: 'First character must be 7' }
    }
    this.success = true
    return { valid: true, rule: 0, error: '' }
  }
}
