import React, { useState } from 'react';
import { Typography, Grid, Container, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/reducers/userSlice';
import { loginUser } from '../services/firebaseAuth';
import { useNavigate } from 'react-router-dom';
// Import your loginUser function or login logic here if available
// import { loginUser } from '../services/firebase';

const LoginUser: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async() => {
        await loginUser(formData.email, formData.password);
        navigate('/');
    }

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                User Login
            </Typography>
            <Grid container spacing={3}>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1rem', height: '4rem' }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Grid>
        </>
    );
};

export default LoginUser;
