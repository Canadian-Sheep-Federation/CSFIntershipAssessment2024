document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const responsesDiv = document.getElementById('responses');
    const fetchCharacterButton = document.getElementById('fetchCharacter');
    const characterInfo = document.getElementById('characterInfo');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: parseInt(formData.get('age')),
            favouriteStarWarsMovie: formData.get('favoriteMovie'),
            favouriteStarWarsMovieRating: parseInt(formData.get('movieRating')),
            favouriteStarWarsCharacter: formData.get('favoriteCharacter'),
            favouriteStarWarsCharacterRating: parseInt(formData.get('characterRating')),
        };

        try {
            // Send a POST request to the server
            const response = await fetch('http://localhost:7000/starwars', {
                method: 'POST',
                // mode: 'no-cors', // Set the mode to 'no-cors' to bypass CORS restrictions
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convert data to JSON
            }); 

            const result = await response.json(); // Extract JSON data from response

            if (response.ok) {
                alert(`Form submitted successfully! Your form ID is ${result.id}`);
                form.reset(); // Clear the form
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred while submitting the form. Please try again later.');
        }
    });

    
    // Fetch All Forms
    async function fetchAllForms() {
        try {
            const response = await fetch('http://localhost:7000/starwars', {method: 'GET'}); // Fetch all forms with a GET request
            
            const responseData = await response.json(); // Extract JSON data from response

            // Display all forms
            responsesDiv.innerHTML = responseData.Forms.map(form => (
                `<div>
                    <p><strong>Name:</strong> ${form.name}</p>
                    <p><strong>Email:</strong> ${form.email}</p>
                    <p><strong>Age:</strong> ${form.age}</p>
                    <p><strong>Favorite Movie:</strong> ${form.favouriteStarWarsMovie}</p>
                    <p><strong>Movie Rating:</strong> ${form.favouriteStarWarsMovieRating}</p>
                    <p><strong>Favorite Character:</strong> ${form.favouriteStarWarsCharacter}</p>
                    <p><strong>Character Rating:</strong> ${form.favouriteStarWarsCharacterRating}</p>
                    <p>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<p>
                </div>`
            )).join('');
            
        } catch (err) {
            console.error('Error fetching forms:', err);
        }
    }

    fetchAllForms();

   
});
