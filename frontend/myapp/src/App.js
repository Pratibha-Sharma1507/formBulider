import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FormCreate from './components/FormCreate';
import FormEdit from './components/FormEdit';
import FormView from './components/FormView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<FormCreate />} />
        <Route path="/form/:id/edit" element={<FormEdit />} />
        <Route path="/form/:id" element={<FormView />} />
      </Routes>
    </Router>
  );
}

export default App;
