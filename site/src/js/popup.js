// Module-Scope object for Favourite Form
var popup = document.getElementById("popup-container");

// Removing fade-transition related classes when animation is ended
popup.addEventListener("transitionend", function () {
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