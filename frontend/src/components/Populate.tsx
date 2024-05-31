import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "./CustomCard";


function Populate({getPokemonData, setPokemonData}: any) {
    //Types for TypeScript 
    interface results {
        name?: string ;
        url?: string ;
    }

    const [getURL, setURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0')

    //For fetching data
    const [getData, setData] = useState<results[]>([])
    
    //For fetching etailed data of each pokemon
    // const [getPokemon, setPokemon] = useState<any[]>([])
    
    //List of all Pokemon in the format of a Card
    const [getCards, setCards] = useState<JSX.Element[]>([])


    //Data containing name and url for more details of each pokemon: Stored in getData
    useEffect(() => {
        const fetchPokeData = async (URL : string) => { 
                try{
                    const res = await axios.get(URL)
                    console.log(res.data)
                    setData(res.data.results);
                    setURL(res.data.results.next)

                } catch (e) {console.log(e)}
                    // console.log(res.data.results)
            }
            fetchPokeData(getURL)
    }, []); 
   
    //detailed information of each pokemon: Stored in getPokemon
    useEffect(() => {
        const fetchDetails = async () => {
            const detailsPromises = getData.map(async (result) => {
                if (result.url) {
                    const res = await axios.get(result.url);
                    return res.data;
                }
                return null;
            });

            try {   
                const details = await Promise.all(detailsPromises)
                    setPokemonData(details); 
                    console.log(details)

            } catch (error) {   
                console.error("Error fetching details:", error);
            }
        };

        if (getData.length > 0) { 
            fetchDetails();
        }
    }, [getData,setPokemonData]);

    
    useEffect(() => {
        const createCards = async () => {
            let cardList: any[] = []
            let rowID = 0;
            console.log(getPokemonData)

            cardList.push(
                <Row key={rowID}>
                    {
                        getPokemonData.map((data : any, idx: number) => (
                            <Col className="p-2 " key={idx+1}>
                            <CustomCard key={data["id"]*idx} data={data} />
                        </Col>
                    ))
                }
                </Row>
            )
            setCards(cardList)
        }
        createCards()
    }, [getPokemonData])

    return(
        <>
        {[...getCards]}
        </>
        
    );

}

export default Populate;