# Perspective Backend Engineer Worksample
Hey there! This is what i made.

## Usage
  Run test suite
    `npm run test`

  Start service
    `npm run start`
    
  Run test service
    `npm run test:service` and start service

## Environment
  Environment can have the following variables:
  - Redis url: `REDIS_URL`  value: `url to redis service ie: redis://127.0.0.1:6379`
  - Mongodb url: `MONGODB_URL` value: `url to mongodb instance ie: mongodb://localhost:27017/sessions` (make sure this is the right one, test suite and service will drop collection)
  - Log level: `LOG_LEVEL` value: `info | warning | error`
  - Web concurrency: `WEB_CONCURRENCY` value: `[integer]` - controls number of workers
  - Job concurrency: `JOB_CONCURRENCY` value: `[integer]` - controls bull concurrent operations

## Troubleshooting
  If mongodb can not be found (`UnhandledPromiseRejectionWarning: TypeError: this.db.open is not a function`), it's possible the version needs to be prefixed with: 
    `npm install --prefix ./node_modules/mongoose/ mongodb@2.1.6 --save`

## Roadmap
  - Find solution for duplicate profile entries saved to database
  - Global error handling
  - Graceful shutdown
  - Logging file transport
  - Log more bull events (ie: stalled jobs)
  - Metrics
  - Refactoring
