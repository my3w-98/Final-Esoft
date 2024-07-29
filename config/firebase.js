import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAsQBWYElzSBMdGb3ja4ZTc0utgp0pFcWQ',
  authDomain: 'lupease-aa89e.firebaseapp.com',
  databaseURL: 'https://lupease-aa89e.firebaseio.com',
  projectId: 'lupease-aa89e',
  storageBucket: 'lupease-aa89e.appspot.com',
  messagingSenderId: '497239452510',
  appId: '1:497239452510:web:1944f2999d6ed0af8b7dcf',
  measurementId: '1:497239452510:web:1944f2999d6ed0af8b7dcf',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
