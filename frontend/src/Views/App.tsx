import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../Views/Homepage'
import Login from '../Views/Login'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from '../Views/Signup'
import Dashboard from '../Views/Dashboard'

function App() {

    //Check if signed in
    const [auth, setAuth] = useState('');
    
    const [getPokemonData, setPokemonData] = useState([]);
    
    //For fetching etailed data of each pokemon
    const router = createBrowserRouter([
        {
          path: '/',
          element: <Homepage getPokemonData={getPokemonData} setPokemonData={setPokemonData}/>,
        },
        {
          path: '/signup',
          element: <Signup setAuth={setAuth}/>,
        },
        {
          path: '/login',
          element: <Login setAuth={setAuth}/>,
        },
        {
          path: '/dashboard',
          loader: () => (!auth ? null : redirect('/signup')),
          element: <Dashboard auth={auth} getPokemonData={getPokemonData} setPokemonData={setPokemonData}/>
        }
      ]);
      return(
    //     <BrowserRouter>
    //         <Routes>

    //         <Route path="/" element={<Homepage getPokemonData={getPokemonData} setPokemonData={setPokemonData}/>} />
    //         <Route path="/signup" element={<Signup setAuth={setAuth}/>} />
    //         <Route path="/login" element={<Login setAuth={setAuth}/>} />
    //         <Route path="/dashboard" element={<Dashboard getPokemonData={getPokemonData} setPokemon={setPokemonData}/>} />
    //         </Routes>
 
    //   </BrowserRouter>
        <RouterProvider router={router} />
      )
}

export default App