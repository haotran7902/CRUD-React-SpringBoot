import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import statement for react-router-dom
import ListBookComponent from './components/ListBookComponent';
import AddBookComponent from './components/AddBookComponent';
import Search from './components/Search';

function App() {
  return (
    <div>
      <div className="container">
        <Routes> {/* Update Switch to Routes */}
          <Route path="/" element={<ListBookComponent />} /> {/* Update Route syntax */}
          <Route path="/books" element={<ListBookComponent />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-book" element={<AddBookComponent />} />
          <Route path="/edit-book/:bookcode" element={<AddBookComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;