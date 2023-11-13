import { app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from "firebase/database";
import { database, firebaseConfig } from "../firebase/firebaseConfig";
import axios from 'axios';
import { CartItem } from '../store/reducers/cartSlice';

export const auth: any = getAuth(app);
const db = database;
const userId = auth?.currentUser?.uid;

export const createOrder = async (userId: any, {id, name, price, quantity}) => {
    const apiUrl = `${firebaseConfig.databaseURL}/orders.json`;
    console.log(apiUrl)
    if (userId && order.length)
    try {
      const response = await axios.post(apiUrl, {
        userId: userId,
        order: {
            id: {
                product: name,
                price: price,
                quantity: quantity
            },
        }
    });
      // Handle success if needed
      console.log('Order placed successfully: ', response);
    } catch (error) {
      // Handle errors
      console.error('Error placing order:', error);
    }
};

// export const getUserData = async (userId: string) => {
//     if (userId) {
//         console.log(userId)
//         const snapshot = await get(ref(db, '/users/' + userId));
//         const user = snapshot.val() || 'Anonymous'; //look into anonymous thing should return null
//         return user;
//     }
//     return null;
// };

// export const updateUserProfile = async ({firstName, lastName, email, phone, address}: Form) => {
//     const apiUrl = `${firebaseConfig.databaseURL}/users/${userId}.json`;
//     console.log(apiUrl)
//     if (firstName && email && phone && address !== '')
//     try {
//       const response = await axios.patch(apiUrl, {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phone: phone, 
//         address: address
//     });

//       // Handle success if needed
//       console.log('User updated successfully: ', response);
//     } catch (error) {
//       // Handle errors
//       console.error('Error updating user:', error);
//     }
//   };