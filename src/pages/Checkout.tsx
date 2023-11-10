// Checkout.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { CartItem } from '../store/reducers/cartSlice';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Grid,
} from '@mui/material';

import { GetOrderTotal } from '../services/orderTotal';
import ProductCart from '../components/ProductCart';

const Checkout: React.FC = () => {
    const cartData = useSelector((state: RootState) => state.cartReducer.carts);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });
    const price = GetOrderTotal();
    const deleteButton = false;
    const counter = false;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckout = () => {
        // Perform checkout logic here (e.g., send order to backend)
        console.log('Order placed:', { formData, cartData });
        // Reset form after checkout
        setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '' });
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h6">Selected Items:</Typography>
                    <ProductCart data={cartData} deleteButton={deleteButton} counter={counter} />
                    <Typography variant="h6">Grand Total: {price}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Shipping Information:</Typography>
                    <form>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="standard-multiline-static"
                            label="Address"
                            multiline
                            rows={4}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                            placeholder="Address"
                            style={{ width: '100%', marginTop: '1rem' }}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {/* <TextareaAutosize
              rowsMin={3}
              placeholder="Address"
              style={{ width: '100%', marginTop: '1rem' }}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            /> */}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '1rem' }}
                            onClick={handleCheckout}
                        >
                            Place Order
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;
