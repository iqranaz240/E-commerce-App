import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Container } from '@mui/material';
import { Form } from '../components/common/Form';
import { signupUser } from '../services/firebaseAuth';
import { createUser} from '../services/userData'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/reducers/userSlice';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
    });
    const signup = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignup = async () => {
        try {
            console.log('User Signup:', { formData });

            // Perform user signup and get the result
            const signup = await signupUser(formData.email, formData.password);
            if (signup) {
                // Create a new user object with login set to true
                const newUser = { ...formData, login: true };
                console.log('Signup data form: ', signup)
                createUser(signup.uid, {...formData})
                await dispatch(addUser(newUser));

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    password: '',
                });

                navigate('/');
                console.log('User successfully signed up:', newUser);
            }
        } catch (error) {
            console.error('Error during user signup:', error);
            // Handle errors (e.g., show an error message to the user)
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                User Registeration
            </Typography>
            <Grid container spacing={3}>
                <Form
                    formData={formData}
                    onInputChange={handleInputChange}
                    onCheckout={handleSignup}
                    signup={signup}
                    type='Register'
                />
            </Grid>
        </Container>
    );
};

export default Signup;
