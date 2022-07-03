const Joi = require('joi')

const inputSchema = Joi.object({
  timestamp: Joi.date().iso().required(),
  sentAt: Joi.date().iso().required(),
  messageId: Joi.string().required(),    
  properties: Joi.object({
    trackingVersion: Joi.string().required(),
    clientSessionId: Joi.string().required(),
    clientPersistentId: Joi.string().required(),
    pageId: Joi.string().required(),
    companyId: Joi.string().required(),
    funnelId: Joi.string().required(),
    funnelVersionId: Joi.string().required(), 
    optIns: Joi.array().max(10).unique('fieldName')
  }).required()

})

const validate = (input) => {
  const result =  inputSchema.validate(input)
  if (result.error) {
    throw new TypeError(result.error)
  } else {
    return true
  }
}

module.exports = {
  validate
}