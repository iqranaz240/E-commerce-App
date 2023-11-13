import { app } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set, onValue, get } from "firebase/database";
import { database, firebaseConfig } from "../firebase/firebaseConfig";
import axios from 'axios';

interface Form {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password?: string;
}

export const auth: any = getAuth(app);
const db = database;
const userId = auth?.currentUser?.uid;

// ... (imports and interfaces remain the same)

export const signupUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        return user;
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
        throw new Error(errorMessage);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
        throw new Error(errorMessage);
    }
};

    export const signout = async () => {
        try {
          await signOut(auth);
          console.log('User logout successfully');
        } catch (error) {
          // An error happened.
          console.error(error);
        }
      };