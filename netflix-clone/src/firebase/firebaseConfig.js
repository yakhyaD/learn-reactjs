import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBQuN3fjW-8scbwKdR8ms2FJ6-Nb58ecNA",
    authDomain: "netflix-clone-dd7f6.firebaseapp.com",
    projectId: "netflix-clone-dd7f6",
    storageBucket: "netflix-clone-dd7f6.appspot.com",
    messagingSenderId: "858057128661",
    appId: "1:858057128661:web:8497e6e96fc0af1234005c"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()

export default firebase