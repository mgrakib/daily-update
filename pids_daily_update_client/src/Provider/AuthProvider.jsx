/** @format */

import { createContext, useEffect, useState } from "react";

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";


import axios from "axios";
import { app } from "../Firebase/Firebase";
import moment from "moment";

export const AuthContext = createContext({});
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState("null");
	const [loading, setLoading] = useState(true);
	
	let [isOpen, setIsOpen] = useState(false);

	const [reportDate, setReportDate] = useState(
		moment(new Date()).format("YYYY-MM-DD")
	);

	// sing up
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// update usr name photo
	const updateUserNamePhoto = (dName, pURL) => {
		return updateProfile(auth.currentUser, {
			displayName: dName,
			photoURL: pURL,
		});
	};

	// login
	const userLogin = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleProvider = new GoogleAuthProvider();

	const googleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		signOut(auth);
	};

	// onAuthStateChanged
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false);
			
		});

		return () => unsubscribe();
	}, []);

	const authInfo = {
		user,
		loading,
		setLoading,
		createUser,
		updateUserNamePhoto,
		userLogin,
		googleLogin,
		logOut,
		isOpen,
		setIsOpen,
		reportDate,
		setReportDate,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
