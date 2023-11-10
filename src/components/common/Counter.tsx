import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/main'
import { addCartItem, removeCartItem, decreaseQuantity, CartItem } from '../../store/reducers/cartSlice';

const Counter = (props: any) => {
  const dispatch = useDispatch();
  const cart: any = props.cart;
  console.log('props: ', cart)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const send = (cart: CartItem) => {
    dispatch(addCartItem(cart));
  };

  const removeOne = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <>
                        <div className="mt-5 d-flex justify-content-between align-items-center" style={{ width: 100, cursor: 'pointer', background: '#ddd', color: '#111' }}>
                          <span style={{ fontSize: 28, padding: 10 }} onClick={() => (cart && cart.qnty <= 1 ? dlt(cart.id) : removeOne(cart))}>
                            -
                          </span>
                          <span style={{ fontSize: 22, padding: 10 }}>{cart && cart.qnty}</span>
                          <span style={{ fontSize: 28, padding: 10 }} onClick={() => send(cart)}>
                            +
                          </span>
                        </div>
    </>
  );
};

export default Counter;
