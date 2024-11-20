import styles from "./Restaurants.module.css";
import Restaurant from "../Restaurant/Restaurant";

const Restaurants = ({ restaurants, onSelectRestaurant }) => {
  if (!restaurants || !Array.isArray(restaurants)) {
    return <p>No restaurants available</p>;
  }

  return (
    <ul className={`${styles.list} ${styles.listMovies}`}>
      {restaurants.map((restaurant) => (
        <Restaurant
          restaurant={restaurant}
          key={restaurant.fsq_id}
          onSelectRestaurant={onSelectRestaurant}
        />
      ))}
    </ul>
  );
};

export default Restaurants;
