import axios from "axios";
import StarRating from "../Star/StarRating";
import styles from "./EditReview.module.css";

const EditReview = ({
  onReviewUpdate,
  onInputChange,
  editForm,
  setEditForm,
  setEditingReviewId,
}) => {
  return (
    // <div className={styles.editReview}>
    <form onSubmit={onReviewUpdate} className={styles.editForm}>
      <div className={styles.editReview}>
        <label></label>
        <div className={styles.userReview}>
          <StarRating
            rating={editForm.rating}
            setRating={(rating) =>
              setEditForm((prevForm) => ({ ...prevForm, rating }))
            }
            maxRating={5}
          />
        </div>
      </div>
      <div className={styles.reviewInput}>
        <label>Review:</label>
        <textarea
          name="review"
          value={editForm.review}
          onChange={onInputChange}
          required
        />
      </div>
      <div className={styles.suggestionInput}>
        <label>Suggestions:</label>
        <textarea
          name="suggestion"
          value={editForm.suggestion}
          onChange={onInputChange}
        />
      </div>
      <button type="submit">Update</button>
      <button
        className={styles.cancelUpdate}
        onClick={() => setEditingReviewId(null)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditReview;
