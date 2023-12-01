import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD2_lsq4mAOPEjMv3nkk0d1Fg9LclHQeL4",
    authDomain: "prestamos-app-23fcf.firebaseapp.com",
    projectId: "prestamos-app-23fcf",
    storageBucket: "prestamos-app-23fcf.appspot.com",
    messagingSenderId: "1063594074654",
    appId: "1:1063594074654:web:e3e67833e588010d25040f"
};


export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(FirebaseApp);