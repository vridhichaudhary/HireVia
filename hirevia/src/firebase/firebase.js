// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXYEgmTFPKux4xz7jGrF5mBTKKb6YgTtM",
  authDomain: "hirevia-be075.firebaseapp.com",
  projectId: "hirevia-be075",
  storageBucket: "hirevia-be075.appspot.com", 
  messagingSenderId: "739779275200",
  appId: "1:739779275200:web:59d50532a2b1f7d1b54025",
  measurementId: "G-K0FZ7BW08F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
