import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkUOAHmerzQBfPtqdzsrYn886ndx4J30I",
  authDomain: "miniblogreact-fcec8.firebaseapp.com",
  projectId: "miniblogreact-fcec8",
  storageBucket: "miniblogreact-fcec8.appspot.com",
  messagingSenderId: "658442120272",
  appId: "1:658442120272:web:71fce2eba96fe6c0adf555"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }