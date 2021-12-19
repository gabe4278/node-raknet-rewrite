const RakNet = require('../')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <host> <port>`)
  process.exit(1)
}

const client = RakNet.createClient({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  password: 'Rumpelstiltskin' // password used in RakNet chat example
})

client.on('connect', function () {
  console.info('Connected')
})

client.on('login', () => {
  console.log('Logged in')
})

client.on('error', function (err) {
  console.log(err)
})
