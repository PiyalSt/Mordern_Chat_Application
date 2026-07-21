import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAL5HXlt2JEonZs6xR1w7_ZiUbnbBD1WJc",
  authDomain: "signup-pages-3213c.firebaseapp.com",
  projectId: "signup-pages-3213c",
  storageBucket: "signup-pages-3213c.firebasestorage.app",
  messagingSenderId: "380139339870",
  appId: "1:380139339870:web:89628b299b01e9858eb4cf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const database = getDatabase(app)