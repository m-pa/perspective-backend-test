module.exports = {
  dbConnection: {
    createSessionFromInput: function () {
      return this.sessionDocument || {}
    },
    Session: {
      update: () => ({ exec: async () => null })
    },
    sessionDocument: {
      save: () => {},
      validate: () => {}
    }
  },
  validation: {
    validate: () => {}
  },
  logger: {
    info: () => {},
    warning: () => {},
    error: () => {}
  }
}
