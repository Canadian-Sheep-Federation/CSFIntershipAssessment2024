// Sending POST Request data to API when Favourite form is submitted
async function sendData() {
  // getting drinkObj stored in the drink-info div
  let drink = document.getElementById("drink-info").drinkObj;

  // getting user inputted values
  let rating = document.getElementById("rating").value;
  let notes = document.getElementById("notes").value;
  let difficulty = document.getElementById("difficulty").value;

  // getting current date
  const utc = new Date().toJSON();

  // sending POST request to cocktail list API to add an item with specified body
  await fetch("http://localhost:3000/", {
    method: "POST",
    body: JSON.stringify({
      drink_id: drink.idDrink,
      drink_name: drink.strDrink,
      drink_image: drink.strDrinkThumb,
      instructions: drink.strInstructions,
      ingredients: drink.ingredients,
      glass_type: drink.strGlass,
      rating: rating,
      difficulty: difficulty,
      notes: notes,
      date_added: utc
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => {
    // checking if cocktail already exists in database or confirming that cocktail was added
    if (response.status == 409) {
      console.log("REACHED!!");
      toggleMessage("This cocktail has already been added.");
    } else if (response.status == 201) {
      toggleMessage("Drink Added to your List!");
    }
  });
}

// Sending Delete Request to API when user wants to delete a Favourite
async function deleteFavourite(id) {
  await fetch(`http://localhost:3000/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

// Sending GET request to get all items based on selected order
function loadAllFavourites() {
  const order = document.getElementById("order").value;
  fetch("http://localhost:3000/?" + new URLSearchParams({ orderBy: order }), { method: "GET" })
    .then(results => { return results.json() })
    .then(data => {
      generateFavCards(data);
    });
}