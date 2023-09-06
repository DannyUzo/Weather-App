import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnbvb9Jd0BjKuambPzeoDojXnQuqGzij4",
  authDomain: "crud-49d88.firebaseapp.com",
  projectId: "crud-49d88",
  storageBucket: "crud-49d88.appspot.com",
  messagingSenderId: "953923546547",
  appId: "1:953923546547:web:6289e273cd3c82802defc6",
  measurementId: "G-P6L8191J5E"
};

  const app = initializeApp(firebaseConfig);


  export const db = getFirestore(app);