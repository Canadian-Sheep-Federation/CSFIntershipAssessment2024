
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./component/Header";
import Home from "./page/Home";
import Breed from "./page/Breed";
import Feedback from "./page/Feedback";
import Detail from "./page/Detail";
import NotFound from "./page/NotFound";

function App() {


  return (
    <div className=" bg-zinc-900 text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <BrowserRouter basename="/">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/feedback/:id" element={<Detail />} />
            <Route path="/breed/:breed" element={<Breed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div></div>

  )
}

export default App
