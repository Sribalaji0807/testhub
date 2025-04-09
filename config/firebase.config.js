const { initializeApp } = require("firebase/app");
const { getAuth} = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJW9CNA2HXefYAMkulMUTDIrcmA9IguYA",
  authDomain: "ecommerce-website-9c761.firebaseapp.com",
  projectId: "ecommerce-website-9c761",
  storageBucket: "ecommerce-website-9c761.firebasestorage.app",
  messagingSenderId: "181138083661",
  appId: "1:181138083661:web:f186256800823129297104",
  measurementId: "G-NDQ2F7S7F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

module.exports= auth;