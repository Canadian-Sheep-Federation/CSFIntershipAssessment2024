window.onload = function() {
    loadAllFavourites();
};
function loadAllFavourites() {
    fetch("http://localhost:3000/", {
        method: "GET"
    }).then((results)=>{
        return results.json();
    }).then((data)=>{
        generateFavCards(data);
    });
}
function generateFavCards(data) {
    let favContainer = document.getElementById("favourite-container");
    favContainer.innerHTML = "";
    data.favourites.forEach((favourite)=>{
        let favDiv = document.createElement("div");
        favDiv.classList.add("favourite-card");
        favDiv.addEventListener("click", ()=>{
            populateFavSummary(favourite);
            showPopUp();
        });
        favDiv.innerHTML = `
      <img
        src="${favourite.drink_image}"
        alt="${favourite.drink_name}"
      />
      <div class="fav-info">
        <h3>${favourite.drink_name}</h3>
        <p><b>Rating:</b> ${favourite.rating}/5</p>
        
        <p>${favourite.instructions}</p>
        <p><b>Glass Type:</b> ${favourite.glass_type}</p>
        <p>${favourite.notes}</p>
      </div>
    `;
        favContainer.appendChild(favDiv);
    });
}
// Function to populate favourite drink summary based on favourite that user clicked
function populateFavSummary(favourite) {
    let favInfo = document.getElementById("fav-info");
    document.getElementById("delete-confirm").favId = favourite.id;
    favInfo.innerHTML = `
    <div class="fav-image-div">
      <img
        src="${favourite.drink_image}"
        alt="${favourite.drink_name}"
      />
    </div>
    <h3>${favourite.drink_name}</h3>
    <p>${favourite.instructions}</p>
    <p><b>Glass Type: </b> ${favourite.glass_type}</p>
    <p><b>Rating:</b> ${favourite.rating}/5</p>
    <p><b>Notes:</b> ${favourite.notes}</p>
  `;
}
// Togglging delete confirm message
function toggleDeleteConfirm() {
    let favInfo = document.getElementById("fav-info-container");
    let closeBtn = document.getElementById("fav-close");
    let deleteInfo = document.getElementById("delete-info");
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
// Delete button event listener
document.getElementById("delete-btn").addEventListener("click", ()=>{
    toggleDeleteConfirm();
});
// Cancel Button toggles info back
document.getElementById("delete-cancel").addEventListener("click", ()=>{
    toggleDeleteConfirm();
});
document.getElementById("delete-confirm").addEventListener("click", function deleteItem() {
    deleteFavourite(this.favId).then(()=>{
        loadAllFavourites();
    });
    hidePopUp();
    setTimeout(()=>{
        toggleDeleteConfirm();
    }, "501");
});

//# sourceMappingURL=favourites.1c6562ea.js.map
