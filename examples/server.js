const RakNet = require('../')

if (process.argv.length !== 4) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <host> <port>`)
  process.exit(1)
}

const server = RakNet.createServer({
  host: process.argv[2],
  port: parseInt(process.argv[3])
})

server.on('listening', () => {
  console.log(`Listening on ${server.port}`)
})

server.on('connection', client => {
  client.on('login', () => {
    console.log('A client has logged in')
  })
})
