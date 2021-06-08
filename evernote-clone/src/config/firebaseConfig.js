import firebase from "firebase"

// Initialize Firebase
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBqimwK2JATcbnTIVIRdXXapZ8wbTMWmpE",
    authDomain: "evernote-clone-6879d.firebaseapp.com",
    projectId: "evernote-clone-6879d",
    storageBucket: "evernote-clone-6879d.appspot.com",
    messagingSenderId: "975191138119",
    appId: "1:975191138119:web:7a5e139d66478a602f3662",
});
const firestore = firebase.firestore()

export { firebaseConfig, firestore }