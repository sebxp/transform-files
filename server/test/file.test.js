import { expect } from 'chai'
import { getFiles, getFilesList } from '../src/controllers/file.controller.js'

describe('file.controller.js', () => {
  it('should return 200 status code with files list', async () => {
    const req = {}
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.equal(200)
        return {
          send: function (data) {
            expect(data).to.be.an('array')
            expect(data[0]).to.be.a('string')
          }
        }
      }
    }
    await getFilesList(req, res)
  })
  it('should return 200 status code with file details', async () => {
    const req = {}
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.equal(200)
        console.log(statusCode)
        return {
          send: function (data) {
            expect(data).to.be.an('array')
            expect(data[0]).to.have.property('file')
            expect(data[0]).to.have.property('lines')
            const lines = data[0].lines
            expect(lines).to.be.an('array')
            expect(lines[0]).to.have.property('text')
            expect(lines[0]).to.have.property('number')
            expect(lines[0]).to.have.property('hex')
          }
        }
      }
    }
    await getFiles(req, res)
  })
  it("should return 404 status code with message 'File not found'", async () => {
    const req = {
      query: {
        fileName: 'unknown.txt'
      }
    }
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.equal(404)
        return {
          send: function (data) {
            expect(data).to.equal('File not found')
          }
        }
      }
    }
    await getFiles(req, res)
  })
  it('should return 200 status code with file details', async () => {
    const req = {
      query: {
        fileName: 'test2.csv'
      }
    }
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.equal(200)
        return {
          send: function (data) {
            expect(data).to.have.property('file')
            expect(data).to.have.property('lines')
            const lines = data.lines
            expect(lines).to.be.an('array')
            expect(lines[0]).to.have.property('text')
            expect(lines[0]).to.have.property('number')
            expect(lines[0]).to.have.property('hex')
          }
        }
      }
    }
    await getFiles(req, res)
  })
})
