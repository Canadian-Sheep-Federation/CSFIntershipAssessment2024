import {useState } from 'react'
import { createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
import Homepage from '../Views/Homepage'
import Login from '../Views/Login'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from '../Views/Signup'
import Dashboard from '../Views/Dashboard'

function App() {

    //Check if signed in
    const [auth, setAuth] = useState('');
    
    const [getPokemonData, setPokemonData] = useState([]);
    
    //Routing the different paths to their respective Views
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
        <RouterProvider router={router} />
      )
}

export default App