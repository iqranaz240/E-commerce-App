import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Container } from '@mui/material';

export interface FormProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        password?: string;
        login?: boolean;
    };
    onInputChange: (name: string, value: string) => void;
    onCheckout: () => void;
    signup: boolean
    type: string
}

export const Form: React.FC<FormProps> = ({ formData, onInputChange, onCheckout, signup, type }) => {
    return (
        <form>
            <TextField
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={(e) => onInputChange('firstName', e.target.value)}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={(e) => onInputChange('lastName', e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
            />
            <TextField
                label="Phone"
                variant="outlined"
                margin="normal"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
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
                onChange={(e) => onInputChange('address', e.target.value)}
            />
            {signup && <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => onInputChange('password', e.target.value)}
            />}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '1rem', height: '4rem' }}
                onClick={onCheckout}
            >
                {type}
            </Button>
        </form>
    );
};
