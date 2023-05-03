// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB573Tzzt1WsqB7Re5BNrpD7ZUOYyixjOI",
  authDomain: "geochat-473a9.firebaseapp.com",
  projectId: "geochat-473a9",
  storageBucket: "geochat-473a9.appspot.com",
  messagingSenderId: "222094061202",
  appId: "1:222094061202:web:0bd0a54a7680e7d05a404b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();