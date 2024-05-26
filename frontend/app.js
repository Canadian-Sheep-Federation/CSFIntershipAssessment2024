// Fetch and display dog breeds from the server
async function fetchBreeds() {
    try {
        const response = await fetch('http://localhost:3000/breeds');
        const data = await response.json();
        const breeds = Object.keys(data); // Convert object keys to an array
        const breedSelect = document.getElementById('breed');
        breedSelect.innerHTML = ''; // Clear existing options
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to fetch breeds:', error);
    }
}
fetchBreeds(); // Call the function to fetch breeds on page load

// Fetch and display reviews from the server
async function fetchReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();
        const reviewsDiv = document.getElementById('reviews');
        reviewsDiv.innerHTML = ''; // Clear existing reviews
        reviews.forEach(review => {
            const div = document.createElement('div');
            div.className = 'review';
            div.innerHTML = `Breed: ${review.breed}, Rating: ${review.rating}, Comments: ${review.comments}`;
            reviewsDiv.appendChild(div);
        });
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
    }
}
fetchReviews(); // Call the function to fetch reviews on page load

// Handle form submission to post a new review
document.getElementById('reviewForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const breed = document.getElementById('breed').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    try {
        const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ breed, rating, comments })
        });
        if (response.ok) { // Check if POST was successful
            fetchReviews(); // Refresh the list of reviews
        }
    } catch (error) {
        console.error('Failed to submit review:', error);
    }
});
