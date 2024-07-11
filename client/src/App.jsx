import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedApp from './pages/router/AuthenticatedApp';
import UnauthenticatedApp from './pages/router/UnauthenticatedApp';

{/*
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedApp />} />
        <Route path="*" element={<UnauthenticatedApp />} />
      </Routes>
    </Router>
  );
};
*/}


const App = () => {
  return (
    <UnauthenticatedApp/>
  );
};



export default App;

