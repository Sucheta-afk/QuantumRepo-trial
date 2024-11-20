import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

// Check if critical Firebase environment variables are loaded correctly
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  console.error("Missing Firebase environment variables");

  // Only throw an error on the server side (for SSR or API routes)
  if (typeof window === "undefined") {
    throw new Error("Firebase environment variables are missing.");
  }
}

// Initialize Firebase only if not already initialized
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
} else {
  getApp();
}

// Get Firebase Auth instance
const auth: Auth = getAuth();

export { auth };
