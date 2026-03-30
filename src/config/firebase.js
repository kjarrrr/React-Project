import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyEP-g2obKig0RKErYwW1buWDPy9polSk",
  authDomain: "final-project-9eb41.firebaseapp.com",
  projectId: "final-project-9eb41",
  storageBucket: "final-project-9eb41.firebasestorage.app",
  messagingSenderId: "175826192075",
  appId: "1:175826192075:web:c211c8d468610972d4bd4e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export { provider }
export const db = getDatabase(app);
export const storage = getStorage(app);