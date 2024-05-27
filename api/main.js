document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const responsesDiv = document.getElementById('responses');
    const characterDiv = document.getElementById('characterInfo');
    const fetchCharacterButton = document.getElementById('fetchCharacter');

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

    fetchCharacterButton.addEventListener('click', async () => {
        const charID = document.getElementById('character').value;
        try {
            const response = await fetch(`https://swapi.dev/api/people/${charID}/`);

            const character = await response.json(); // Extract JSON data from response

            const homeworld = await fetchHomeworld(character.homeworld); // Fetch homeworld name
            const films = await fetchFilms(character.films); // Fetch film names
            const species = await fetchSpecies(character.species); // Fetch species names
            const vehicles = await fetchVehicles(character.vehicles); // Fetch vehicle names
            const starships = await fetchStarships(character.starships); // Fetch starship names
            
            // Display character information
            characterDiv.innerHTML = 
                `<div>
                    <p><strong>Name:</strong> ${character.name}</p>
                    <p><strong>Height:</strong> ${character.height} cm</p>
                    <p><strong>Mass:</strong> ${character.mass} kg</p>
                    <p><strong>Hair Color:</strong> ${character.hair_color}</p>
                    <p><strong>Skin Color:</strong> ${character.skin_color}</p>
                    <p><strong>Eye Color:</strong> ${character.eye_color}</p>
                    <p><strong>Birth Year:</strong> ${character.birth_year}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Homeworld:</strong> ${homeworld}</p>
                    <p><strong>Films:</strong> ${films}</p>
                    <p><strong>Species:</strong> ${species}</p>
                    <p><strong>Vehicles:</strong> ${vehicles}</p>
                    <p><strong>Starships:</strong> ${starships}</p>
                    <p><strong>Created:</strong> ${new Date(character.created).toLocaleString()}</p>
                    <p><strong>Edited:</strong> ${new Date(character.edited).toLocaleString()}</p>
                </div>`;
                
        } catch (err) {
            console.error('Error fetching character:', err);
        }
    });

    async function fetchHomeworld(planetUrl) { // Fetch homeworld name
        try {
            const response = await fetch(planetUrl);
            const data = await response.json();
            return data.name;
        } catch {
            return 'n/a';
        }
    }

    async function fetchFilms(filmUrls) { // Fetch film name
        const films = filmUrls.map(async (filmUrl) => {
            const response = await fetch(filmUrl);
            const data = await response.json();
            return data.title;
        });
        return (await Promise.all(films)).join(', ');
    }

    async function fetchSpecies(speciesUrl) { // Fetch species name
        try {
            const response = await fetch(speciesUrl);
            const data = await response.json();
            return data.name;
        } catch {
            return 'n/a';
        }
    }

    async function fetchVehicles(vehicleUrl) { // Fetch vehicle name
        try {
            const response = await fetch(vehicleUrl);
            const data = await response.json();
            return data.name;
        } catch {
            return 'n/a'; //
        }
    }

    async function fetchStarships(starshipUrl) { // Fetch starship name
        try { 
            const response = await fetch(starshipUrl);
            const data = await response.json();
            return data.name;
        } catch {
            return 'n/a';
        }
    }

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
