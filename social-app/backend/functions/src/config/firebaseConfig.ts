import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAnBoMw9L2UR0fZvdP7T7fYsNnwYKifmuk",
    authDomain: "shin-socialapp.firebaseapp.com",
    projectId: "shin-socialapp",
    storageBucket: "shin-socialapp.appspot.com",
    messagingSenderId: "413921405960",
    appId: "1:413921405960:web:cd17741fef8494c6b8f5bd"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export {firebase, firebaseConfig}