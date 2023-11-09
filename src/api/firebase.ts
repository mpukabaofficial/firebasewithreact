import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Use environment variables to secure your Firebase configuration
const prefix = import.meta.env;
const firebaseConfig = {
  apiKey: prefix.VITE_APP_API_KEY,
  authDomain: prefix.VITE_APP_AUTH_DOMAIN,
  projectId: prefix.VITE_APP_PROJECT_ID,
  storageBucket: prefix.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: prefix.VITE_APP_MESSAGING_SENDER_ID,
  appId: prefix.VITE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize the firestore service
const db = getFirestore();

//
const auth: Auth = getAuth(app);

// Export the firestore
export { auth, db };
export default app;
