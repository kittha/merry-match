import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/users/HomePage';
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <HomePage />
      </div>
    </Router>
  );
};

export default App;
