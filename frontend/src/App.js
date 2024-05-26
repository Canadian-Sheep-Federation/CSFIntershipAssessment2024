import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import FormResponseDetails from "./components/FormResponseDetails";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Switch>
          <Route exact path="/" component={MovieSearch} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/response/:id" component={FormResponseDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
