import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/Header';
import CardsDetails from './components/CardsDetails'; // Correct the import path
import Cards from './components/Cards';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
