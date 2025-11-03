import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDX_qNbu9IlSu5JfGF6en3QdMFTzHOVH2E",
  authDomain: "gaming-market-analysis.firebaseapp.com",
  projectId: "gaming-market-analysis",
  storageBucket: "gaming-market-analysis.firebasestorage.app",
  messagingSenderId: "422415603001",
  appId: "1:422415603001:web:14b42d61440533862144e8",
  measurementId: "G-MM7G8XS366"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
