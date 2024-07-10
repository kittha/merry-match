import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from '../users/HomePage'
import Navbar from '../../components/navbar/Navbar';

const UnauthenticatedApp = () => {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<HomePage />} />
        </Routes>
    </Router>
  );
};

export default UnauthenticatedApp;