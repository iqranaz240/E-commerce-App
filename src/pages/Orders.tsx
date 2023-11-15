import React, { useEffect, useState } from 'react';
import OrderHistory from '../components/OrderHistory';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { getOrderData } from '../services/order'; // Import your getOrderData function
import { auth } from '../services/firebaseAuth';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';

const Order = () => {
  const userId = auth?.currentUser?.uid;
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const data = await getOrderData(userId);
      setOrderData(data);
    };

    fetchOrderData();
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      
        <Typography variant="h4" gutterBottom>
          Order Tracking Page
        </Typography>
        {orderData ? (
          <OrderHistory orders={orderData} />
        ) : (
          <CircularProgress sx={{ mt: 2 }} />
        )}
    </Container>
  );
};

export default Order;
