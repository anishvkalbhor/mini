// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNZZDwLTj13bl83oVxEzbE6MzOGaGM-Qw",
  authDomain: "miniproject-e6207.firebaseapp.com",
  projectId: "miniproject-e6207",
  storageBucket: "miniproject-e6207.appspot.com",
  messagingSenderId: "1010584583262",
  appId: "1:1010584583262:web:77dbeb5997eecd7fff48cf",
  measurementId: "G-SBFRP7XD2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };

const db = getFirestore(app);

export { db };