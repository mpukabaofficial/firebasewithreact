import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVOayc3zLim7tAZadevFgsYR4IBIbbCp4",
  authDomain: "fir-with-react-8250c.firebaseapp.com",
  projectId: "fir-with-react-8250c",
  storageBucket: "fir-with-react-8250c.appspot.com",
  messagingSenderId: "290977647242",
  appId: "1:290977647242:web:0769e7cee90c4b0ed3fb73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
export { auth };
export default app;
