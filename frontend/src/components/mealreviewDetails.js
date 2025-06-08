import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [error, setError] = useState('');


  // fetching the review saved to db
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch review');
        }

        setReview(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchReview();
  }, [id]);

  if (error) {
    return <div className="text-red-600 text-center mt-6">{error}</div>;
  }

  if (!review) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-slate-600 hover:text-slate-800 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{review.mealTitle}</h2>
      <img src={review.mealImage} alt={review.mealImage} className="w-60 rounded mb-4" />

      <p className="mb-2"><strong>By:</strong> {review.userName}</p>
      <p className="mb-2"><strong>Rating:</strong> {review.rating}/10</p>
      <p className="mb-2"><strong>Feedback:</strong> {review.feedback}</p>
      {review.variation && (
        <p className="mb-2"><strong>Variation:</strong> {review.variation}</p>
      )}
      <p><strong>Potluck:</strong> {review.potluck ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ReviewDetailPage;
