const winston = require('winston')

const createLogger = (namespace) => {
  return winston.createLogger({
    level: 'info',
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