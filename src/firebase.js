import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDoS-pNk0QtK63aKPQzkZKljuEfYCMsXxw",
  authDomain: "pear-demo-day.firebaseapp.com",
  databaseURL: "https://pear-demo-day-default-rtdb.firebaseio.com",
  projectId: "pear-demo-day",
  storageBucket: "pear-demo-day.appspot.com",
  messagingSenderId: "148825504766",
  appId: "1:148825504766:web:080efba2c060978d789eaf",
  measurementId: "G-4QF0ET0SS0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set };
