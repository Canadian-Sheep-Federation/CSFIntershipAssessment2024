import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "../Star/StarRating";
import styles from "./VisitedRestaurants.module.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext ";

const VisitedRestaurants = ({ onCloseRestaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/reviews`
        );
        setReviews(response.data.data.reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleEdit = (reviewId) => {
    console.log(`Edit review with id: ${reviewId}`);
    // Implement the edit functionality
  };

  const handleDelete = async (reviewId) => {
    console.log(`Delete review with id: ${reviewId}`);
    try {
      await axios.delete(`http://localhost:8000/api/v1/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  // Filter reviews to show only those posted by the logged-in user
  const userReviews = reviews.filter(
    (review) => review.username === user?.name
  );

  return (
    <div>
      <button onClick={onCloseRestaurant}>&larr;</button>
      <h2 className={styles.reviews}>All Visited Restaurants</h2>
      {userReviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className={styles.reviewContainer}>
          {userReviews.map((review) => (
            <div key={review._id} className={styles.reviewItem}>
              <div className={styles.image}>
                {review.imageCover && (
                  <img src={review.imageCover} alt={review.name} />
                )}
              </div>
              <div className={styles.reviewContent}>
                <h3>
                  {review.name} by {review.username}
                </h3>
                <StarRating
                  rating={review.rating}
                  setRating={() => {}} // Not updating rating
                  maxRating={5}
                  disabled={true} // Disable the rating component
                />
                <p>Review: {review.review}</p>
                <p>Suggestions: {review.suggestion}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleEdit(review._id)}>✏️</button>
                <button onClick={() => handleDelete(review._id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate("/restaurants")}
        className={styles.btnViewReviews}
      >
        View What Others Have to Say
      </button>
    </div>
  );
};

export default VisitedRestaurants;
