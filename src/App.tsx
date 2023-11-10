import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import CardsDetails from './pages/ProductDetail'; // Correct the import path
import Cards from './pages/ProductCatalog';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
