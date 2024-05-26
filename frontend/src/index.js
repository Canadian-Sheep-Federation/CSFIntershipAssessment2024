import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Ensure custom CSS is imported after Bootstrap
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
