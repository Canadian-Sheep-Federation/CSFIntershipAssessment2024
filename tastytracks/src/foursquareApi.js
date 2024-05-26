import axios from "axios";

const FOURSQUARE_API_URL = "https://api.foursquare.com/v3/places/search";
export const FOURSQUARE_PHOTOS_URL = "https://api.foursquare.com/v3/places";
const FOURSQUARE_API_KEY = "fsq3XgAPexJIK4N40IpVZveKt65s9eBCxYoLkzIfgFBdlAw=";
const FOURSQUARE_PLACE_DETAILS_URL = "https://api.foursquare.com/v3/places";

const foursquareRequest = async (params) => {
  try {
    const response = await axios.get(FOURSQUARE_API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data from Foursquare:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getPlacePhotos = async (fsq_id) => {
  try {
    const response = await axios.get(
      `${FOURSQUARE_PHOTOS_URL}/${fsq_id}/photos`,
      {
        headers: {
          Accept: "application/json",
          Authorization: FOURSQUARE_API_KEY,
        },
        params: {
          limit: 1,
          classifications: "outdoor",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching photos from Foursquare:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getRestaurantsByLocation = async (
  location,
  query = "restaurant"
) => {
  const restaurants = await foursquareRequest({
    near: location,
    query,
    limit: 50,
  });

  // Fetch photos for each restaurant
  const restaurantsWithPhotos = await Promise.all(
    restaurants.results.map(async (restaurant) => {
      const photos = await getPlacePhotos(restaurant.fsq_id);
      return { ...restaurant, photos };
    })
  );

  return restaurantsWithPhotos;
};

const foursquareDetailsRequest = async (url, params) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data from Foursquare:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getPlaceDetails = async (fsq_id, fields = "") => {
  return await foursquareDetailsRequest(
    `${FOURSQUARE_PLACE_DETAILS_URL}/${fsq_id}`,
    { fields }
  );
};
