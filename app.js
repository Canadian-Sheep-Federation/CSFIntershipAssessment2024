const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_BASE_URL = 'http://localhost:3000';

/**
 * Function to search movies from TMDB API.
 */
function searchMovies() {
    const query = document.getElementById('query').value;
    fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';
            data.results.forEach(movie => {
                const div = document.createElement('div');
                div.textContent = movie.title;
                results.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

/**
 * Function to submit a review to our API.
 */
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieTitle = document.getElementById('movieTitle').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;

    fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieTitle, reviewText, rating })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchReviews();
    })
    .catch(error => console.error('Error:', error));
});

/**
 * Function to fetch and display all reviews from our API.
 */
function fetchReviews() {
    fetch(API_BASE_URL)
        .then(response => response.json())
        .then(data => {
            const reviewsList = document.getElementById('reviewsList');
            reviewsList.innerHTML = '';
            data.forEach(review => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${review.movieTitle}</strong><br>${review.reviewText}<br>Rating: ${review.rating}`;
                reviewsList.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fetch all reviews on page load
fetchReviews();
