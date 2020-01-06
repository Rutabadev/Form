interface Rule {
  message: string,
  check(pwd: string): boolean;
}

const rules: Array<Rule> = [
  {
    message: 'Password length must be longer than 2',
    check: (pwd) => pwd.length > 2
  },
  {
    message: 'First character must be 7',
    check: (pwd) => pwd[0] === '7'
  },
  {
    message: 'Password must contain developper\'s name',
    check: (pwd) => {
      const developperNames = ['etienne', 'étienne']
      return developperNames.some(name => pwd.toLowerCase().includes(name))
    }
  },
  {
    message: 'Password must be less than 14 characters long',
    check: (pwd) => pwd.length < 14
  },
  {
    message: 'Password must contain $',
    check: (pwd) => pwd.includes('$')
  }
]

export { Rule, rules }
