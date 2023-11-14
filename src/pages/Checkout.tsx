import React, { useState } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import { Form } from '../components/common/Form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/main';
import { GetOrderTotal } from '../services/orderTotal';
import ProductCart from '../components/ProductCart';
import { createOrder } from '../services/order';
import { auth } from '../services/firebaseAuth';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const cartData = useSelector((state: RootState) => state.cartReducer.carts);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });
    const navigate = useNavigate();

    const price = GetOrderTotal();
    const deleteButton = false;
    const counter = false;
    const userId = auth?.currentUser.uid;
    console.log(userId)

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckout = async () => {
        console.log(cartData)
        let dataObject: any = {};

        // Iterate over the input data and populate the dataObject
        cartData.forEach(item => {
            const { id, ...rest } = item;
            dataObject[id] = { ...rest };
        });

        console.log(dataObject);
        // const data = {}
        // {cartData.map((e: any) => {

        // })

        if (userId) {
            await createOrder(userId, dataObject)
            console.log('Order placed:', { formData });
            // Reset form after checkout
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
            });
        }
        else {
            navigate('/login')
        }
        // Perform checkout logic here (e.g., send order to backend) 
    }



    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h6">Products</Typography>
                    <ProductCart data={cartData} deleteButton={deleteButton} counter={counter} />
                    <Typography variant="h6">Grand Total: {price}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Shipping Information:</Typography>
                    <Form
                        formData={formData}
                        onInputChange={handleInputChange}
                        onCheckout={handleCheckout}
                        signup={false}
                        type='Checkout'
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Checkout;
