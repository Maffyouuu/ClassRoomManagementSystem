/* import firebase from 'firebase/app';
import 'firebase/auth';
import '@firebase/firestore' */
//import { initializeApp } from "firebase/app";
//import firebaseApp from 'firebase/app'
//import 'firebase/compat/auth';
//import { getFirestore} from "@firebase/fireStore";

import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}



const app = initializeApp(firebaseConfig);
export const auth = app.auth();

//get db access for CRUD features
export const db = getFirestore(app);

export default app;