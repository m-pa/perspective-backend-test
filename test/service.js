require('dotenv').config(); // eslint-disable-line

const message = require('../samples/message-1.json')
const queueInternals = require('../lib/queue');
const crypto = require('crypto')
const database = require('../lib/database')
let startTS
let createdJobs = 0
let queue

database.createDBConnection()

const start = async () => {
  startTS = Date.now()
  
  const hasData = await database.Session.findOne({}).exec()
  if (hasData) {
    await database.Session.collection.drop()
  }

  queue = await queueInternals.createQueue('tracking', 'redis://127.0.0.1:6379');
  setInterval(() => {
    const id = crypto.randomBytes(20).toString('hex');
    message.properties.clientSessionId = id
    queueInternals.addMessage('tracking', 'optIn', message)
    createdJobs = createdJobs + 1
  }, 1);

  setInterval(() => {
    const id = crypto.randomBytes(20).toString('hex');
    message.properties.clientSessionId = id
    queueInternals.addMessage('tracking', 'optIn', message)
    createdJobs = createdJobs + 1
  }, 2);
}

process.on('SIGINT', async () => {
  const jobsCreated = await database.Session.find()
  const currentTS = Date.now()
  
  const hasData = await database.Session.findOne({}).exec()
  if (hasData) {
    await database.Session.collection.drop()
  }
  console.log(`${createdJobs} created`)
  console.log(`processed ${jobsCreated.length} jobs in ${currentTS - startTS} ms. ${(currentTS - startTS) / jobsCreated.length} ms/job`)
  console.log('\nobliterating remaining jobs...')
  await queue.obliterate({ force: true })
  console.log('exiting...')
  process.exit()
})

start()