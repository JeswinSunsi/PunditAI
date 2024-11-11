import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmNyUlLRBdWcGtA85L_hIZXmJkkBkOWUo",
  authDomain: "pundit-5e0cd.firebaseapp.com",
  projectId: "pundit-5e0cd",
  appId: "1:946254864278:web:08c182ebe5be2b0fe547b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };