const mongoose = require('mongoose')

const createDBConnection = () => {
  return mongoose.connect(process.env.MONGODB_URL)
}

const schema = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'no _id field on document']
  },

  localId: String,
  globalId: String,

  profile: [
    {
      fieldName: String,
      value: mongoose.Schema.Types.Mixed,
    }
  ],

  createdAt: Date,
  lastSeenAt: Date,
  convertedAt: Date,

  companyId: mongoose.Schema.Types.ObjectId,
  workspaceId: mongoose.Schema.Types.ObjectId,
  funnelId: mongoose.Schema.Types.ObjectId,
  funnelVersionId: mongoose.Schema.Types.ObjectId,
};

const Session = mongoose.model('Session', schema)

const createSessionFromInput = (input) => {
  return new Session({
    _id: mongoose.Types.ObjectId(),
    localId: input.properties.clientSessionId,
    globalId: input.properties.clientpersistentId,
    profile: input.properties.optIns,
    lastSeenAt: input.sentAt,
    convertedAt: input.timestamp,
    companyId: input.properties.companyId,
    funnelId: input.properties.funnelId,
    funnelVersionId: input.properties.funnelVersionId
  })
}

module.exports = {
  createSessionFromInput,
  createDBConnection,
  Session
}