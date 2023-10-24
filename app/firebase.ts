// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdSiYKwSptIiQOUnPQmKNI8X1U6zspE7M",
  authDomain: "enomi-8dff9.firebaseapp.com",
  projectId: "enomi-8dff9",
  storageBucket: "enomi-8dff9.appspot.com",
  messagingSenderId: "67474902691",
  appId: "1:67474902691:web:5f0c113a878998e816f916",
  measurementId: "G-27MXPJHVQY"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth();

export {app, auth, db, storage}