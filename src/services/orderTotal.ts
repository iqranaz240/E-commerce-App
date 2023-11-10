import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main'

export const GetOrderTotal = () => {
    const [price, setPrice] = useState(0);
    const getdata = useSelector((state: RootState) => state.cartReducer.carts);
    const total = () => {
        let totalPrice = 0;
        getdata.forEach((ele) => {
          totalPrice += ele.price * ele.qnty;
        });
        setPrice(totalPrice);
      };
    
      console.log('Cart Data ', getdata)
    
      useEffect(() => {
        total();
      }, [getdata]);

      return price;
}