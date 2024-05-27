import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchedReview, setSearchedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/forms');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/forms/${searchId}`);
      setSearchedReview(response.data);
    } catch (error) {
      console.error('Error fetching review by ID:', error);
      setSearchedReview(null);
    }
  };

  const handleViewAll = () => {
    setSearchId('');
    setSearchedReview(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter review ID"
          className="mr-2 border-gray-300 rounded-lg p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
        <button onClick={handleViewAll} className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2">View All</button>
      </div>
      {searchedReview ? (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{searchedReview.songName}</h3>
          <p className="text-lg mb-2">Rating: {searchedReview.rating}</p>
          <p className="mb-2">{searchedReview.comments}</p>
        </div>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{review.songName}</h3>
              <p className="text-lg mb-2">Rating: {review.rating}</p>
              <p className="mb-2">{review.comments}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
