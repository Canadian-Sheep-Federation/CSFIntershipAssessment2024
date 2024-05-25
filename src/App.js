import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Saved from "./Components/Saved/Saved";
import Home from "./Components/Home/Home";
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-blue-800">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memories" element={<Saved />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
