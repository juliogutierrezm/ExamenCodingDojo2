// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieReviewList from './components/MovieReviewList';
import MovieForm from './components/MovieForm';
import ReviewForm from './components/ReviewForm';
import ReviewDetails from './components/ReviewDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieReviewList />} />
        <Route path="/product/:id/*" element={<ReviewForm />} />
        <Route path="/form" element={<MovieForm />} />
        <Route path="/review/:id" element={<ReviewDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
