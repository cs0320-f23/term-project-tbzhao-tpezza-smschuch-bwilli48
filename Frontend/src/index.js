// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAk-JpFEV75IephDEoaS36fw0Qvp20-2U8",
	authDomain: "cs32-term-project-ski.firebaseapp.com",
	projectId: "cs32-term-project-ski",
	storageBucket: "cs32-term-project-ski.appspot.com",
	messagingSenderId: "217042651342",
	appId: "1:217042651342:web:0d5a653e9f28b7832aa89f",
	measurementId: "G-59J81SK81Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
	if (user != null) {
		console.log("logged in!");
	} else {
		console.log("no user.");
	}
});
