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
  randomMinLength(),
  randomMaxLength(),
  randomChar(),
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
  },
  randomCharNumberIsK()
]

function randomChar (): Rule {
  let chars = ['$', '☺', '%', '*', 'É', '♥']
  let char = chars[Math.round(Math.random() * 5)]
  return {
    message: `Password must include ${char}`,
    check: (usr, pwd) => pwd.includes(char)
  }
}

function randomMinLength (): Rule {
  let minLength = Math.round(Math.random() * 3 + 15)
  return {
    message: `Password must be more than ${minLength} characters`,
    check: (usr, pwd) => pwd.length > minLength
  }
}

function randomMaxLength (): Rule {
  let maxLength = Math.round(Math.random() * 3 + 20)
  return {
    message: `Password must be less than ${maxLength} characters`,
    check: (usr, pwd) => pwd.length < maxLength
  }
}

function randomCharNumberIsK () : Rule {
  let charNumber = Math.round(Math.random() * 5 + 7)
  return {
    message: `Password character number ${charNumber} must be K`,
    check: (usr, pwd) => pwd[charNumber - 1] === 'K'
  }
}

export { Rule, rules }
