import { useState } from "react";
import styles from "./StarRating.module.css";
import Star from "./Star";

const StarRating = ({
  rating,
  setRating,
  maxRating = 5,
  color = "#fcc419",
  size = "24",
  disabled = false,
}) => {
  const [localRating, setLocalRating] = useState(rating || 0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    if (!disabled) {
      setLocalRating(rating);
      setRating(rating);
    }
  }

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ""}`}>
      <div className={styles.starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : localRating >= i + 1}
            onHoverIn={() => !disabled && setTempRating(i + 1)}
            onHoverOut={() => !disabled && setTempRating(0)}
            color={color}
            size={size}
            disabled={disabled}
          />
        ))}
      </div>
      <p
        className={styles.text}
        style={{ fontSize: `${size / 1.5}px`, color: `${color}` }}
      >
        {tempRating || localRating || ""}
      </p>
    </div>
  );
};

export default StarRating;
