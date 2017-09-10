import { db, firebaseAuth } from '../config/constants'

export function auth (email, pw, userData) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(user => saveUser(user.uid, email, userData))
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (id, email, user) {
  return db.ref().child(`users/${id}/info`)
    .set({
      email: email,
      uid: id,
      firstName: user.firstName,
      lastName: user.lastName
    })
    .then(() => user)
}
