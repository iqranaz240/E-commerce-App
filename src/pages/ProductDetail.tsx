import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { addCartItem, removeCartItem, decreaseQuantity } from '../store/reducers/cartSlice';
import { CartItem } from '../store/reducers/cartSlice';
import Counter from '../components/common/Counter';

interface CardDetailsProps {
  id: number;
  imgdata: string;
  rname: string;
  price: number;
  address: string;
  qnty: number;
  rating: number;
  somedata: string;
}

const CardsDetails: React.FC = () => {
  const [data, setData] = useState<CardDetailsProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);
  const history = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state: any) => state.productReducer.products);
  const cartData = useSelector((state: RootState) => state.cartReducer.carts);

  console.log('Cart data in card: ', cartData);

  useEffect(() => {
    const compareData = productData.filter((e: CardDetailsProps) => e.id === itemId);
    setData(compareData);
  }, [itemId, productData, cartData]);

  const cart = cartData.filter((card) => card.id === itemId);
  console.log('cart: ', cart);

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
    history('/'); // Navigate to the root route
  };

  return (
    <div className="container mt-2">
      <section className="container mt-3">
        <div className="iteamsdetails">
          {data.map((ele: CardDetailsProps) => (
            <div key={ele.id}>
              <div className="items_img">
                <img src={ele.imgdata} alt={ele.rname} />
              </div>

              <div className="details">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          <strong>Restaurant</strong> : {ele.rname}
                        </p>
                        <p>
                          <strong>Price</strong> : {ele.price}
                        </p>
                        <p>
                          <strong>Dishes</strong> : {ele.address}
                        </p>
                        <p>
                          <strong>Total</strong> : {ele.price}
                        </p>
                        <Counter cart={ele} />
                        <p>
                          <br />
                          <strong>Remove :</strong>{' '}
                          <i
                            className="fas fa-trash"
                            onClick={() => dlt(ele.id)}
                            style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}
                          ></i>
                        </p>
                        <hr />
                        <p>
                          <strong>Rating :</strong>{' '}
                          <span style={{ background: 'green', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}>
                            {ele.rating} ★
                          </span>
                        </p>
                        <p>
                          <strong>Order Review :</strong> <span>{ele.somedata}</span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CardsDetails;
