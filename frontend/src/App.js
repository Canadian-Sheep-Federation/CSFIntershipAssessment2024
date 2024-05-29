import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setnameFilter] = useState('');
  const [authorFilter, setauthorFilter] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get('http://localhost:8080/');
    setReviews(response.data);
  };

  const handleSearch = async (page) => {
    const response = await axios.get(`http://localhost:8080/search/${searchQuery}?page=${page}`);
    setSearchResults(response.data.docs);
    setCurrentPage(page);
    setTotalPages(Math.ceil(response.data.numFound / 25)); 
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:8080/', {
      book_id: bookId,
      book_title: bookTitle,
      author,
      review
    });
    setBookId('');
    setBookTitle('');
    setAuthor('');
    setReview('');
    fetchReviews();
  };

  const getCoverImageUrl = (coverId) => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : 'https://via.placeholder.com/128x193?text=No+Cover';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Book Reviews</h1>
      
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Search Books</h2>
        <div className="mb-4">
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Search for books" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button onClick={() => handleSearch(1)} className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded-md">Search</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map(result => (
            <div key={result.key} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img src={getCoverImageUrl(result.cover_i)} alt={result.title} className="w-32 h-48 mb-4"/>
              <h3 className="text-center text-lg font-semibold">{result.title}</h3>
              <p className="text-center text-sm text-gray-600">{result.author_name?.join(', ')}</p>
              <button onClick={() => {
                setBookId(result.key);
                setBookTitle(result.title);
                setAuthor(result.author_name?.join(', '));
              }} className="mt-auto mt-2 bg-green-500 text-white px-3 py-1 rounded-md">Review</button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button 
            onClick={() => handleSearch(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <button 
            onClick={() => handleSearch(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Submit Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Book Title" 
            value={bookTitle} 
            onChange={(e) => setBookTitle(e.target.value)} 
            required
          />
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required      
          />
          <textarea 
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Review" 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
            required 
          />
          <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-md">Submit Review</button>
        </form>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>
        <div className="w-full flex mb-4">
          <input 
            className="w-1/2 px-3 py-2 border rounded-md mr-1" 
            placeholder="Name Filter" 
            onChange={(e) => setnameFilter(e.target.value)} 
          />
          <input 
            className="w-1/2 px-3 py-2 border rounded-md" 
            placeholder="Author Filter"
            onChange={(e) => setauthorFilter(e.target.value)} 
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {reviews.filter((review) => (review.book_title === nameFilter || nameFilter === '') && (review.author === authorFilter || authorFilter === '')).map(review => (
            <div key={review.id} className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-xl font-bold">{review.book_title} by {review.author}</h3>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;