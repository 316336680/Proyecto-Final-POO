import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCicSkXRvQeRaTPhBcNNxXSBtxAVRcPAWc",
  authDomain: "notascocina-db868.firebaseapp.com",
  projectId: "notascocina-db868",
  storageBucket: "notascocina-db868.appspot.com",
  messagingSenderId: "180906256797",
  appId: "1:180906256797:web:0963ed9401ac80827de774",
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const storage = firebase.storage()

export default{
    firebase,
    db,
    storage,
}