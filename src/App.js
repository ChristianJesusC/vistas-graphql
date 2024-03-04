// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginView from './components/Login';
import RegisterView from './components/Register';
import ViewView from './components/View';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
      <Route path="/view" element={<ViewView />} />
    </Routes>
  );
}

export default App;
