import React from 'react';
import Header from '../../components/homepage/Header';
import FirstSection from '../../components/homepage/FirstSection';
import { BrowserRouter as Router } from 'react-router-dom';

const HomePage = () => {
  return (
    <Router>
      <Header />
      <FirstSection />
      
    </Router>
  );
};

export default HomePage;