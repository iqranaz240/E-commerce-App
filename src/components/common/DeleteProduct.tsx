import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../store/reducers/cartSlice';


export const DeleteProduct = (props: any) => {
    const dispatch = useDispatch();
    const dlt = () => {
        dispatch(removeCartItem(props.id));
      };
    return (
        <div>
            <td className='' style={{ color: "red", fontSize: 25, cursor: "pointer", padding: 20, margin: 10 }} onClick={() => dlt()}>
                <i className='fas fa-trash largetrash'></i>
            </td>
        </div>
    )
}
