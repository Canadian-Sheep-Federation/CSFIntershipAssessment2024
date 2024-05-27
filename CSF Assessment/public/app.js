// Handles the POST / field that submits a movie survey
document.getElementById('surveyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const movie = document.getElementById('movie').value;

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, movie })
  });
  const result = await response.json();
  alert(`Form submitted with ID: ${result.id}`);
});

// Handles the GET /{id} field that gets a response from an id from the database
document.getElementById('fetchResponseButton').addEventListener('click', async () => {
  const responseId = document.getElementById('responseId').value;
  const singleResponse = document.getElementById('singleResponse');
  singleResponse.innerHTML = ''; // Clear previous result

  if (responseId) {
    try {
      const response = await fetch(`/${responseId}`);
      const result = await response.json();
      if (result.error) {
        singleResponse.innerHTML = `<li>${result.error}</li>`;
      } else {
        singleResponse.innerHTML = `<li>Name: ${result.name}, Email: ${result.email}, Movie: ${result.movie}</li>`;
      }
    } catch (error) {
      console.error('Error fetching response by ID:', error);
      singleResponse.innerHTML = `<li>Error fetching response by ID: ${error.message}</li>`;
    }
  } else {
    singleResponse.innerHTML = '<li>Please enter a valid response ID.</li>';
  }
});

// Handles the GET / field that gets all the responses made in the database
document.getElementById('fetchAllResponsesButton').addEventListener('click', async () => {
  const responsesList = document.getElementById('responsesList');
  responsesList.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch('/all');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
      // Iterate over each response and display it
      data.forEach(response => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${response.name}, Email: ${response.email}, Movie: ${response.movie}`;
        responsesList.appendChild(listItem);
      });
  } catch (error) {
    console.error('Error fetching responses:', error);
    responsesList.innerHTML = `<li>Error fetching responses: ${error.message}</li>`;
  }
});


// Searchs through the public API IMDbOT displays movies that match the title and what year they were made
document.getElementById('searchButton').addEventListener('click', async () => {
  const title = document.getElementById('imdbSearch').value;
  const imdbResults = document.getElementById('imdbResults');
  imdbResults.innerHTML = ''; // Clear previous results

  try {
    const response = await fetch(`/imdb/${title}`);
    const results = await response.json();
    console.log(results); // Log the response to inspect its structure

    if (Array.isArray(results.description) && results.description.length > 0) {
      results.description.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <p>Title: ${movie['#TITLE']}, Year: ${movie['#YEAR']}</p>
          ${movie['#IMG_POSTER'] ? `<img src="${movie['#IMG_POSTER']}" alt="${movie['#TITLE']} poster" class="movie-poster">` : ''}
        `;
        imdbResults.appendChild(listItem);
      });
    } else {
      imdbResults.innerHTML = '<li>No results found.</li>';
    }
  } catch (error) {
    console.error('Error fetching IMDb data:', error);
    imdbResults.innerHTML = `<li>Error fetching IMDb data: ${error.message}</li>`;
  }
});