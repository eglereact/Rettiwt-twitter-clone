// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhOzzI9Fi-ay6A28eS3M3_wZUOOVsuHZA',
  authDomain: 'rettiwt-1d873.firebaseapp.com',
  projectId: 'rettiwt-1d873',
  storageBucket: 'rettiwt-1d873.appspot.com',
  messagingSenderId: '440771002934',
  appId: '1:440771002934:web:aacccd69953d9ce7360e97',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
