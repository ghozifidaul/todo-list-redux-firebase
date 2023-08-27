import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKlRN8cQqAgOed1b8REWFBw9JNT9Ce6HM",
  authDomain: "my-projects-c72e7.firebaseapp.com",
  projectId: "my-projects-c72e7",
  storageBucket: "my-projects-c72e7.appspot.com",
  messagingSenderId: "433723314300",
  appId: "1:433723314300:web:23138b9012b1910ee779f9",
  measurementId: "G-PD9GEZ9FL9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export default app;
