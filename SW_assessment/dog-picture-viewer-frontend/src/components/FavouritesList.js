import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavouritesList = ({ refreshTrigger }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger, country]); // Refetch leaderboard whenever the refreshTrigger changes or country changes

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leaderboard', {
        params: { country },
      });
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Filter by country"
      />
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Breed</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.favourite_dog}</td>
              <td>{entry.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouritesList;
