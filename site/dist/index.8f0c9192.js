// Resetting the search form and list form on refresh / initial load
window.onload = function() {
    document.getElementById("cocktail-form").reset();
    document.getElementById("fav-form").reset();
};
// adding event listeners once DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Event listener for cocktail search (loads carousel based on results)
    document.getElementById("cocktail-form").addEventListener("submit", (event)=>{
        // Preventing the default form action (submit)
        event.preventDefault();
        searchCockTails(event);
    });
    // Adding event listener for Random Cocktail Button
    document.getElementById("random-btn").addEventListener("click", ()=>{
        getRandomCocktail();
    });
    // Event Listener for Fav Form (sends user inputted data to API)
    const favForm = document.getElementById("fav-form");
    favForm.addEventListener("submit", (event)=>{
        // Preventing the default form action (submit)
        event.preventDefault();
        sendData();
        // Resetting form back to default
        favForm.reset();
        document.getElementById("slider-number").innerHTML = "3";
    });
});

//# sourceMappingURL=index.8f0c9192.js.map
