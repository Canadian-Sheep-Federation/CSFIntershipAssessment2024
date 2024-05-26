const Restaurant = ({ restaurant, onSelectRestaurant }) => {
  const name = restaurant.name || "No name provided";
  const imageUrl =
    restaurant.photos.length > 0
      ? `${restaurant.photos[0].prefix}original${restaurant.photos[0].suffix}`
      : "../public/default-image-url.jpg"; // Provide a default image URL if not available
  const location =
    `📌 ${restaurant.location?.formatted_address}` || "No address provided";

  return (
    <li onClick={() => onSelectRestaurant(restaurant.fsq_id)}>
      <h3>{name}</h3>
      <img src={imageUrl} alt={name} />
      <p>{location}</p>
    </li>
  );
};

export default Restaurant;
