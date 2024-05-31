import Navigation from "../components/Navigation";
import Populate from "../components/Populate";
import '../css/Homepage.css'

function Homepage({getPokemonData, setPokemonData}: any) {
    
    return(
        <div>
            <link rel="icon" href="data:,"></link>
            <Navigation />
            <Populate getPokemonData={getPokemonData} setPokemonData={ setPokemonData}/>
        </div>
    );
}

export default Homepage;