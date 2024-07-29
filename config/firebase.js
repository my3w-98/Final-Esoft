import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
