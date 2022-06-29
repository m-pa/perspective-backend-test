require('dotenv').config(); // eslint-disable-line
const throng = require('throng');
const libStart = require('./lib');
const { createLogger } = require('./lib/logger')

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const start = (id) => {
  const log = createLogger(`Worker ${id}`)
  log.info(`Started worker`);

  return libStart(log);
};

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start,
});
