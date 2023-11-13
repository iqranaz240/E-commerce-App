import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../store/reducers/cartSlice';
import { RootState } from '../store/reducers/main'
import { auth } from '../services/firebaseAuth';

const Cards = () => {
  const products = useSelector((state: RootState) => state.productReducer.products); // Get the data from the Redux store
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  console.log('User: ', getUser)
  console.log('Auth: ', auth)

  const send = (item:any) => {
    console.log('Adding item to the cart:', item);
    dispatch(addCartItem(item));
  };

  return (
    <div className='container mt-3'>
      <h2 className='text-center'></h2>

      <div className="row d-flex justify-content-center align-items-center">
        {products.map((element, id) => (
          <Card key={id} style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style" >
            <NavLink to={`/cart/${element.id}`}>
              <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className="mt-3" />
            </NavLink>
            <Card.Body>
              <Card.Title>{element.rname}</Card.Title>
              <Card.Text>
                Price: {element.price}
              </Card.Text>
              <div className="button_div d-flex justify-content-center">
                <Button variant="primary" onClick={() => send(element)} className='col-lg-12'>Add to Cart</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
