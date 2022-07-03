const { createProcessor } = require('../../lib/processor')
const { dbConnection, validation } = require('../../mocks/mocks.js')
const chai = require('chai')
const spies = require('chai-spies')

chai.use(spies)
const expect = chai.expect

describe('processor', () => {
  const input = {
    timestamp: "2021-06-07T08:33:05.546Z",
    sentAt: "2021-06-07T08:33:05.547Z",
    properties: {
      trackingVersion: "v3",
      clientSessionId: "AFfmr1iGvkrJXxKWid9Ih",
      clientPersistentId: "W3hi37-xp--9_pG1jkwIz",
      pageId: "609a878b0cba83001fb5abd7",
      companyId: "5fb4eb1a839d81001f800c21",
      funnelId: "609a878b0cba83001fb5abd2",
      funnelVersionId: "60a4c19fcf963b001f9f286e",
      optIns: [
        {
          fieldName: "fullName",
          label: "Full Name",
          value: "Christoph Fey"
        },
        {
          fieldName: "email",
          label: "Business Email",
          value: "christoph@perspective.co"
        }
      ]
    },
    messageId: "perspective-q6qmW8wlPgRwJo1JOB1Yz"
  }
  
  it('can create a processor', () => {
    const processor = createProcessor(dbConnection, validation)
    expect(processor).to.be.a('function')
  })

  it('saves new session to database', async () => {
    const processor = createProcessor(dbConnection, validation)
    const spy = chai.spy.on(dbConnection.sessionDocument, 'save')
    await processor({ data: input })
    expect(spy).to.have.been.called();
    chai.spy.restore()
  })

  it('saves no duplicate session to database', async () => {
    const processor = createProcessor(dbConnection, validation)
    dbConnection.Session.findOne = () => ({ exec: () => ({ document: 'mock' })})
    const spy = chai.spy.on(dbConnection.sessionDocument, 'save')
    await processor({ data: input })
    expect(spy).to.not.have.been.called();
    chai.spy.restore()
  })
})