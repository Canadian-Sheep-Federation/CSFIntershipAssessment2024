import { Dispatch, SetStateAction, createContext } from "react"

// export type AuthenticationType = {
//     getPokemonData: getPokemonData[],
//     setPokemonData: Dispatch<SetStateAction<[]>>
// }


// type getPokemonData = {
//     id: string 
//     sprites: sprites
//     name: string
//     types: any[]
//     cries: cries
// }



// type sprites = {
//     front_default: string
// }

// type cries = {
//     latest: string
//     legacy: string
// }

// const authType = {
//    getPokemonData: [],
//    setPokemonData: () => {}
// }
const PokeData = createContext<any>(null)

export default PokeData