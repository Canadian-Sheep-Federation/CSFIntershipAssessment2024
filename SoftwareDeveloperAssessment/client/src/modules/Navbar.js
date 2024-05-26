import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link style={{ padding: "20px" }} to="/">
        Home
      </Link>
      <Link style={{ padding: "20px" }} to="/reviews">
        Reviews
      </Link>
    </div>
  );
}
