// Loading all cocktail list items on page load
window.onload = function () {
  loadAllFavourites();
};

// adding event listeners once DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // reloading cocktail list when order selector is changed
  document.getElementById("order").addEventListener("change", () => {
    loadAllFavourites();
  });

  // Toggling delete confirm message on popup window
  function toggleDeleteConfirm() {
    let favInfo = document.getElementById("fav-info-container");
    let closeBtn = document.getElementById("fav-close");
    let deleteInfo = document.getElementById("delete-info");

    // checking the state of the popup and changing depending on said state
    if (favInfo.style.display == "none" && closeBtn.style.display == "none" && deleteInfo.style.display == "block") {
      favInfo.style.display = "block";
      closeBtn.style.display = "block";
      deleteInfo.style.display = "none";
    } else {
      favInfo.style.display = "none";
      closeBtn.style.display = "none";
      deleteInfo.style.display = "block";
    }
  }

  // Delete button event listener to toggle delete message
  document.getElementById("delete-btn").addEventListener("click", () => {
    toggleDeleteConfirm();
  });

  // Cancel Button toggles info back
  document.getElementById("delete-cancel").addEventListener("click", () => {
    toggleDeleteConfirm();
  });

  // Event listener for delete confirmation button
  document.getElementById("delete-confirm").addEventListener("click", function deleteItem() {
    // sending delete request to API, then reloading cocktail list
    deleteFavourite(this.favId).then(() => {
      loadAllFavourites();
    });
    hidePopUp();

    // toggling the delete confirm message after popup fade out
    setTimeout(() => {
      toggleDeleteConfirm();
    }, "501");
  });
});

// Generating list items from cocktail list
function generateFavCards(data) {
  let favContainer = document.getElementById("favourite-container");
  // resetting existing HTML in list container
  favContainer.innerHTML = "";

  // if there are list items
  if (data.favourites.length !== 0) {
    // for each list item, create a card
    data.favourites.forEach(favourite => {
      let favDiv = document.createElement("div");
      favDiv.classList.add("favourite-card");

      // adding event listener to each card to show popup with more details from card
      favDiv.addEventListener("click", () => {
        populateFavSummary(favourite);
        showPopUp();
      });

      // card structure
      favDiv.innerHTML = `
        <img
          src="${favourite.drink_image}"
          alt="${favourite.drink_name}"
        />
        <div class="fav-info">
          <h3>${favourite.drink_name}</h3>
          <p><b>Rating:</b> ${favourite.rating}/5</p>
          <p><b>Difficulty:</b> ${favourite.difficulty}</p>
          <p>${favourite.date_added.slice(0, 10)}</p>
          <p>${favourite.notes}</p>
        </div>
      `;

      favContainer.appendChild(favDiv);
    });
  } else {
    // if there are no list items then display this message
    favContainer.innerHTML = `
      <h3>Nothing Here...</h3>
    `
  }
}

// Function to populate favourite drink summary based on favourite that user clicked
function populateFavSummary(favourite) {
  let favInfo = document.getElementById("fav-info");

  // setting favId attribute of delete confirm button to the current item id \
  // so that it can be used if the user wants to delete this item
  document.getElementById("delete-confirm").favId = favourite.id;

  // popup structure
  favInfo.innerHTML = `
    <div class="fav-image-div">
      <img
        src="${favourite.drink_image}"
        alt="${favourite.drink_name}"
      />
    </div>
    <h3>${favourite.drink_name}</h3>
    <p><b>Ingredients: </b>${favourite.ingredients}</p>
    <p>${favourite.instructions}</p>
    <p><b>Glass Type:</b> ${favourite.glass_type}</p>
    <p><b>Rating:</b> ${favourite.rating}/5</p>
    <p><b>Difficulty:</b> ${favourite.difficulty}</p>
    <p><b>Notes:</b> ${favourite.notes}</p>
    <p>${favourite.date_added.slice(0, 10)}</p>
  `;
}

