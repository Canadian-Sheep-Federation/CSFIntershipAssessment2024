import NumResults from "../NumResults/NumResults";
import PageNav from "../PageNav/PageNav";
import Search from "../Search/Search";
// styles
import styles from "./SearchBar.module.css";

const SearchBar = ({ children }) => {
  return (
    <>
      <PageNav />
      <nav className={styles.navBar}>{children}</nav>
    </>
  );
};

export default SearchBar;
