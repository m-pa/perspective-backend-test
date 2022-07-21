const queueInternals = require('./queue')
const { createProcessor } = require('./processor')

module.exports = async (database, validation, log, Session, { redisUrl, queueName = 'tracking', jobConcurrency = 1 }) => {
  const queue = await queueInternals.createQueue(queueName, redisUrl)
  queue.on('completed', () => log.info('completed'))
  queue.on('waiting', function (jobId) {
    log.info('waiting')
  })

  queueInternals.addProcessor(queueName, 'optIn', jobConcurrency, createProcessor(database, validation, log, Session))
  return {
    queueInternals,
    queue
  }
}
