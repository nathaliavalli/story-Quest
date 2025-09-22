/**
 * Firebase configuration and initialization.
 * This file sets up the Firebase client SDK and exports the Firestore instance.
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration object.
 * Uses environment variables for API keys and other sensitive information.
 * Environment variables should be stored in a `.env.local` file.
 * Keys must be prefixed with `NEXT_PUBLIC_` for client-side access in Next.js.
 */
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "storyquest-fcdc2",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Initialize Firebase app.
 */
const app = initializeApp(firebaseConfig);

/**
 * Get Firestore instance.
 */
const db = getFirestore(app);

/**
 * Export the initialized Firestore instance.
 * This instance can be imported and used in other modules.
 */
export { db };

