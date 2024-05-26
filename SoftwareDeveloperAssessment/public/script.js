document.getElementById('searchButton').addEventListener('click', async () => {
    const title = document.getElementById('movieTitle').value;
    const resultsDiv = document.getElementById('results');
    const formDiv = document.getElementById('form');
    resultsDiv.innerHTML = '';
    formDiv.innerHTML = '';

    if (!title) {
        alert('Please enter a movie title.');
        return;
    }
    try {
        const response = await fetch(`/movie/${title}`);
        if (!response.ok) {
            const errorData = await response.json();
            resultsDiv.innerHTML = `<p>${errorData.message}</p>`;
            return;
        }
        const ratedDiv = document.getElementById('rated');
        ratedDiv.innerHTML = '';
        const movieList = await response.json();
        movieList.Search.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movie';
            movieDiv.innerHTML = `
                <h2 class='title'>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <img src="${movie.Poster}" alt="${movie.Title}"><br>
                <button class="rateButton">Rate</button>
            `;
            resultsDiv.appendChild(movieDiv);
        });

        document.querySelectorAll('.rateButton').forEach(button => {
            button.addEventListener('click', (event) => {
                const movieDiv = event.target.parentElement;
                const movieTitle = movieDiv.querySelector('.title').innerText;

                resultsDiv.innerHTML = '';
                formDiv.innerHTML = `
                    <h2>${movieTitle}</h2>
                    <form id="ratingForm">
                        <label>Overall</label><br>
                        <input type="text" id="Overall" name="Overall" value="5/5"><br>
                        <label>Story</label><br>
                        <input type="text" id="Story" name="Story" value="5/5"><br>
                        <label>Actors</label><br>
                        <input type="text" id="Actors" name="Actors" value="5/5"><br>
                        <label>Effects</label><br>
                        <input type="text" id="Effects" name="Effects" value="5/5"><br>
                        <br>
                        <button type="submit">Submit</button>
                    </form>
                `;

                document.getElementById('ratingForm').addEventListener('submit',async (e) => {
                    e.preventDefault(); // Prevent the default form submission
                    const overall = document.getElementById('Overall').value.trim();
                    const story = document.getElementById('Story').value.trim();
                    const actors = document.getElementById('Actors').value.trim();
                    const effects = document.getElementById('Effects').value.trim();
                    if (!overall || !story || !actors || !effects) {
                        alert("All of the form fields must be filled before submitting.");
                    } else {
                        // Send the data to the server
                        const formData = {
                            movieTitle,
                            overall,
                            story,
                            actors,
                            effects
                        };

                        try {
                            const response = await fetch('/submit-rating', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(formData)
                            });

                            if (response.ok) {
                                const responseData = await response.json();
                                alert(responseData.message);
                                formDiv.innerHTML = '';
                            } else {
                                alert('Failed to submit rating.');
                            }
                        } catch (error) {
                            alert('An error occurred: ' + error.message);
                        }
                    }
                });
            });
        });

    } catch (error) {
        resultsDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
});

document.getElementById('ratedIDLookUpButton').addEventListener('click', async () => {
    const id = document.getElementById('movieID').value;
    const resultsDiv = document.getElementById('results');
    const formDiv = document.getElementById('form');
    const ratedDiv = document.getElementById('rated');
    resultsDiv.innerHTML = '';
    formDiv.innerHTML = '';
    ratedDiv.innerHTML = '';

    if (!id) {
        alert('Please enter a review ID.');
        return;
    }
    try {
        const response = await fetch(`/reviews/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            ratedDiv.innerHTML = `<p>${errorData.message}</p>`;
            return;
        }
        const review = await response.json();
        ratedDiv.innerHTML = '<h2>All Reviews</h2>';
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
            <p><strong>Movie Title:</strong> ${review.movieTitle}</p>
            <p><strong>Overall:</strong> ${review.overall}</p>
            <p><strong>Story:</strong> ${review.story}</p>
            <p><strong>Actors:</strong> ${review.actors}</p>
            <p><strong>Effects:</strong> ${review.effects}</p>
            <p><strong>Date:</strong> ${new Date(review.date).toLocaleString()}</p>
            <hr>
        `;
            ratedDiv.appendChild(reviewDiv);
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});

document.getElementById('ratedAllButton').addEventListener('click', async () => {
    const resultsDiv = document.getElementById('results');
    const formDiv = document.getElementById('form');
    const ratedDiv = document.getElementById('rated');
    resultsDiv.innerHTML = '';
    formDiv.innerHTML = '';
    ratedDiv.innerHTML = '';

    try {
        const response = await fetch(`/reviews`);
        if (!response.ok) {
            const errorData = await response.json();
            ratedDiv.innerHTML = `<p>${errorData.message}</p>`;
            return;
        }
        const reviews = await response.json();
        ratedDiv.innerHTML = '<h2>All Reviews</h2>';
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.innerHTML = `
                <p><strong>Movie Title:</strong> ${review.movieTitle}</p>
                <p><strong>Overall:</strong> ${review.overall}</p>
                <p><strong>Story:</strong> ${review.story}</p>
                <p><strong>Actors:</strong> ${review.actors}</p>
                <p><strong>Effects:</strong> ${review.effects}</p>
                <p><strong>Date:</strong> ${new Date(review.date).toLocaleString()}</p>
                <hr>
            `;
            ratedDiv.appendChild(reviewDiv);
        });
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});

// TODO:
//     Allow info from db to be displayed
//     Additional questions
//     README