import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoutes from './authRoutes/routes/AuthRoutes'
import UnAuthRoutes from './authRoutes/routes/UnauthRoutes';
import Header from './components/common/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {AuthRoutes}
        {UnAuthRoutes}
      </Routes>
    </Router>
  );
}

export default App;
