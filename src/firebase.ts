import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Use environment variables to secure your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVOayc3zLim7tAZadevFgsYR4IBIbbCp4", // Replace with your environment variable
  authDomain: "fir-with-react-8250c.firebaseapp.com", // Replace with your environment variable
  projectId: "fir-with-react-8250c", // Replace with your environment variable
  storageBucket: "fir-with-react-8250c.appspot.com", // Replace with your environment variable
  messagingSenderId: "290977647242", // Replace with your environment variable
  appId: "1:290977647242:web:0769e7cee90c4b0ed3fb73", // Replace with your environment variable
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
