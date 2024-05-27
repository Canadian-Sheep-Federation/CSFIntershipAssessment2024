import React from "react";
import Search from "./components/search/Search";
import Form from "./components/Form"; 
import Reviews from "./components/Reviews";

export default function App() {
  const [data, setData] = React.useState(null);
  const [isSearch, setShowSearch] = React.useState(true);
  const [isForm, setShowForm] = React.useState(false);
  const [isReviews, setShowReviews] = React.useState(false);

  function handleReview() {
    console.log("Write a review");
  }

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function togglePanes(pane) {
    if (pane === "search") {
      setShowSearch(true);
      setShowForm(false);
      setShowReviews(false);
    } else if (pane === "form") {
      setShowSearch(false);
      setShowForm(true);
      setShowReviews(false);
    } else if (pane === "reviews") {
      setShowSearch(false);
      setShowForm(false);
      setShowReviews(true);
    }
  }

  return (
    <div className="">
      {isSearch === false && (
        <button
          onClick={() => togglePanes("search")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        >
          Back
        </button>
      )}
      <div className="flex mt-4 justify-center">
        {isForm && <Form togglePanes={togglePanes} />}
        {isReviews && <Reviews togglePanes={togglePanes} />}
        {isSearch && <Search togglePanes={togglePanes} />}
      </div>
    </div>
  );
}
