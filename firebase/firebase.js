import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPREpGnGgWDrApFSi-IEncM-SKc3ICzjg",
  authDomain: "weather-b6b16.firebaseapp.com",
  projectId: "weather-b6b16",
  storageBucket: "weather-b6b16.appspot.com",
  messagingSenderId: "276222585824",
  appId: "1:276222585824:web:4775abeebe668c30c91985"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
