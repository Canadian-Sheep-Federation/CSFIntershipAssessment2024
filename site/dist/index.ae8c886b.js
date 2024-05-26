// Module-Scope object for Favourite Form
var popup = document.getElementById("fav-form-container");
// Removing fade-transition related classes when animation is ended
popup.addEventListener("transitionend", function() {
    popup.classList.remove("box-transition");
    popup.classList.remove("box-visible");
    popup.classList.remove("box-hidden");
});
// Function to Show Favourite Form, Event listener added to cocktail cards
function showPopUp() {
    document.getElementById("fav-close").addEventListener("click", hidePopUp);
    disableScroll();
    popup.classList.add("box-visible");
    popup.clientWidth;
    popup.classList.add("box-transition");
    popup.classList.add("box-active");
}
// Function to Hide Favourite Form, Event listener added to close button on form
function hidePopUp() {
    enableScroll();
    popup.classList.remove("box-active");
    popup.classList.add("box-transition");
    popup.classList.add("box-hidden");
}
// Sending data to API when Favourite form is submitted
function sendData() {
    let drink = document.getElementById("drink-info").drinkObj;
    let rating = document.getElementById("rating").value;
    let notes = document.getElementById("notes").value;
    const utc = new Date().toJSON().slice(0, 10);
    fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify({
            drink_id: drink.idDrink,
            drink_name: drink.strDrink,
            drink_image: drink.strDrinkThumb,
            instructions: drink.strInstructions,
            glass_type: drink.strGlass,
            rating: rating,
            notes: notes,
            date_added: utc
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((result)=>{});
}

//# sourceMappingURL=index.ae8c886b.js.map
