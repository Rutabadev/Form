interface Rule {
  message: string;
  check(usr: string, pwd: string): boolean;
}

const rules: Array<Rule> = [
  {
    message: 'Username is required',
    check: (usr, pwd) => usr !== ''
  },
  {
    message: 'Password is required',
    check: (usr, pwd) => pwd !== ''
  },
  {
    message: 'Password length must be longer than 2',
    check: (usr, pwd) => pwd.length > 2
  },
  {
    message: 'First character must be 7',
    check: (usr, pwd) => pwd[0] === '7'
  },
  {
    message: 'Password must contain developper\'s name',
    check: (usr, pwd) => {
      const developperNames = ['etienne', 'étienne']
      return developperNames.some(name => pwd.toLowerCase().includes(name))
    }
  },
  {
    message: 'Password must be less than 14 characters long',
    check: (usr, pwd) => pwd.length < 14
  },
  {
    message: 'Password must contain $',
    check: (usr, pwd) => pwd.includes('$')
  }
]

export { Rule, rules }
