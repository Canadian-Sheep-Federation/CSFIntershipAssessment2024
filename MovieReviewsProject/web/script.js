// Function to search for a movie
async function searchMovie() {
  // Get the movie title from the input field
  const movieTitle = document.getElementById('searchMovie').value;

  // Fetch movie data from the API
  const response = await fetch(`/api/form/search/${movieTitle}`);
  const movie = await response.json();

  // Get the movie details and reviews divs
  const movieDetailsDiv = document.getElementById('movieDetails');
  const reviewsDiv = document.getElementById('reviews');
  
  // Clear existing movie details and reviews
  movieDetailsDiv.innerHTML = '';
  reviewsDiv.innerHTML = '';

  // Check if there was an error fetching the movie data
  if (movie.error) {
    movieDetailsDiv.innerHTML = `<p class="text-danger">${movie.error}</p>`;
  } else {
    // Display the movie details
    movieDetailsDiv.innerHTML = `
      <div class="card mb-4">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${movie.poster}" class="card-img" alt="Poster of ${movie.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${movie.title} (${movie.year})</h5>
              <p class="card-text">${movie.plot}</p>
              <button class="btn btn-primary" onclick="showReviewForm(${movie.id})">Add Review</button>
              <div id="reviewForm-${movie.id}" class="mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    // Load and display the reviews for the movie
    loadReviews(movie.id);
  }
}

// Function to show the review form
function showReviewForm(movieId) {
  // Get the div where the review form will be displayed
  const reviewFormDiv = document.getElementById(`reviewForm-${movieId}`);

  // Display the review form
  reviewFormDiv.innerHTML = `
    <form id="reviewForm" onsubmit="submitReview(event, ${movieId})" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" class="form-control" required>
        <div class="invalid-feedback">Please enter your name.</div>
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" name="rating" class="form-control" min="1" max="10" required>
        <div class="invalid-feedback">Please enter a rating between 1 and 10.</div>
      </div>
      <div class="form-group">
        <label for="notes">Notes:</label>
        <textarea id="notes" name="notes" class="form-control" required></textarea>
        <div class="invalid-feedback">Please enter your notes.</div>
      </div>
      <button type="submit" class="btn btn-success">Submit Review</button>
    </form>
  `;

  // Enable Bootstrap validation styling
  const forms = document.getElementsByClassName('needs-validation');
  Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}

// Function to submit a review
async function submitReview(event, movieId) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the review details from the form fields
  const name = document.getElementById('name').value;
  const rating = document.getElementById('rating').value;
  const notes = document.getElementById('notes').value;

  // Send the review data to the server
  const response = await fetch('/api/form/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movie_id: movieId, name, rating, notes })
  });
  const result = await response.json();

  // Alert the user that the review was submitted
  alert('Review submitted with ID: ' + result.id);

  // Reload the reviews for the movie
  loadReviews(movieId);
}

// Function to load and display reviews for a movie
async function loadReviews(movieId) {
  // Fetch the reviews for the movie from the server
  const response = await fetch(`/api/form/reviews/${movieId}`);
  const reviews = await response.json();

  // Get the reviews div
  const reviewsDiv = document.getElementById('reviews');
  
  // Display the reviews
  reviewsDiv.innerHTML = '<h2 class="mt-4">Reviews</h2>';
  reviews.forEach(review => {
    reviewsDiv.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <p class="card-text"><strong>Name:</strong> ${review.name}</p>
          <p class="card-text"><strong>Rating:</strong> ${review.rating}</p>
          <p class="card-text"><strong>Notes:</strong> ${review.notes}</p>
        </div>
      </div>
    `;
  });
}
