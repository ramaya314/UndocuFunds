let flux = require('../helpers/flux-dispatcher')
let createStore = require('../helpers/store-factory')

import { db } from '../config/constants'

let user = {};

let userRef;

const userStore = createStore({
  getUser() {
    return user;
  }
});

function setUser(userId) {
  const userRef = db.ref(`users/${userId}/info`);
  userRef.on('value', snapshot => {
    user = snapshot.val();
    userStore.emitChange();
  })
}

flux.register({
  setUser(id) {
    setUser(id);
  }
});

module.exports = userStore;
