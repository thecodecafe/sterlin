module.exports = {
  validLogin: {
    body:{
      email: 'jondoe@gmail.com',
      password: 'password',
    }
  },

  invalidLogin: {
    body:{
      email: '',
      password: '',
    }
  },

  invalidLoginWorngPassword: {
    body:{
      email: 'jondoe@gmail.com',
      password: 'password22',
    }
  },

  invalidLoginEmail: {
    body:{
      email: '',
      password: 'password',
    }
  },

  invalidLoginPassword: {
    body:{
      email: 'jondoe@gmail.com',
      password: '',
    }
  },

  validSignUp: {
    body:{
      name: 'Bojack Horseman',
      email: 'jondoe@gmail.com',
      password: 'password',
      isAdmin: true
    }
  },

  invalidSignUp: {
    body:{
      name: 'Bojack Horseman',
      email: 'invalid email',
      password: 'password',
      isAdmin: true
    }
  },
};