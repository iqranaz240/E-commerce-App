import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Chat from '../components/Chat';
import { auth } from '../services/firebaseAuth';

export default function CustomerService() {
  const userId = auth?.currentUser?.uid;
    
  return (
    <Container style={{marginTop: '5rem'}}>
      <Typography variant='h3' style={{textAlign: 'center'}}>Customer Support</Typography>
      <Chat userId={userId} roomId={userId} />
    </Container>
  );
}

