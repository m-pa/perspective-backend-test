require('dotenv').config(); // eslint-disable-line
const throng = require('throng')
const libStart = require('./lib')
const { createLogger } = require('./lib/logger')
const database = require('./lib/database')
const validation = require('./lib/validation')

const WORKERS = process.env.WEB_CONCURRENCY || 1
const CONCURRENCY = process.env.JOB_CONCURRENCY || 1

const start = (id) => {
  const log = createLogger(`Worker ${id}`)
  log.info('Started worker')
  database.createDBConnection()

  return libStart(database, validation, log, database.Session, { redisUrl: process.env.REDIS_URL, jobConcurreny: CONCURRENCY, mongodbUrl: process.env.MONGODB_URL })
}

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start
})
