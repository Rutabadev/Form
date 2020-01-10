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
    message: 'Password length must be longer than 18',
    check: (usr, pwd) => pwd.length > 18
  },
  {
    message: 'Password first character must be 7',
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
    message: 'Password must contain current time like hh:mm:ss',
    check: (usr, pwd) => {
      let regex = new RegExp(/..:..:../)
      let matches = pwd.match(regex)
      if (!matches || matches.length < 1) return false

      let validStrings: Array<string> = []
      let t = Date.now()
      let validTimeStamps = [
        t - 2000,
        t - 1000,
        t,
        t + 1000
      ]
      validTimeStamps.forEach(timestamp => {
        validStrings.push(new Date(timestamp).toTimeString().slice(0, 8))
      })

      return validStrings.some(string => pwd.includes(string))
    }
  },
  {
    message: 'Username and password must be the same',
    check: (usr, pwd) => usr === pwd
  },
  {
    message: 'Username must be all capital letters',
    check: (usr, pwd) => usr === usr.toUpperCase()
  }
]

export { Rule, rules }
