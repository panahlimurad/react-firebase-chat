import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy6BYYJ0BgKraehQYWUX1-56YlVlnFCHw",
  authDomain: "chatreact-e7446.firebaseapp.com",
  databaseURL:
    "https://chatreact-e7446-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatreact-e7446",
  storageBucket: "chatreact-e7446.appspot.com",
  messagingSenderId: "916001567777",
  appId: "1:916001567777:web:8fb1cffd945119d619df60",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, analytics, db, provider };
