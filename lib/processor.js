const createProcessor = (database, validation, log, Session) => {
  return async (job) => {
    log.info('got job', job.data.properties)

    try {
      log.info('validating job', job.data.properties)
      validation.validate(job.data)
    } catch (err) {
      log.warning('Validation failed', job)
      return { success: true }
    }
    
    log.info('starting schema validation', job.data.properties)
    let session = database.createSessionFromInput(job.data)
    try {
      log.info('validating job schema', job.data.properties)
      await session.validate()
    } catch (err) {
      log.warning('Schema Validation failed', job)
      return { success: true }
    }

    const profile = job.data.properties.optIns
    delete job.data.properties.optIns

    const update = { 
      $set: {
        ...job.data,
      },
      $push: { profile: {$each: profile}}
    }

    try {
      log.info('updating job', job.data.properties)
      await Session.update({ localId: job.data.properties.clientSessionId }, update, { upsert: true }).exec()
      log.info('Session update successfull', job)
    } catch (err) {
      log.error('Session update failed', err)
    }

    log.info('job all done')
    return {success: true}
  }  
}

module.exports = {
  createProcessor
}