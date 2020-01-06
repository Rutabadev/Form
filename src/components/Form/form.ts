import { Component, Vue } from 'vue-property-decorator'

interface Validation {
    valid: boolean,
    rule: number,
    error: string
}

interface Rule {
  message: string,
  check(pwd: string): boolean;
}

@Component({})
export default class Form extends Vue {
  private errors: Array<string> = [];
  private username: string = '';
  private password: string = '';
  private success: boolean = false;
  private rules: Array<Rule> = [
    {
      message: 'Password length must be longer than 2',
      check: (pwd) => pwd.length > 2
    },
    {
      message: 'First character must be 7',
      check: (pwd) => pwd[0] === '7'
    }
  ];

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
    for (let i = 0; i < this.rules.length; i++) {
      if (!this.rules[i].check(pwd)) {
        console.log("C'est pas bon là")
        return { valid: false, rule: i + 3, error: this.rules[i].message }
      }
    }

    this.success = true
    return { valid: true, rule: 0, error: '' }
  }
}
