import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Components/Modal/Modal';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [storedArticles, setStoredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
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
    setArticles([]);
    axios.post('http://localhost:3001/search', { keyword })
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error("There was an error submitting the keyword!", error);
      });
  };


  const openModal = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="App">
      <h1>CSF News</h1>
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

      <h2>Search Results</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} onClick={() => openModal(article)}>
            <img src={article.imageUrl || 'default-image-url.jpg'} alt={article.title} />
            <div>
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              <p>{article.description}</p>
              <p><em>{article.publishedAt}</em></p>
            </div>
          </li>
        ))}
      </ul>

      {selectedArticle && (
        <Modal selectedArticle={selectedArticle} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
