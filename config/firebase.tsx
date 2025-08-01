// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ai-kids-story-books.firebaseapp.com",
  projectId: "ai-kids-story-books",
  storageBucket: "ai-kids-story-books.firebasestorage.app",
  messagingSenderId: "298678213662",
  appId: "1:298678213662:web:bb7a590bedf2d9adf3220f",
  measurementId: "G-MP2WZYK9T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);