import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBjdNiAKR4s4D0wT1MxfJkQrVd34kke-yY",
	authDomain: "fakestorestorage.firebaseapp.com",
	databaseURL:
		"https://fakestorestorage-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "fakestorestorage",
	storageBucket: "fakestorestorage.appspot.com",
	messagingSenderId: "68766756754",
	appId: "1:68766756754:web:91b36a875db54e727a5b4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
