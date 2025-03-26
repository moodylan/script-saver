import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNu0vE3oMjiNhGJoUVwStfchL12bjtEPY",
  authDomain: "script-saver.firebaseapp.com",
  projectId: "script-saver",
  storageBucket: "script-saver.firebasestorage.app",
  messagingSenderId: "320644317460",
  appId: "1:320644317460:web:b63962bfce123993138201",
  measurementId: "G-XCVM0LBHHM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
