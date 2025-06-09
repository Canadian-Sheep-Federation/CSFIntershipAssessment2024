// This React app allows users to search for books using the Open Library API,
// submit reviews for selected books, and view all submitted reviews.
// It uses a local backend server to handle review submissions and retrieval.
// The app consists of a search input, a list of search results, a form to submit reviews,
// and a list to display all reviews.
// The Open Library API is used to fetch book data based on user queries.
// The backend server is built with Express and SQLite to store reviews.  

// For simplicity, the logic is kept in APP.js, but in a real-world application,
// I would separate components into different files and use a more structured state management solution. 


import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', book_title: '', review: '' });

  // Public API - Search Open Library and return top 5 results
  const searchBooks = async () => {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();
    setResults(data.docs.slice(0, 5)); 
  };

  // Load all reviews
  const loadReviews = async () => {
    const res = await fetch('http://localhost:5001/reviews');
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', book_title: '', review: '' });
    loadReviews();
  };

  return (
    <div className="App">
      <h1>Open Library Book Search and Reviews</h1>

      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search books..." />
      <button onClick={searchBooks}>Search</button>

      <ul>
        {results.map(book => (
          <li key={book.key}>
            {book.title} by {book.author_name?.[0]}
            <button style={{ float: 'right'}} onClick={() => setForm({ ...form, book_title: book.title })}>Select</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h2>Submit a Review</h2>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" />
        <input value={form.book_title} onChange={e => setForm({ ...form, book_title: e.target.value })} placeholder="Book Title" />
        <textarea value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} placeholder="Your Review" />
        <button type="submit">Submit</button>
      </form>

      <h2>Book Reviews</h2>
      <ul>
        {reviews.map(r => (
          <li key={r.id}><strong>{r.name}</strong> on <em>{r.book_title}</em>: {r.review}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
