import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "../Star/StarRating";
import styles from "./RestaurantReviews.module.css";
import { useAuth } from "../../AuthContext ";
import EditReview from "../EditReview/EditReview";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";

const RestaurantReviews = ({ onCloseRestaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({
    rating: 0,
    review: "",
    suggestion: "",
  });
  const navigate = useNavigate();
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

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditForm({
      rating: review.rating,
      review: review.review,
      suggestion: review.suggestion,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/api/v1/reviews/${editingReviewId}`,
        editForm
      );
      setReviews(
        reviews.map((review) =>
          review._id === editingReviewId ? { ...review, ...editForm } : review
        )
      );
      setEditingReviewId(null);
      setEditForm({ rating: 0, review: "", suggestion: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <button className={styles.btnBack} onClick={() => navigate("/app")}>
        &larr;
      </button>
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
                {editingReviewId === review._id ? (
                  <EditReview
                    onReviewUpdate={handleUpdate}
                    editForm={editForm}
                    onInputChange={handleEditChange}
                    setEditForm={setEditForm}
                    setEditingReviewId={setEditingReviewId}
                  />
                ) : (
                  <>
                    <h3>
                      {review.name} by {review.username}
                    </h3>
                    <StarRating
                      rating={review.rating}
                      setRating={() => {}}
                      maxRating={5}
                      disabled
                    />
                    <p>Review: {review.review}</p>
                    <p>Suggestions: {review.suggestion}</p>
                  </>
                )}
              </div>
              {user?.name === review.username && !editingReviewId && (
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(review)}>Edit</button>
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
