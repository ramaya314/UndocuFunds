let {EventEmitter} = require('events')
let emitter = EventEmitter.prototype

module.exports = function createStore (store) {
  let observable = Object.assign({}, store, emitter, {
    emitChange () {
      emitter.emit('change')
    },

    addChangeListener (callback) {
      emitter.addListener('change', callback)
    }
  })
  return observable
}
