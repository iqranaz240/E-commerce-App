import { app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from "firebase/database";
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

export const createUser = async (userId: any, {firstName, lastName, email, phone, address}: Form) => {
    try {
        await set(ref(db, 'users/' + userId), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone, 
            address: address
        });
    } catch (error) {
        console.error("Error writing user data to database:", error);
        throw error;
    }
};

export const getUserData = async (userId: string) => {
    if (userId) {
        console.log(userId)
        const snapshot = await get(ref(db, '/users/' + userId));
        const user = snapshot.val() || 'Anonymous'; //look into anonymous thing should return null
        return user;
    }
    return null;
};

export const updateUserProfile = async ({ firstName, lastName, email, phone, address }: Form, userId: string) => {
    const apiUrl = `${firebaseConfig.databaseURL}/users/${userId}.json`;
    console.log(apiUrl)
    if (firstName && email && phone && address !== '')
    try {
      const response = await axios.patch(apiUrl, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone, 
        address: address
    });

      // Handle success if needed
      console.log('User updated successfully: ', response);
    } catch (error) {
      // Handle errors
      console.error('Error updating user:', error);
    }
  };