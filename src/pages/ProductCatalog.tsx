import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../store/reducers/cartSlice';
import { RootState } from '../store/reducers/main';
import { auth } from '../services/firebaseAuth';
import Container from '@mui/material/Container';

const Cards = () => {
  const products = useSelector((state: RootState) => state.productReducer.products);
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();

  const send = (item: any) => {
    console.log('Adding item to the cart:', item);
    dispatch(addCartItem(item));
  };

  return (
    <Container >
      <Grid container spacing={12} justifyContent="center" alignItems="stretch" marginTop={2}>
        {products.map((element, id) => (
          <Grid item key={id} xs={12} sm={6} md={4}>
            <Card sx={{ width: '100%', height:'25rem', display: 'flex', flexDirection: 'column' }}>
              <NavLink to={`/cart/${element.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  alt={element.rname}
                  height="250"
                  image={element.imgdata}
                />
              </NavLink>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5" component="div">
                  {element.rname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {element.address}
                </Typography>
                <Typography variant="h6" component="div">
                  PKR {element.price}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" onClick={() => send(element)}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
