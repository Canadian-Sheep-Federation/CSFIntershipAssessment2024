import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "../Star/StarRating";
import EditReview from "../EditReview/EditReview";
import Modal from "../../Modal/Modal";
import styles from "./VisitedRestaurants.module.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext ";
import { API_BASE_URL } from "../../constants";

const VisitedRestaurants = ({ onCloseRestaurant }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    rating: 0,
    review: "",
    suggestion: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/reviews`);
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
    setEditingReview(review);
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
        `${API_BASE_URL}/reviews/${editingReview._id}`,
        editForm
      );
      setReviews(
        reviews.map((review) =>
          review._id === editingReview._id ? { ...review, ...editForm } : review
        )
      );
      setEditingReview(null);
      setEditForm({ rating: 0, review: "", suggestion: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

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
                  setRating={() => {}}
                  maxRating={5}
                  disabled={true}
                />
                <p>Review: {review.review}</p>
                <p>Suggestions: {review.suggestion}</p>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(review)}>✏️</button>
                  <button onClick={() => handleDelete(review._id)}>❌</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingReview && (
        <Modal onClose={() => setEditingReview(null)}>
          <EditReview
            editForm={editForm}
            setEditForm={setEditForm}
            onReviewUpdate={handleUpdate}
            onInputChange={handleEditChange}
            setEditingReviewId={() => setEditingReview(null)}
          />
        </Modal>
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
