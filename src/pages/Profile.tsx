import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Button } from '@mui/material';
import { Form } from '../components/common/Form';
import { auth } from '../services/firebaseAuth';
import { getUserData, updateUserProfile } from '../services/userData';

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const userId = auth?.currentUser?.uid;
    console.log('User Id: ', userId)
    const fetchData = async () => {
      try {
        const data = await getUserData(userId);
        console.log(data)
        setFormData(data || {});
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      await updateUserProfile(formData);
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <Grid container spacing={3}>
        <Form
          formData={formData}
          onInputChange={handleInputChange}
          onCheckout={handleEditProfile}
          signup={false}
          type='Update Profile'
        />
      </Grid>
    </Container>
  );
}
