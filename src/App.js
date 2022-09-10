import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ListTerm from './components/list-term.component';
import EditTerm from './components/edit-term.component';
import CreateTerm from './components/create-term.component';
import DeleteTerm from './components/delete-term.component';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Glossary App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">List Term</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Term</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Routes>
          <Route path="/" exact element={<ListTerm />} />
          <Route path="/edit/:id" element={<EditTerm />} />
          <Route path="/create" element={<CreateTerm />} />
          <Route path="/delete/:id" element={<DeleteTerm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;