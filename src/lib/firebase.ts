import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// IMPORTANT: Create a .env.local file in the root of your project
// and add your Firebase project's configuration there.
// Example .env.local file:
// NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
// NEXT_PUBLIC_FIREBASE_APP_ID=1:...

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Conditionally initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firebaseReady = false;

// Check if the keys are just placeholders
const isPlaceholder = (value?: string) => !value || value.includes('your-project-id') || value.endsWith('...');

if (
  !isPlaceholder(firebaseConfig.apiKey) &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    firebaseReady = true;
  } catch (error) {
    console.error("Firebase initialization error:", error);
    firebaseReady = false; 
  }
} else {
  console.warn("Firebase configuration is missing or contains placeholder values. Please check your .env file.");
}


export { app, auth, firebaseReady };
