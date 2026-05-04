import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx0BHLRQ9bF57FWFd2Mb5U-KhN8uXvPnI",
  authDomain: "bravo-event-hub-backend.firebaseapp.com",
  projectId: "bravo-event-hub-backend",
  storageBucket: "bravo-event-hub-backend.firebasestorage.app",
  messagingSenderId: "611705233151",
  appId: "1:611705233151:web:fc7f23e87b38850645f6ca",
  measurementId: "G-1HBXK6JEF9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
