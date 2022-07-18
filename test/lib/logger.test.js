const { expect } = require('chai')
const { createLogger } = require('../../lib/logger')
const Logger = require('winston/lib/winston/logger')

describe('logger', () => {
  it('creates a logger', () => {
    const log = createLogger('1')
    expect(log.info).to.be.an.instanceOf(Function)
  })

  it('is instance of winston', () => {
    const log = createLogger('1')
    expect(log).to.be.instanceOf(Logger)
  })

  it('creates correct namespaces', () => {
    const log = createLogger('1')
    expect(log.defaultMeta.namespace).to.equal('1')

    const log2 = createLogger('2')
    expect(log2.defaultMeta.namespace).to.equal('2')
  })
})