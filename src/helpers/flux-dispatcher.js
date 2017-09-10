let Dispatcher = require('flux').Dispatcher
let dispatcher = new Dispatcher()

module.exports = {
  register (actions) {
    Object.keys(actions).forEach(key => {
      let callback = actions[key]
      dispatcher.register(payload => {
        if (payload.actionType === key) callback(payload.data)
      })
    })
  },

  dispatch (actionType, data) {
    dispatcher.dispatch({actionType, data})
  }
}
