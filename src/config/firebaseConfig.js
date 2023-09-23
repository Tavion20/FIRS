// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8sflOQTOLMMUNsBSr8UWd_0YGIW8_iKo",
  authDomain: "firs-ef624.firebaseapp.com",
  projectId: "firs-ef624",
  storageBucket: "firs-ef624.appspot.com",
  messagingSenderId: "76594151170",
  appId: "1:76594151170:web:fb18dfdd0fe8eb889f8c1b",
  measurementId: "G-EC1CXM5B1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
