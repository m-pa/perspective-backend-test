const { validate } = require('../../lib/validation')
const { expect } = require('chai')

describe('validation', () => {
  const input = {
    timestamp: '2021-06-07T08:32:05.546Z',
    sentAt: '2021-06-07T08:32:05.547Z',
    properties: {
      trackingVersion: 'v3',
      clientSessionId: 'AFfmr1iGvkrJXxKWid9Ih',
      clientPersistentId: 'W3hi37-xp--9_pG1jkwIz',
      pageId: '609a878b0cba83001fb5abd7',
      companyId: '5fb4eb1a839d81001f800c21',
      funnelId: '609a878b0cba83001fb5abd2',
      funnelVersionId: '60a4c19fcf963b001f9f286e',
      optIns: [
        {
          fieldName: 'fullName',
          label: 'Full Name',
          value: 'Christoph Fey'
        },
        {
          fieldName: 'email',
          label: 'Business Email',
          value: 'christoph@perspective.co'
        }
      ]
    },
    messageId: 'perspective-q6qmW8wlPgRwJo1JOB1Yz'
  }

  it('throws an error if input is not an object', () => {
    const input = 'not an object'

    try {
      validate(input)
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('throws an error if input is an array', () => {
    const input = []

    try {
      validate(input)
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('throws an error if input is null', () => {
    const input = null

    try {
      validate(input)
    } catch (err) {
      expect(err).to.be.an('error')
    }
  })

  it('accepts valid object', () => {
    let result
    try {
      result = validate(input)
    } catch (err) {
      expect(err).to.not.be.an('error')
    }

    expect(result).to.equal(true)
  })

  it('throws error if timestamp is not a valid date', () => {
    let result

    try {
      result = validate({
        ...input,
        timestamp: 'invalid'
      })
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('timestamp')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if sentAt is not a valid date', () => {
    let result

    try {
      result = validate({
        ...input,
        sentAt: 'invalid'
      })
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('sentAt')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if messageId is not a string', () => {
    let result

    try {
      result = validate({
        ...input,
        messageId: []
      })
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('messageId')
    }

    expect(result).to.not.equal(true)
  })
  it('throws error if properties is not an object', () => {
    let result

    try {
      result = validate({
        ...input,
        properties: 'not an object'
      })
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('properties')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties are missing', () => {
    const localInput = {
      ...input
    }

    delete localInput.properties

    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('properties')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.trackingVersion is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.trackingVersion = []

    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('trackingVersion')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.clientSessionId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.clientSessionId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('clientSessionId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.clientPersistentId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.clientPersistentId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('clientPersistentId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.pageId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.pageId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('pageId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.companyId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.companyId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('companyId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.funnelId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.funnelId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('funnelId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.funnelVersionId is no string', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.funnelVersionId = []
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('funnelVersionId')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.optIns is no Array', () => {
    const localInput = {
      ...input,
      properties: { ...input.properties }
    }

    localInput.properties.optIns = 'no array'
    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('optIns')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.optIns is longer than 10 items', () => {
    const optIns = new Array(11).fill(null)

    const localInput = {
      ...input,
      properties: {
        ...input.properties,
        optIns
      }
    }

    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('optIns')
    }

    expect(result).to.not.equal(true)
  })

  it('throws error if properties.optIns items have duplicate field names', () => {
    const optIns = [{
      fieldName: 'fullName',
      label: 'Full Name',
      value: 'Christoph Fey'
    },
    {
      fieldName: 'fullName',
      label: 'Business Email',
      value: 'christoph@perspective.co'
    }]

    const localInput = {
      ...input,
      properties: {
        ...input.properties,
        optIns
      }
    }

    let result

    try {
      result = validate(localInput)
    } catch (err) {
      expect(err).to.be.an('error')
      expect(err.message).to.contain('optIns')
    }

    expect(result).to.not.equal(true)
  })
})
