const winston = require('winston')

const createLogger = (namespace) => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL ||  'warning',
    format: winston.format.json(),
    defaultMeta: { service: 'session-queue', namespace },
    transports: [
      new winston.transports.Console({ format: winston.format.simple() })
    ],
  });
}

module.exports = {
  createLogger
}