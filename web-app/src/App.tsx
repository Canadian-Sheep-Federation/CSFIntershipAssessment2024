import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import RatingPage from "./RatingPage/RatingPage";
import ViewRatedPage from "./ViewRatedPage/ViewRatedPage";
import DiscoverPage from "./DiscoverPage/DiscoverPage";

function App() {
	return (
		<div className="App">
			<NavBar />
			<Router>
				<Routes>
					<Route path="/" element={<DiscoverPage />}></Route>
				</Routes>
				<Routes>
					<Route path="/rate" element={<RatingPage />}></Route>
				</Routes>
				<Routes>
					<Route path="/view" element={<ViewRatedPage />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
