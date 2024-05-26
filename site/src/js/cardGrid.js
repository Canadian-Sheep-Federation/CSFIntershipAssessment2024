// sending request to remote cocktail API to get a random cocktail then using it to populate form
function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      populateFavForm(data.drinks[0]);
      showPopUp();
    });
}

// searching remote cocktail API using keyword entered by User
function searchCockTails() {
  // Getting the search text to be used to search the cocktail API
  const searchText = document.getElementById("searchText").value;
  // Getting the container for the carousel
  const cocktailContainer = document.getElementById("cocktail-container");

  // sending request to cocktail database
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchText)}`)
    .then(response => response.json())
    .then(data => {
      cocktailContainer.innerHTML = '';

      // if drinks return from search
      if (data.drinks) {
        data.drinks.forEach(drink => {
          let drinkDiv = document.createElement('div');
          drinkDiv.classList.add("cocktail-card");

          // converting ingredients from array to comma-separated string
          drink.ingredients = getIngredientsStr(drink);

          // Adding event listener for each card to show the favourite form
          drinkDiv.addEventListener("click", () => {
            populateFavForm(drink);
            showPopUp();
          });

          // drink card structure
          drinkDiv.innerHTML = `
          <div class="cocktail-image">
            <img class="cocktail-thumb" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" \>
          </div>
          <div class="cocktail-info">
            <h2>${drink.strDrink}</h2>
            <p class="cocktail-instructions">${drink.strInstructions}</p>
          </div>
        `;

          cocktailContainer.appendChild(drinkDiv);
        });
      } else {
        // if there are no drinks then display message
        cocktailContainer.innerHTML = `
          <h2>No Results! Try Again.</h2>
        `
      }
    });
}

// Convert ingredients from array to comma separated string
function getIngredientsStr(drink) {
  let ingredients = [];
  for (let i = 0; i < 15; ++i) {
    if (drink[`strIngredient${i + 1}`])
      ingredients.push(drink[`strIngredient${i + 1}`]);
  }

  return ingredients.join(", ");
}

// Changing slider number to match slider value
var slider = document.getElementById("rating");
var sliderNumber = document.getElementById("slider-number");
sliderNumber.innerHTML = slider.value;
slider.oninput = function () {
  sliderNumber.innerHTML = this.value;
};


// Function to populate favourite form with drink that was clicked on by User
function populateFavForm(drink) {
  let drinkInfo = document.getElementById("drink-info");

  // assigning drinkObj as attribute on drink-info div to be used if user sends POST request
  drinkInfo.drinkObj = drink;

  // converting ingredients from array to comma-separated string
  drink.ingredients = getIngredientsStr(drink);

  // resetting slider and notes to default
  slider.value = 3;
  sliderNumber.innerHTML = 3;
  document.getElementById("notes").value = "";

  // popup drink structure
  drinkInfo.innerHTML = `
    <div class="fav-image-div">
      <img
        src="${drink.strDrinkThumb}"
        alt="${drink.strDrink}"
      />
    </div>
    <h3>${drink.strDrink}</h3>
    <p><b>Ingredients:</b> ${drink.ingredients}</p>
    <p>${drink.strInstructions}</p>
    <p><b>Glass Type:</b> ${drink.strGlass}</p>
  `;
}

// Toggling a message confirming that user added drink to favourites list
function toggleMessage(message) {
  let drinkInfo = document.getElementById("drink-div");
  let closeBtn = document.getElementById("fav-close");
  let addedInfo = document.getElementById("drink-added");
  let messageH3 = document.getElementById("message");

  // checking state of popup and changing based on said state
  if (drinkInfo.style.display == "none" && closeBtn.style.display == "none" && addedInfo.style.display == "block") {
    drinkInfo.style.display = "block";
    closeBtn.style.display = "block";
    addedInfo.style.display = "none";
    messageH3.innerText = "";
  } else {
    drinkInfo.style.display = "none";
    closeBtn.style.display = "none";
    addedInfo.style.display = "block";
    messageH3.innerText = message;
  }
}

// Event listener for "ok" button on drink added message
document.getElementById("close-added").addEventListener("click", () => {
  hidePopUp();
  setTimeout(() => {
    toggleMessage();
  }, "501");
});