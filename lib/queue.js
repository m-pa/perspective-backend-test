const Bull = require('bull')

const internals = {
  queues: {},

  createQueue: (queueName, redisUrl) => {
    if (internals.queues[queueName]) {
      return internals.queues[queueName]
    }
    internals.queues[queueName] = new Bull(queueName, redisUrl)
    return internals.queues[queueName]
  },

  addProcessor: (queueName, jobName, jobConcurrency, jobHandler) => {
    internals.queues[queueName].process(jobName, jobConcurrency, jobHandler)

    return true
  },

  addMessage: (queueName, jobName, message) => {
    return internals.queues[queueName].add(jobName, message)
  },

  closeQueue: (queueName) => {
    return internals.queues[queueName].close()
  }
}

module.exports = internals
