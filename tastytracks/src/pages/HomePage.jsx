import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

import PageNav from "../components/PageNav/PageNav";
import { useAuth } from "../AuthContext ";

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Discover the Best Stays.
          <br />
          RateYourStay keeps track of your Restaurants experiences.
        </h1>
        <h2>
          Explore a world that highlights your dining experiences in restaurants
          across every city. Never forget your delightful meals, and share your
          culinary adventures with friends as you savor the globe.
        </h2>
        <Link to="/app" className={styles.cta}>
          Rate Your Experience
        </Link>
      </section>
    </main>
  );
}
