module.exports = {
  dbConnection: {
    createSessionFromInput: function () {
      return this.sessionDocument || {}
    },
    Session: {
      findOne: () => ({ exec: () => null }),
    },
    sessionDocument: {
      save: () => {},
      validate: () => {}
    }
  },
  validation: {
    validate: () => {}
  },
}