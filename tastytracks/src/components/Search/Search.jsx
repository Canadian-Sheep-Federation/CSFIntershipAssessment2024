import { useState } from "react";
//style
import styles from "./Search.module.css";

const Search = ({ query, setQuery }) => {
  return (
    <div>
      <input
        className={styles.search}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
