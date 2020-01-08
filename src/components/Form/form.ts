import { Component, Vue } from 'vue-property-decorator'
import { Rule, rules } from './rules'

interface FormError {
  message: string;
  fixed: boolean;
}

@Component({})
export default class Form extends Vue {
  private seenErrorsMap: Map<number, FormError> = new Map();
  private errors: Array<FormError> = [];
  private errorsShowable: number = 1;
  private username: string = '';
  private password: string = '';
  private success: boolean = false;
  private rules: Array<Rule> = rules;

  checkForm (event: Event): void {
    event.preventDefault()
    this.errors = []
    this.validateForm(this.username, this.password)
    if (this.allErrorsAreFixed()) {
      this.success = true
    }
  }

  validateForm (username: string, password: string): void {
    for (let index = 0; index < rules.length; index++) {
      let rule = rules[index]

      // check rules and set errors
      if (!rule.check(username, password)) {
        this.seenErrorsMap.set(index, { message: rule.message, fixed: false })
        this.errors.push({ message: rule.message, fixed: false })
      } else {
        let seenError = this.seenErrorsMap.get(index)
        if (seenError) {
          this.seenErrorsMap.set(index, { message: rule.message, fixed: true })
          this.errors.push({ message: rule.message, fixed: true })
        }
      }

      if (this.errors.length === this.errorsShowable) {
        if (this.allErrorsAreFixed()) {
          this.errorsShowable++
        } else {
          return
        }
      }
    }
  }

  private allErrorsAreFixed () {
    return this.errors.reduce((a, b) => a && b.fixed, true)
  }
}
