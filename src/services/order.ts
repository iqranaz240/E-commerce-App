import { app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from "firebase/database";
import { database, firebaseConfig } from "../firebase/firebaseConfig";
import axios from 'axios';
import { CartItem } from '../store/reducers/cartSlice';
import { createUser } from './userData';

export const auth: any = getAuth(app);

export const createOrder = async (userId: any, orderDate: Date, order: any) => {
    const apiUrl = `${firebaseConfig.databaseURL}/orders.json`;
    console.log(apiUrl)
    const data: any = {
        userId: userId,
        orderDate: orderDate,
        order: {...order}
    }
    console.log('Order Data', data)
    // if (userId && order.length)
    try {
      const response = await axios.post(apiUrl, data);
      // Handle success if needed
      console.log('Order placed successfully: ', response);
    } catch (error) {
      // Handle errors
      console.error('Error placing order:', error);
    }
};

export const getOrderData = async (userId: string = auth?.currentUser?.uid) => {
    if (userId) {
        try {
          const snapshot = await get(ref(database, '/orders/'));
          const orders = snapshot.val();

            if (orders) {
                // Filter orders by user ID
                const userOrders = Object.entries(orders).reduce((acc, [orderId, order]) => {
                    if (order.userId === userId) {
                        acc[orderId] = order;
                    }
                    return acc;
                }, {});

                console.log(userOrders);
                return userOrders;
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    }
    return null;
};


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