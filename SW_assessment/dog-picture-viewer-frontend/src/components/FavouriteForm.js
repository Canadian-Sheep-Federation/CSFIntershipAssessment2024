import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavouriteForm = ({ onVote }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [favouriteDog, setFavouriteDog] = useState('');
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreeds(Object.keys(response.data.message));
      } catch (error) {
        console.error('Error fetching dog breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/favourites', {
        name,
        country,
        favourite_dog: favouriteDog,
      });
      setName('');
      setCountry('');
      setFavouriteDog('');
      onVote(); // Call the callback to refresh the leaderboard
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Your Favourite Dog</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        required
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Your Country"
        required
      />
      <input
        list="breeds"
        value={favouriteDog}
        onChange={(e) => setFavouriteDog(e.target.value)}
        placeholder="Favourite Dog Breed"
        required
      />
      <datalist id="breeds">
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>{breed}</option>
        ))}
      </datalist>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FavouriteForm;
