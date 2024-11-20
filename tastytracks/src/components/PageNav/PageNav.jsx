import { NavLink, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../AuthContext ";

const PageNav = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className={styles.ctaLink}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PageNav;
