import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";

import RestaurantReviews from "./components/RestaurantReviews/RestaurantReviews";
import { AuthProvider, useAuth } from "./AuthContext ";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="review" element={<Review />} />
          <Route path="reviews" element={<Reviews />} />
          <Route
            path="restaurants"
            element={isLoggedIn ? <RestaurantReviews /> : <HomePage />}
          />
          <Route path="/app" element={<AppLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
