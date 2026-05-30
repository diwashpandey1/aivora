import { initializeApp, getApps } from 'firebase/app'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

const app = isFirebaseConfigured && !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = isFirebaseConfigured ? getFirestore(app) : null

export const saveScan = async ({ text, detectedType, prediction, confidence }) => {
  if (!db) return null

  return addDoc(collection(db, 'scans'), {
    text,
    detectedType,
    prediction,
    confidence,
    timestamp: serverTimestamp(),
  })
}

export const saveFeedback = async ({
  userPrediction,
  userContentType,
  additionalFeedback,
  aiPrediction,
}) => {
  if (!db) return null

  return addDoc(collection(db, 'feedback'), {
    userPrediction,
    userContentType,
    additionalFeedback,
    aiPrediction,
    timestamp: serverTimestamp(),
  })
}

export const getRecentScans = async () => {
  if (!db) return []

  const scansQuery = query(collection(db, 'scans'), orderBy('timestamp', 'desc'), limit(10))
  const snapshot = await getDocs(scansQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
