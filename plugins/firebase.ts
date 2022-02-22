import firebase from 'firebase'
import 'firebase/analytics'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB4Ya-XYDP7glHrvhhcQ-vP5BvROdXS3ds',
    authDomain: 'portfolio21-56e7e.firebaseapp.com',
    projectId: 'portfolio21-56e7e',
    storageBucket: 'portfolio21-56e7e.appspot.com',
    messagingSenderId: '515187296876',
    appId: '1:515187296876:web:6dc12de78358be1c81a649',
    measurementId: 'G-JGPW8TVGZP',
  })
  if (process.browser) {
    firebase.analytics()
  }
}

export default firebase
