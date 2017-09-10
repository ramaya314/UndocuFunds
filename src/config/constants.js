import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyDpDNxlhXsOyRPrfcKY0nuJ06nr1iZ5MDM",
	authDomain: "undocufunds.firebaseapp.com",
	databaseURL: "https://undocufunds.firebaseio.com",
	projectId: "undocufunds",
	storageBucket: "undocufunds.appspot.com",
	messagingSenderId: "118220269839"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth