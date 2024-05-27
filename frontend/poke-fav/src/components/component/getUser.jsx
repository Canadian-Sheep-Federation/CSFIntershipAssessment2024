'use client'
import { useState, useEffect } from "react";

const GetUser = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
  };
  fetchUserData();
}, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
        <h2>User Profile</h2>
        {userData && (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Favourite Pokémon:</strong> {userData.favourite_pokemon}</p>
            <p><strong>Favourite Move:</strong> {userData.favourite_move}</p>
            <p><strong>Reason:</strong> {userData.reason}</p>
          </div>
        )}
      </div>
    )
}

export default GetUser;