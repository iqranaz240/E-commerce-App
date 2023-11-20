import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/main';
import { addCartItem, removeCartItem, decreaseQuantity, CartItem } from '../../store/reducers/cartSlice';

const Counter = (props: any) => {
  const dispatch = useDispatch();
  const cart: any = props.cart;
  console.log('props: ', cart);

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const send = (cart: CartItem) => {
    dispatch(addCartItem(cart));
  };

  const removeOne = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  const btnStyle = {
    fontSize: 20,
    padding: 0,
    width: '1rem',
    height: '2rem',
    background: '#ddd',
    borderRadius: '0.4rem',
    cursor: 'pointer',
  }

  const textStyle = {
    textDecoration: 'none',
    color: 'inherit', // Optionally, set the text color to inherit from the parent
  };

  return (
    <>
      <TableContainer> 
        <Table>
            <TableRow style={textStyle}>
              <TableCell style={{border: 0}}>
                <Button
                  style={btnStyle}
                  onClick={() => (cart && cart.qnty <= 1 ? dlt(cart.id) : removeOne(cart))}
                >
                  -
                </Button>
              </TableCell >
              <TableCell style={{ fontSize: 16, textAlign: 'center', border: 0 }}>{cart && cart.qnty}</TableCell>
              <TableCell style={{border: 0}}>
                <Button
                  style={btnStyle}
                  onClick={() => send(cart)}
                >
                  +
                </Button>
              </TableCell>
            </TableRow>
        </Table>
      </TableContainer>
    </>
  );
};

export default Counter;
