import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx0BHLRQ9bF57FWFd2Mb5U-KhN8uXvPnI",
  authDomain: "bravo-event-hub-backend.firebaseapp.com",
  projectId: "bravo-event-hub-backend",
  storageBucket: "bravo-event-hub-backend.firebasestorage.app",
  messagingSenderId: "611705233151",
  appId: "1:611705233151:web:fc7f23e87b38850645f6ca",
  measurementId: "G-1HBXK6JEF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign In Function
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export { auth };