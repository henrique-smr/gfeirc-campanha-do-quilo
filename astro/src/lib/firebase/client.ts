import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDyCLrVjvNjFAmoaaMyinsmDftlH_yjkOs",
	authDomain: "gfeirc.firebaseapp.com",
	databaseURL: "https://gfeirc-default-rtdb.firebaseio.com",
	projectId: "gfeirc",
	storageBucket: "gfeirc.firebasestorage.app",
	messagingSenderId: "1059798373345",
	appId: "1:1059798373345:web:1af4f8bac1061a86aa78a0"
};

export const app = initializeApp(firebaseConfig);
export const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider('6Lc-2asrAAAAAHTM31dMzLCF34Z_e3vBtfZpzvr6'),
	isTokenAutoRefreshEnabled: true
});
export const db = getDatabase(app);
export const auth = getAuth(app);
