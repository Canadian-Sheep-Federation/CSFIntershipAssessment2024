import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "../Star/StarRating";
import styles from "./RestaurantReviews.module.css";
import { useAuth } from "../../AuthContext ";

const RestaurantReviews = ({ onCloseRestaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null); // Track which review is being edited
  const { user, isLoggedIn } = useAuth();

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
    setEditingReviewId(reviewId);
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

  return (
    <div>
      <button onClick={onCloseRestaurant}>&larr;</button>
      <h2 className={styles.reviews}>All Restaurant Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <div className={styles.reviewContainer}>
          {reviews.map((review) => (
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
                  disabled={editingReviewId !== review._id} // Disable if not editing
                />
                <p>Review: {review.review}</p>
                <p>Suggestions: {review.suggestion}</p>
              </div>
              {user?.name === review.username && (
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(review._id)}>Edit</button>
                  <button onClick={() => handleDelete(review._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantReviews;
