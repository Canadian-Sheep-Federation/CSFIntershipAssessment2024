import React from "react";
import Search from "./components/search/Search";
import Form from "./components/review/Form"; 

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
    <div className="flex mt-4 justify-center">
      {isForm && <Form togglePanes={togglePanes} />}
      {isReviews && <Form togglePanes={togglePanes} />}
      {isSearch && <Search togglePanes={togglePanes} />}
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}
