import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { removeCartItem } from '../store/reducers/cartSlice';
import ProductCart from './ProductCart';
import { GetOrderTotal } from '../services/orderTotal';
import Checkout from '../pages/Checkout';
import { Button, Typography, Box } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = (props: any) => {
  const getdata = useSelector((state: RootState) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const price = GetOrderTotal();

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

  useEffect(() => {}, [getdata]);

  return (
    <>
      {getdata.length ? (
        <>
          <Box position="relative" width={500}>
            <i
              className="fas fa-close smallclose"
              onClick={props.handleClose}
              style={{ position: "absolute", top: 2, marginTop: 10, right: 20, fontSize: 23, cursor: "pointer" }}
            ></i>
            <Typography variant="h5" paddingLeft="1.3rem" marginBottom={1} marginTop={2} > Product Details </Typography>
            <ProductCart data={getdata} deleteButton={true} counter={true} />
            <Box width="22rem" padding="1.3rem" position="relative">
              <Typography variant="h6" marginBottom={3}>Grand Total: {price}</Typography>
              <NavLink to="/checkout">
                <Button variant="contained" style={{ width: "100%" }} endIcon={<ShoppingCartCheckoutIcon />}>
                  Checkout
                </Button>
              </NavLink>
            </Box>
          </Box>
        </>
      ) : (
        <Box className="card_details d-flex justify-content-center align-items-center" width="24rem" padding={10} position="relative">
          <i
            className="fas fa-close smallclose"
            onClick={props.handleClose}
            style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}
          ></i>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <img src="./cart.gif" alt="" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
        </Box>
      )}
    </>
  );
};

export default Cart;
