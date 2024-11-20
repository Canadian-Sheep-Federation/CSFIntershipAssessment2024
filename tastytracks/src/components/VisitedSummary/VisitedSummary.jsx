import styles from "./VisitedSummary.module.css";

const VisitedSummary = ({ reviews }) => {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  const avgRating = average(reviews.map((review) => review.rating));

  return (
    <div className={styles.summary}>
      <h2>Restaurants you have Reviewed</h2>
      <div className={styles.stats}>
        <p>
          <span>#️⃣</span>
          <span>{reviews.length} restaurants</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgRating.toFixed(1)}</span>
        </p>
      </div>
    </div>
  );
};

export default VisitedSummary;
