import React from 'react'
import LoginUser from '../components/Login'
import { NavLink } from 'react-router-dom'
import { Container, Typography } from '@mui/material'

export default function Login() {
  return (
      <Container maxWidth="md" style={{ marginTop: '10rem' }}>
      <LoginUser />
      
      <Typography marginTop={3}>New User? <NavLink to='/register' > Register </NavLink> </Typography>
      </Container>
  )
}
