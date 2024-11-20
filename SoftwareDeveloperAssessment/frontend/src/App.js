import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './Components/Movies';
import AddReview from './Components/AddReviews';
import GetReview from './Components/Reviews';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/addReview/:movieId" element={<AddReview/>} />
          <Route path="/getReview/:movieId" element={<GetReview/>} />
        </Routes>

    </Router>
  );
};

export default App;
