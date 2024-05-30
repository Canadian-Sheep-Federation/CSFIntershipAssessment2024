import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogPicture = () => {
  const [breed, setBreed] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
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

  const fetchDogPicture = async () => {
    try {
      const response = await axios.get(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`);
      setImageUrl(response.data.message);
      setError('');
    } catch (error) {
      setImageUrl('');
      setError('Error fetching dog picture. Please check the breed name.');
    }
  };

  return (
    <div>
      <h2>Dog Picture Viewer</h2>
      <input
        list="breeds"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Enter dog breed"
      />
      <datalist id="breeds">
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>{breed}</option>
        ))}
      </datalist>
      <button onClick={fetchDogPicture}>Get Dog Picture</button>
      {error && <p>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Dog" />}
    </div>
  );
};

export default DogPicture;
