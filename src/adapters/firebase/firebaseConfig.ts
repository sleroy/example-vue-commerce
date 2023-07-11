// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from './firebaseCredentials.json'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
export const fireapp = initializeApp(firebaseConfig);
export const fireanalytics = getAnalytics(fireapp);
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(fireapp);

console.log("Firebase connection initialized \u{1F525}")