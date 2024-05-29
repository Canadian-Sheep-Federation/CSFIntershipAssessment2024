import { useLocation, useParams } from "react-router-dom";
import PageNav from "../components/PageNav/PageNav";
const Reviews = () => {
  const { fsq_id } = useParams();
  const location = useLocation();
  const { rating, review, suggestion, name } = location.state || {};

  return (
    <div>
      <PageNav />
      <h2>Reviews for {name}</h2>

      <div>
        <h3>Rating: {rating}</h3>
        <p>Review: {review}</p>
        <p>Suggestions: {suggestion}</p>
      </div>
    </div>
  );
};

export default Reviews;
