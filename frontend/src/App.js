import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MealSearch from './components/publicAPISearch';
import MealDetails from './components/mealDetails';
import ReviewPage from './components/reviewPage';
import ReviewList from './components/reviewList';
import ReviewDetailPage from './components/mealreviewDetails';
import Header from './components/header';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MealSearch />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/reviewlist" element={<ReviewList/>}/>
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
      </Routes>
  </>

  );
}

export default App;
