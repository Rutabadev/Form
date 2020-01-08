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
      const developperNames = ['etienne', 'étienne', 'raby']
      return developperNames.some(name => pwd.toLowerCase().includes(name))
    }
  },
  {
    message: 'Password must be less than 20 characters long',
    check: (usr, pwd) => pwd.length < 20
  },
  {
    message: 'Password must contain $',
    check: (usr, pwd) => pwd.includes('$')
  },
  {
    message: 'Must contain current time like hh:mm:ss',
    check: (usr, pwd) => {
      let currentTime = new Date()
      return (pwd.includes(`${currentTime.getHours()}:${currentTime.getMinutes()}:${(currentTime.getSeconds() < 10) ? '0' + currentTime.getSeconds() : currentTime.getSeconds()}`))
    }
  }
]

export { Rule, rules }
