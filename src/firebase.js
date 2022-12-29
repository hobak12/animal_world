import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGCXQrBRjrHS1wPf6TOJzbRFeUZDaQBM4",
  authDomain: "palpalhajo.firebaseapp.com",
  projectId: "palpalhajo",
  storageBucket: "palpalhajo.appspot.com",
  messagingSenderId: "400460639299",
  appId: "1:400460639299:web:6f2dbd002f849fe1d278f6",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
