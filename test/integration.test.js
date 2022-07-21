'use strict'
const uuid = require('uuid')
const { expect } = require('chai')

const libStart = require('../lib')
const database = require('../lib/database')
const validation = require('../lib/validation.js')
const { logger } = require('../mocks/mocks')

describe('Tracking', () => {
  let queueName
  let service
  let connection

  before(async () => {
    connection = database.createDBConnection(process.env.MONGODB_URL)
  })

  after(async () => {
    await connection.connections.forEach(connection => connection.close())
  })

  beforeEach(async () => {
    queueName = 'test-' + uuid.v4()
    service = await libStart(database, validation, logger, database.Session, { redisUrl: 'redis://127.0.0.1:6379', queueName })
  })

  afterEach(async function () {
    await service.queueInternals.closeQueue(queueName)
    const hasData = await database.Session.findOne({}).exec()
    if (hasData) {
      await database.Session.collection.drop()
    }
  })

  describe('process optIn job', () => {
    it('expects to return expected value', (done) => {
      const message = {
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

      service.queue
        .on('completed', (job, result) => {
          try {
            expect(result).to.deep.equal({ success: true })
            done()
          } catch (err) {
            done(err)
          }
        })

      service.queueInternals.addMessage(queueName, 'optIn', message)
    })

    it('updates existing session', (done) => {
      const message = {
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

      let completedJobs = 0

      service.queue
        .on('completed', async (job, result) => {
          completedJobs += 1
          if (completedJobs === 2) {
            const result = await database.Session.find({}).exec()

            try {
              expect(result).to.have.lengthOf(1)
              expect(result[0].profile).to.have.lengthOf(5)
              expect(result[0].profile[4].fieldName).to.equal('phone')
              done()
            } catch (err) {
              done(err)
            }
          }
        })

      service.queueInternals.addMessage(queueName, 'optIn', message)
      new Promise(resolve => setTimeout(resolve, 100)).then(() => {
        const message2 = Object.assign({}, message)
        message2.properties.optIns.push({
          fieldName: 'phone',
          label: 'Phone Number',
          value: '123-456'
        })

        message2.sentAt = '2021-06-07T08:32:06.547Z'
        service.queueInternals.addMessage(queueName, 'optIn', message2)
      })
    })

    it('creates multiple sessions', (done) => {
      const message = {
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

      let completedJobs = 0

      service.queue
        .on('completed', async (job, result) => {
          completedJobs += 1
          if (completedJobs === 2) {
            const result = await database.Session.find({}).exec()

            try {
              expect(result).to.have.lengthOf(2)
              expect(result[0].profile).to.have.lengthOf(2)
              expect(result[1].profile[2].fieldName).to.equal('phone')
              done()
            } catch (err) {
              done(err)
            }
          }
        })

      service.queueInternals.addMessage(queueName, 'optIn', message)
      new Promise(resolve => setTimeout(resolve, 100)).then(() => {
        const message2 = Object.assign({}, message)
        message2.properties.optIns.push({
          fieldName: 'phone',
          label: 'Phone Number',
          value: '123-456'
        })
        message2.properties.clientSessionId = 'newID'
        message2.sentAt = '2021-06-07T08:32:06.547Z'
        service.queueInternals.addMessage(queueName, 'optIn', message2)
      })
    })

    it('handles invalid input', (done) => {
      const invalidMessage = {
        timestamp: '2021-06-07T08:32:05.546Z',
        // missing 'sentAt' prop
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

      service.queue
        .on('completed', async (job, result) => {
          const document = await database.Session.find({}).exec()

          try {
            expect(result.success).to.equal(true)
            expect(document).to.have.lengthOf(0)
            done()
          } catch (err) {
            done(err)
          }
        })

      service.queueInternals.addMessage(queueName, 'optIn', invalidMessage)
    })
  })
})
