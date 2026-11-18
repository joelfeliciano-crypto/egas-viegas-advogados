import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"

// Firebase web config is public by design; access is protected by Firestore Security Rules.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAvbG0eri6Q_WzBEjJMRTU8_sHIQWMJJg4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "egasviegasadvogacia.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "egasviegasadvogacia",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "egasviegasadvogacia.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "276365623743",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:276365623743:web:802b8878abc3ec7463610a",
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
