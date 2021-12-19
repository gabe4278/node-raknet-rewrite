const { EventEmitter } = require('events')

const dgram = require('dgram')

const Client = require('./client')

class Server extends EventEmitter {
  constructor (customPackets, customTypes) {
    super()
    this.ipPortToClient = {}
    this.customPackets = customPackets || {}
    this.customTypes = customTypes || {}
  }

  close () {
    this.socket.close()
  }

  listen (port, address) {
    this.address = address
    this.port = port
    this.socket = dgram.createSocket({ type: 'udp4' })
    this.socket.bind(this.port, this.address)

    this.socket.on('listening', () => {
      this.emit('listening')
    })

    this.socket.on('error', (e) => {
      this.emit('error', e)
    })

    this.socket.on('message', (data, { port, address }) => {
      const ipPort = `${address}:${port}`
      let client
      if (!this.ipPortToClient[ipPort]) {
        client = new Client(port, address, this.customPackets, this.customTypes)
        client.setSocket(this.socket)
        this.ipPortToClient[ipPort] = client
        this.emit('connection', client)
      } else { client = this.ipPortToClient[ipPort] }
      if (!client.ended) { client.handleMessage(data) } else { delete this.ipPortToClient[ipPort] }
    })
  }
}

module.exports = Server
