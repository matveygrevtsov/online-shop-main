import { initializeApp } from "firebase/app";
import { FirebaseOptions } from "@firebase/app-types";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBRESQuM8FCyd5UL604-FPoi2QvenQFZfY",
  authDomain: "online-shop-9418c.firebaseapp.com",
  projectId: "online-shop-9418c",
  storageBucket: "online-shop-9418c.appspot.com",
  messagingSenderId: "229832791155",
  appId: "1:229832791155:web:58ae6e5d59a3643e0e8606",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
