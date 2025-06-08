import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ReviewPage = () => {
  const { id: mealId } = useParams(); // Get meal ID from URL
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    userName: '',
    rating: '',
    feedback: '',
    variation: '',
    potluck: false,
  });

  const { mealTitle, mealImage } = location.state || {};
  console.log(mealImage);


  // to handle the chagne 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealId,
          mealTitle,
          mealImage,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }
     

      // get review id from response
      const reviewId = data.review._id;
      toast.success(`Review submitted successfully!ID: ${reviewId}`);
      setFormData({
        userName: '',
        rating: '',
        feedback: '',
        variation: '',
        potluck: false,
      });

      // navigate to another page or stay here
      setTimeout(() => { navigate(`/reviews/${reviewId}`); }, 3000);
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (

    <>
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

        <h2 className="text-2xl font-bold mb-4 text-center">Leave a Review</h2>

        {mealTitle && (
          <div className="mb-6 text-center">
            {mealImage && (
              <img src={mealImage} alt={mealTitle} className="w-full max-h-60 object-cover rounded mb-3" />
            )}
            <h2 className="text-xl font-semibold ">{mealTitle}</h2>
          </div>
        )}




        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="userName"
            placeholder="Your name"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            name="rating"
            min="1"
            max="10"
            placeholder="Rating (1-10)"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="feedback"
            placeholder="Your feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="variation"
            placeholder="Any recipe variations you tried?"
            value={formData.variation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <label className="flex items-center">
            <input
              type="checkbox"
              name="potluck"
              checked={formData.potluck}
              onChange={handleChange}
              className="mr-2"
            />
            Would you take this to a potluck?
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>


      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );

}

export default ReviewPage;