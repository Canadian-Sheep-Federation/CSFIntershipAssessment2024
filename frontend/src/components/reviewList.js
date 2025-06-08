import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // fetching all the reviews submitted
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/reviews');
        const data = await response.json();
        console.log(response);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch reviews');
        }

        setReviews(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchReviews();
  }, []);

  const goToDetails = (id) => {
    navigate(`/reviews/${id}`);
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Reviews</h2>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {reviews.length === 0 ? (
        <p className="text-center">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
              <div key={review._id} className="flex items-center border rounded-md p-4 shadow-md">

                {review.mealImage && (
                    <img
                        src={review.mealImage}
                        alt={review.mealTitle}
                        className="w-20 h-20 object-cover rounded mr-4"
                    />
                )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{review.mealTitle}</h3>
                    <p className=" mb-2">
                        <strong> By </strong>{review.userName} 
                    </p>
                    <p className=" mb-2">
                        <strong> Rating: </strong>{review.rating}/10
                    </p>

              <button
                onClick={() => goToDetails(review._id)}
                className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 text-sm"
              >
                View Details
              </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviewsPage;