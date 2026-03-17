// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf7wNC1am0JgY0eRkpP1X0wp7mWX_P_5c",
  authDomain: "stechi-viajes.firebaseapp.com",
  projectId: "stechi-viajes",
  storageBucket: "stechi-viajes.firebasestorage.app",
  messagingSenderId: "55945502924",
  appId: "1:55945502924:web:2ec715ec1fedb42fdd6269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
