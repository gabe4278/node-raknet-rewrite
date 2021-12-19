const { ProtoDef, Serializer, Parser } = require('protodef')

function createProtocol () {
  const proto = new ProtoDef()

  proto.addTypes(require('../datatypes/raknet'))
  proto.addTypes(require('../../data/protocol.json').types)

  return proto
}

function createSerializer () {
  return new Serializer(createProtocol(), 'packet')
}

function createDeserializer () {
  return new Parser(createProtocol(), 'packet')
}

module.exports = {
  createDeserializer: createDeserializer,
  createSerializer: createSerializer
}
