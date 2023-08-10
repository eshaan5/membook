import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMorcWL_O8yOEnqpj-nHdrLf7w1VKXuoM",
  authDomain: "membook.firebaseapp.com",
  projectId: "membook",
  storageBucket: "membook.appspot.com",
  messagingSenderId: "163298352328",
  appId: "1:163298352328:web:3f4bc2776997d72279d9fd",
  measurementId: "G-3C6P6JJ4JW",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
