import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem, decreaseQuantity } from '../store/reducers/cartSlice';

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
  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state: any) => state.cartreducer.carts);

  useEffect(() => {
    const comparedata = getdata.filter((e: CardDetailsProps) => e.id == id);
    setData(comparedata);
  }, [id, getdata]);

  const send = (e: CardDetailsProps) => {
    dispatch(addCartItem(e));
  };

  const dlt = (id: string) => {
    dispatch(removeCartItem(id));
    history('/');
  };

  const removeOne = (item: CardDetailsProps) => {
    dispatch(decreaseQuantity(item.id)); // Assuming item.id is the string ID
  };

  return (
    <div className="container mt-2">

      <section className="container mt-3">
        <div className="iteamsdetails">
          {data.map((ele: CardDetailsProps) => (
            <div key={ele.id}>
              <div className="items_img">
                <img src={ele.imgdata} alt="" />
              </div>

              <div className="details">
                <Table>
                  <tr>
                    <td>
                      <p>
                        <strong>Restaurant</strong> : {ele.rname}
                      </p>
                      <p>
                        <strong>Price</strong> : ₹{ele.price}
                      </p>
                      <p>
                        <strong>Dishes</strong> : {ele.address}
                      </p>
                      <p>
                        <strong>Total</strong> : ₹{ele.price * ele.qnty}
                      </p>
                      <div className="mt-5 d-flex justify-content-between align-items-center" style={{ width: 100, cursor: 'pointer', background: '#ddd', color: '#111' }}>
                        <span style={{ fontSize: 24 }} onClick={() => (ele.qnty <= 1 ? () => dlt(ele.id) : () => removeOne(ele))}>
                          -
                        </span>
                        <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                        <span style={{ fontSize: 24 }} onClick={() => send(ele)}>
                          +
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>
                        <strong>Rating :</strong>{' '}
                        <span style={{ background: 'green', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}>{ele.rating} ★</span>
                      </p>
                      <p>
                        <strong>Order Review :</strong> <span>{ele.somedata}</span>
                      </p>
                      <p>
                        <strong>Remove :</strong>{' '}
                        <i
                          className="fas fa-trash"
                          onClick={() => dlt(ele.id)}
                          style={{ color: 'red', fontSize: 20, cursor: 'pointer' }}
                        ></i>
                      </p>
                    </td>
                  </tr>
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
