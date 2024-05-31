import { useState } from "react";

function PokemonData() {
    const [getPokemonData, setPokemonData] = useState([]);
    return [getPokemonData, setPokemonData] 
}

export default PokemonData