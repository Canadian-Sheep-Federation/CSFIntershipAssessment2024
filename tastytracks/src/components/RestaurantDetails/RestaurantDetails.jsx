import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import StarRating from "../Star/StarRating";

import styles from "./RestaurantDetails.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext ";
import { getPlaceDetails, getPlacePhotos } from "../../foursquareApi";

const RestaurantDetails = ({
  selectedId,
  onCloseRestaurant,
  onAddReviewed,
}) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getPlaceDetails(selectedId);
        const photos = await getPlacePhotos(selectedId);
        setDetails({ ...data, photos });
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedId) {
      fetchDetails();
    }
  }, [selectedId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review || !suggestion) {
      setError("Please fill all the fields.");
      return;
    }

    const newReview = {
      name: details.name,
      username: user?.name,
      rating,
      review,
      suggestion,
      imageCover:
        details.photos && details.photos.length > 0
          ? `${details.photos[0].prefix}original${details.photos[0].suffix}`
          : "default-image-url.jpg",
    };

    try {
      await axios.post("http://localhost:8000/api/v1/reviews", newReview);
      console.log("Review submitted:", newReview);

      onAddReviewed(newReview);
      navigate("/restaurants");
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error submitting review. Please try again.");
    }
  };

  const handleReviewed = () => {
    const newReviewedRestaurant = {
      name: details.name,
      location: details.location,
    };
    onAddReviewed(newReviewedRestaurant);
    onCloseRestaurant();
  };

  const handleViewReviews = (onCloseReview) => {
    navigate("/restaurants", { state: { onCloseReview } });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!details) return null;

  const imageUrl =
    details.photos && details.photos.length > 0
      ? `${details.photos[0].prefix}original${details.photos[0].suffix}`
      : "default-image-url.jpg"; // Provide a default image URL if not available

  return (
    <div className={styles.details}>
      <button className={styles.btnBack} onClick={onCloseRestaurant}>
        &larr;
      </button>
      <div className={styles.restaurantInfo}>
        <img src={imageUrl} alt={details.name} className={styles.image} />

        <div className={styles.detailsOverview}>
          <h2>{details.name}</h2>
          <p>{details.location?.formatted_address}</p>
          <p>Address: {details.location?.address}</p>
          <p>Country: {details.location?.country}</p>
          <h3>Categories:</h3>
          <ul>
            {details.categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles["form-group"]}>
          <label>Rating:</label>
          <StarRating rating={rating} setRating={setRating} maxRating={5} />
        </div>
        <div className={styles["form-group"]}>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>Suggestions:</label>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => navigate("/restaurants")}
        className={styles.btnViewReviews}
      >
        View What Others Have to Say
      </button>
    </div>
  );
};

export default RestaurantDetails;
