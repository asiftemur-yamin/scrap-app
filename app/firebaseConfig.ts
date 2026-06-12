// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Yahan aapki wohi purani keys aayengi
  apiKey: "AIza...", 
  authDomain: "scrap-world-app.firebaseapp.com",
  projectId: "scrap-world-app",
  storageBucket: "scrap-world-app.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
