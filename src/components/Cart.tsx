import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main'
import { addCartItem, removeCartItem, decreaseQuantity, CartItem } from '../store/reducers/cartSlice';
import Counter from './common/Counter';
import { Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductCart from './ProductCart';
import { GetOrderTotal } from '../services/orderTotal';
import Checkout from '../pages/Checkout';

const Cart = () => {
  const getdata = useSelector((state: RootState) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const price = GetOrderTotal();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

  console.log('Cart Data ', getdata)

  useEffect(() => {
  }, [getdata]);

  return (
    <>
      {getdata.length ?
        <>
          <ProductCart data={getdata} deleteButton = {true} counter = {true} />
          <div style={{ width: "22rem", padding: "1.3rem", position: "relative" }}>
            <h6 >Grand Total: {price}</h6>
            <br/>
            <NavLink to='/checkout'>
            <Button variant="contained" style={{ width: "24rem"}} endIcon={<ShoppingCartCheckoutIcon />}>
              Checkout
            </Button>
            </NavLink>
          </div>

        </>
        :
        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
          <i className='fas fa-close smallclose'
            onClick={handleClose}
            style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
          <p style={{ fontSize: 22 }}>Your cart is empty</p>
          <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
        </div>
      }
    </>
  );
};

export default Cart;
