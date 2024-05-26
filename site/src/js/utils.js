// Disables scrolling on page (used in popup.js)
function disableScroll() {
  // get the current page scroll position
  scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop;
  scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft,

    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
}

// Enables scrolling on page (used in popup.js)
function enableScroll() {
  window.onscroll = function () { };
}