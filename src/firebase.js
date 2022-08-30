import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mapit-693ad.firebaseapp.com",
  projectId: "mapit-693ad",
  storageBucket: "mapit-693ad.appspot.com",
  messagingSenderId: "151072517978",
  appId: "1:151072517978:web:dae49de77581a420b68d63",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
