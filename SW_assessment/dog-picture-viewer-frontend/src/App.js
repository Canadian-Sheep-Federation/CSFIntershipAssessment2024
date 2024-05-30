import React, { useState } from 'react';
import DogPicture from './components/DogPicture';
import FavouriteForm from './components/FavouriteForm';
import FavouritesList from './components/FavouritesList';
import './App.css'; // Import the CSS file

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleVote = () => {
    setRefreshTrigger(refreshTrigger + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <DogPicture />
        <FavouriteForm onVote={handleVote} />
        <FavouritesList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default App;
