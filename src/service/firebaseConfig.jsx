// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEurFmYvgOZofMHoAOTQS46oCGRJQPDdM",
  authDomain: "laagan-travel-planner.firebaseapp.com",
  projectId: "laagan-travel-planner",
  storageBucket: "laagan-travel-planner.firebasestorage.app",
  messagingSenderId: "206562515779",
  appId: "1:206562515779:web:744a7fa2bfc07d960e2df6",
  measurementId: "G-K56V10X5WZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);