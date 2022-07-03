

const createProcessor = (database, validation) => {

  return async (job) => {
    try {
      validation.validate(job.data)
    } catch (err) {
      return {success: true}
    }
    let session = database.createSessionFromInput(job.data)
    try {
      await session.validate()
    } catch (err) {
    }
  
    const document = await database.Session.findOne({ localId: job.data.clientSessionId}).exec()
  
    if (!document) {
      await session.save()
    } else {
      // TODO: update here
    }
  
    return {success: true}
  }  
}

module.exports = {
  createProcessor
}