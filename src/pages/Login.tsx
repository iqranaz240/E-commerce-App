import React from 'react'
import LoginUser from '../components/Login'
import { NavLink } from 'react-router-dom'
import { Container } from '@mui/material'

export default function Login() {
  return (
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <LoginUser />
      <br/>
      <p >New User? <NavLink to='/register' > Register </NavLink> </p>
      </Container>
  )
}
