import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [storedArticles, setStoredArticles] = useState([]);

  useEffect(() => {
    // Fetch stored news articles from the backend
    axios.get('http://localhost:3001/')
      .then(response => {
        setStoredArticles(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the news articles!", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/', { keyword })
      .then(response => {
        console.log(response.data.message);
        // Fetch stored news articles again after the new articles are added
        axios.get('http://localhost:3001/')
          .then(response => {
            setStoredArticles(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the news articles!", error);
          });
      })
      .catch(error => {
        console.error("There was an error submitting the keyword!", error);
      });
  };

  return (
    <div className="App">
      <h1>Sheep and Farming News</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
          required
        />
        <button type="submit">Search</button>
      </form>

      <h2>Stored News Articles</h2>
      <ul>
        {storedArticles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            <p>{article.description}</p>
            <p><em>{article.publishedAt}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
