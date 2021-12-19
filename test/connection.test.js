/* eslint-env jest */

const RakNet = require('../')

const HOST = '127.0.0.1'
const PORT = 9999

describe('Client', () => {
  let client
  let server

  beforeAll(() => {
    return new Promise((resolve, reject) => {
      // Create the server
      server = RakNet.createServer({
        host: HOST,
        port: PORT
      })

      // Once the server is listening, create the client
      server.socket.once('listening', () => {
        client = RakNet.createClient({
          host: HOST,
          port: PORT
        })

        resolve()
      })
    })
  })

  afterAll(() => {
    client.close()
    server.close()
  })

  it('can login', (done) => {
    client.on('login', done)
  })
})
