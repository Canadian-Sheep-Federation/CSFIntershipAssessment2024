document.getElementById('responseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
  
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name, ingredients, instructions })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      loadResponses();
      // Automatically switch to the "View Submitted Recipes" tab
      $('#pills-view-tab').tab('show');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  
  document.getElementById('mealSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const mealName = document.getElementById('mealName').value;
  
    fetch(`/api/meals/${mealName}`)
      .then(response => response.json())
      .then(data => {
        const mealsDiv = document.getElementById('meals');
        mealsDiv.innerHTML = '';
        if (data.meals) {
          data.meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('col-md-4', 'meal');
            mealDiv.innerHTML = `
              <div class="card mb-4">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
                  <button class="btn btn-primary" onclick="showDetails('${meal.idMeal}')">Show Details</button>
                </div>
              </div>
            `;
            mealsDiv.appendChild(mealDiv);
          });
        } else {
          mealsDiv.innerHTML = '<p>No meals found.</p>';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  
  document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const filterId = document.getElementById('filterId').value;
  
    if (filterId) {
      fetch(`/api/${filterId}`)
        .then(response => response.json())
        .then(data => {
          const responsesDiv = document.getElementById('responses');
          responsesDiv.innerHTML = '<h2>Submitted Recipe</h2>';
          const div = document.createElement('div');
          div.classList.add('alert', 'alert-secondary');
          div.innerHTML = `<h4>${data.name}</h4><p><strong>Ingredients:</strong> ${data.ingredients}</p><p><strong>Instructions:</strong> ${data.instructions}</p>`;
          responsesDiv.appendChild(div);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      loadResponses();
    }
  });
  
  function loadResponses() {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        const responsesDiv = document.getElementById('responses');
        responsesDiv.innerHTML = '<h2>Submitted Recipes</h2>';
        data.forEach(response => {
          const div = document.createElement('div');
          div.classList.add('alert', 'alert-secondary');
          div.innerHTML = `<h4>${response.name}</h4><p><strong>Ingredients:</strong> ${response.ingredients}</p><p><strong>Instructions:</strong> ${response.instructions}</p>`;
          responsesDiv.appendChild(div);
        });
      });
  }
  
  function showDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        alert(`Meal: ${meal.strMeal}\nInstructions: ${meal.strInstructions}`);
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Load responses when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    loadResponses();
  });
  