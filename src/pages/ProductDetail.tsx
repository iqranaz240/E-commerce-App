import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { addCartItem, removeCartItem } from '../store/reducers/cartSlice';
import { DeleteProduct } from '../components/common/DeleteProduct';
import { Box } from '@mui/material';

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
  const [data, setData] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);
  const history = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state: RootState) => state.productReducer.products);
  const cartData = useSelector((state: RootState) => state.cartReducer.carts);

  useEffect(() => {
    const compareData = productData.filter((e: any) => e.id === itemId);
    setData(compareData);
  }, [itemId, productData, cartData]);

  const cart = cartData.filter((card) => card.id === itemId);

  const send = (item: any) => {
    dispatch(addCartItem(item));
  };

  const remove = (id: number) => {
    dispatch(removeCartItem(id));
    history('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {data.map((ele: CardDetailsProps) => (
        <Grid container key={ele.id} spacing={2} marginTop={15} alignSelf='center'>
          <Grid item xs={12} md={8} lg={6}>
            <img src={ele.imgdata} alt={ele.rname} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h5" gutterBottom>
              {ele.rname}
            </Typography>
            <Typography variant="body1">
              <strong>Price:</strong> {ele.price}
            </Typography>
            <Typography variant="body1">
              <strong>Dishes:</strong> {ele.address}
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" marginBottom={4} marginTop={4}>
              <Button variant="contained" onClick={() => send(ele)} sx={{ mt: 1, mr: 2, width: 300 }}>
                Add to Cart
              </Button>
              {cart.length > 0 && <DeleteProduct id={ele.id} />}
            </Box>
            <Typography variant="body1">
              <strong>Rating:</strong>{' '}
              <Rating value={ele.rating} precision={0.5} readOnly style={{ verticalAlign: 'middle' }} />
            </Typography>
            <Typography variant="body1">
              <strong>Order Review:</strong> {ele.somedata}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
};

export default CardsDetails;
