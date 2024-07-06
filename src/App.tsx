import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FirstPage from './Pages/Firstpage';
import SecondPage from './Pages/Secondpage';
import './App.css'
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/first" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/" element={<Navigate replace to="/first" />} />
      </Routes>
    </Router>
  );
};

export default App;
