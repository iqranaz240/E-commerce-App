
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main'
import { addCartItem, removeCartItem, decreaseQuantity, CartItem } from '../store/reducers/cartSlice';
import Counter from './common/Counter';
import { Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Box from '@mui/material/Box';
import { DeleteProduct } from './common/DeleteProduct';

const ProductCart = (props: any) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div className='card_details' style={{ width: "26rem", padding: 10 }}>
            <Table>
                <thead>
                    <tr>
                    <th>Product Details</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((e: any) => (
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
                                {props.counter && <Counter cart={e} />}
                            </td>

                            {props.deleteButton && <DeleteProduct id={e.id} />}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};
export default ProductCart;
