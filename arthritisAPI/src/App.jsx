import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ID from './Pages/ID';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ID />} />
       </Routes>
    </>
 );
};

export default App;


