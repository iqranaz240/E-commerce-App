import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main'
import { addCartItem, removeCartItem, decreaseQuantity, CartItem } from '../store/reducers/cartSlice';
import Counter from './common/Counter';

const Cart = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state: RootState) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

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

  return (
    <>
          {getdata.length ?
            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
              <Table>
                <thead>
                  <tr>
                    {/* <th>Photo</th>
                    <th>Restaurant Name</th> */}
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                        </NavLink>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price: {e.price}</p>
                        <p>Quantity: {e.qnty}</p>
                        <Counter cart={e} />
                      </td>

                      <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                        <i className='fas fa-trash largetrash'></i>
                      </td>
                    </tr>
                  ))}
                  <p className='text-center'>Total: {price}</p>
                </tbody>
              </Table>
            </div> :

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
