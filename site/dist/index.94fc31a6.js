// Search Carousel
function showCarousel(event) {
    // Preventing the default form action (submit)
    event.preventDefault();
    // Showing the carousel if hidden
    // let carousel = document.getElementById("carousel");
    // carousel.style.display = "block"
    // Enabling Scrolling Effect for carousel Buttons (function in button.js)
    // addButtonScroll();
    searchCockTails(event);
}
function searchCockTails(event) {
    // Getting the search text to be used to search the cocktail API
    const searchText = document.getElementById("searchText").value;
    // Getting the container for the carousel
    const cocktailContainer = document.getElementById("cocktail-container");
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchText)}`).then((response)=>response.json()).then((data)=>{
        cocktailContainer.innerHTML = "";
        if (data.drinks) data.drinks.forEach((drink)=>{
            let drinkDiv = document.createElement("div");
            drinkDiv.classList.add("cocktail-card");
            // Adding event listener for each card to show the favourite form
            drinkDiv.addEventListener("click", (event)=>{
                showFavForm(event, drink.strDrink, drink.strDrinkThumb, drink.strInstructions, drink.strGlass);
            });
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
    });
}

//# sourceMappingURL=index.94fc31a6.js.map
