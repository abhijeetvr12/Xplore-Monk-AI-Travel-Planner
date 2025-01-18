// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYHWN2VV1ErTWySOYOhgBvBZCuPK4v5mE",
  authDomain: "online-job-portal-837f6.firebaseapp.com",
  projectId: "online-job-portal-837f6",
  storageBucket: "online-job-portal-837f6.firebasestorage.app",
  messagingSenderId: "173696518475",
  appId: "1:173696518475:web:2a8c8741627fe8885fc0ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)