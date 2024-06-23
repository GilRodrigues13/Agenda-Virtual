// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC27vaQfePzycNvVGKeCxxOfK78cPNEGO0",
    authDomain: "agenda-backend-410d5.firebaseapp.com",
    projectId: "agenda-backend-410d5",
    storageBucket: "agenda-backend-410d5.appspot.com",
    messagingSenderId: "285175744111",
    appId: "1:285175744111:web:b78a1236d80708564bef9a",
    measurementId: "G-YHYHLMZ16F"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, onAuthStateChanged, signOut};
