import SearchBar from "../components/SearchBar/SearchBar";
import Main from "../components/Main/Main";
import Search from "../components/Search/Search";
import NumResults from "../components/NumResults/NumResults";
import Restaurant from "../components/Restaurant/Restaurant";
import VisitedSummary from "../components/VisitedSummary/VisitedSummary";

import Box from "../components/Box/Box";

import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import RestaurantDetails from "../components/RestaurantDetails/RestaurantDetails";
import { useEffect, useState } from "react";
import VisitedRestaurants from "../components/VisitedRestaurants/VisitedRestaurants";
import { getRestaurantsByLocation } from "../foursquareApi";
import Restaurants from "../components/Restaurants/Restaurants";

const AppLayout = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [watched, setWatched] = useState([]);
  const tempQuery = "Toronto";
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState(tempQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getRestaurantsByLocation(query);
        setRestaurants(data);

        if (!data.length) {
          throw new Error("Place not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 5) {
      setRestaurants([]);
      setError("");
      return;
    }
    fetchRestaurants();
  }, [query]);

  function handleReviewedRestaurant(restaurant) {
    console.log(restaurant);
    setWatched((watched) => [...watched, restaurant]);
  }

  function handleSelectRestaurant(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseRestaurant() {
    setSelectedId(null);
  }

  return (
    <>
      <SearchBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults restaurants={restaurants} />
      </SearchBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Restaurants
              restaurants={restaurants}
              onSelectRestaurant={handleSelectRestaurant}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <RestaurantDetails
              selectedId={selectedId}
              onCloseRestaurant={handleCloseRestaurant}
              onAddReviewed={handleReviewedRestaurant}
            />
          ) : (
            <>
              <VisitedSummary reviews={watched} />

              <VisitedRestaurants reviews={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default AppLayout;
