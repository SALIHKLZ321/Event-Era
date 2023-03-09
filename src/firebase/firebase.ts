// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe6T8R8ZqAZdh-YKtTf57gbMBaNDN6ytY",
  authDomain: "event-era-c837e.firebaseapp.com",
  projectId: "event-era-c837e",
  storageBucket: "event-era-c837e.appspot.com",
  messagingSenderId: "89992519533",
  appId: "1:89992519533:web:c538fc7531a3640a4f0464",
  measurementId: "G-XH553YW2P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();
export const storage = getStorage();
export const auth = getAuth(app);
export default app