// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/auth";
import "firebase/compat/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJGZQtPvA2YF7f9xm2cVZ7_SaAPmonanc",
  authDomain: "whatsapp-e7ce0.firebaseapp.com",
  databaseURL: "https://whatsapp-e7ce0-default-rtdb.firebaseio.com",
  projectId: "whatsapp-e7ce0",
  storageBucket: "whatsapp-e7ce0.firebasestorage.app",
  messagingSenderId: "935522476432",
  appId: "1:935522476432:web:1a0b0172ae794e555fd315",
  measurementId: "G-GP3FFLX2YM"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;