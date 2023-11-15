// Checkout.tsx
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import { Form } from '../components/common/Form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { GetOrderTotal } from '../services/orderTotal';
import ProductCart from '../components/ProductCart';
import { createOrder } from '../services/order';
import { auth } from '../services/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../services/userData';
import { clearCart } from '../store/reducers/cartSlice'; // Update this import

const Checkout: React.FC = () => {
  const cartData = useSelector((state: RootState) => state.cartReducer.carts);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const userId: string = auth?.currentUser?.uid;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(userId);
        console.log(data);
        setFormData(data || {});
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckout = async () => {
    const orderItems = cartData.map((item) => ({
      productId: item.id,
      rname: item.rname,
      price: item.price,
      qnty: item.qnty,
      imgdata: item.imgdata,
    }));

    const orderDate = new Date();

    try {
      await createOrder(userId, orderDate, orderItems);
      console.log('Order placed:', { orderItems });

      // Reset form after checkout
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });

      // Remove all items from the cart
      dispatch(clearCart());

      // Redirect to a success page or the home page
      navigate('/'); // Adjust the path as needed
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const price = GetOrderTotal();
  const deleteButton = false;
  const counter = false;

  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={10}>
        {cartData.length && (
          <Grid item xs={6}>
            <Typography variant="h5">Products</Typography>
            <ProductCart data={cartData} deleteButton={deleteButton} counter={counter} />
            <Typography variant="h6" marginTop={5}>
              Grand Total: {price}
            </Typography>
          </Grid>
        )}
        <Grid item xs={6}>
          <Typography variant="h6">Shipping Information:</Typography>
          <Form
            formData={formData}
            onInputChange={handleInputChange}
            onCheckout={handleCheckout}
            signup={false}
            type="Checkout"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
