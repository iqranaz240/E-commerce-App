import { app } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from "firebase/database";
import { database, firebaseConfig } from "../firebase/firebaseConfig";
import axios from 'axios';
import { CartItem } from '../store/reducers/cartSlice';
import { createUser } from './userData';

export const auth: any = getAuth(app);

interface Product {
    imgdata: string;
    rname: string;
    price: number;
    qnty: number;
  }

export const createOrder =  async (userId: any, orderDate: Date, order: any) => {
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
        const orders: Record<string, { userId: string; orderDate: string; order: Product[] }> | null = snapshot.val();
  
        if (orders) {
          // Filter orders by user ID
          const userOrders = Object.entries(orders)
            .filter(([orderId, order]) => order.userId === userId)
            .map(([orderId, order]) => ({ ...order, orderId })) // Add orderId property
            .sort((orderA, orderB) => {
              const dateA = new Date(orderA.orderDate).getTime();
              const dateB = new Date(orderB.orderDate).getTime();
              return dateB - dateA;
            })
            .reduce((acc, order) => {
              acc[order.orderId] = order;
              return acc;
            }, {} as Record<string, { userId: string; orderDate: string; order: Product[] }>);
  
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