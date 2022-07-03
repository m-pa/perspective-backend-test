const { createDBConnection, createSessionFromInput, Session } = require('../../lib/database.js')
process.env.MONGODB_URL = 'mongodb://localhost:27017/sessions'
const { Mongoose } = require('mongoose')
const { expect } = require('chai')

describe('database', () => {
  describe('connection', () => {
    it('creates a database connection', () => {
      const db = createDBConnection()
      expect(db).to.be.instanceOf(Mongoose)
      db.disconnect()
    })
  })

  describe('model', () => {
    const input = {
      timestamp: "2021-06-07T08:32:05.546Z",
      sentAt: "2021-06-07T08:32:05.547Z",
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
      messageId: "perspective-q6qmW8wlPgRwJo1JOB1Yz",
    }

    
    describe('createSessionFromInput', () => {
      it('handles valid data', async () => {
        const session = createSessionFromInput(input)
        try {
          await session.validate()
        } catch (err) {
          expect(err).to.not.be.an('error')
  
        }
  
        expect(session.errors).to.not.be.an('object')
      })

      it('creates a session document from input message', () => {
        const input = {
          timestamp: "2021-06-07T08:32:05.546Z",
          sentAt: "2021-06-07T08:32:05.547Z",
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
          messageId: "perspective-q6qmW8wlPgRwJo1JOB1Yz",
        }
        
        const session = createSessionFromInput(input)
  
        expect(session).to.be.instanceOf(Session)
      })  
    })
  })
})