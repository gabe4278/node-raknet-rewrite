const { ProtoDef, Serializer, Parser } = require('protodef')

function createProtocol () {
  const proto = new ProtoDef()

  proto.addTypes(require('../datatypes/raknet'))
  proto.addTypes(require('../../data/protocol.json').types)

  return proto
}

function createSerializer () {
  return new Serializer(createProtocol(), 'special_packet')
}

function createDeserializer () {
  return new Parser(createProtocol(), 'special_packet')
}

module.exports = {
  createDeserializer: createDeserializer,
  createSerializer: createSerializer
}
