import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import DashboardCards from "../components/DashboardCards";

function Dashboard({getPokemonData, setPokemonData, auth}: any) {
    interface results {
        name?: string ;
        url?: string ;
    }
    const [getOptions, setOptions] = useState<JSX.Element[]>([])
    

    const [refresh, setRefresh] = useState(false)

    const [validated, setValidated] = useState(false);
    
    const [getURL, setURL] = useState('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0')
    
    //For fetching data
    const [getData, setData] = useState<results[]>([])
    
    
    const [formData, setFormData] = useState({
        pokemon: '',
        name: '',
        type: '',
        description: '',
        sprite: ''
    });
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
   
    //detailed information of each pokemon: Stored in getPokemonData
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

    //Fetching all names and displaying them in a select box
    useEffect(() =>{
        const fetchNames = () => {
            let options: any[] = [];
            console.log(getPokemonData)
            options.push(
            getPokemonData.map((data : any, idx: number) => (
                <option key={idx} value={data['id']-1}>{data['name']}</option>
                )))
            setOptions(options)
        }
        fetchNames()
    }, [getPokemonData, setPokemonData])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const chooseItem = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: getPokemonData[value].name,
            "sprite":getPokemonData[value]["sprites"]['front_default']
        }));
    };

    //on submission of form
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log('Form Data:', formData);
        }
        setValidated(true);
    };
    //post request to submit a new card 
    function sendData() {
        axios.post(`http://localhost:3000/dashboard/${formData.name}`, formData).then(function (response) {
            console.log(response)
            setRefresh(true)
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return(
 
        <div>
            <Navigation />
            <Container data-bs-theme="dark" className="pt-5 justify-content-center align-items-center vh-100" >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
            <Form.Select 
            aria-label="Default select example"
            name="pokemon"
            onChange={chooseItem}
            >
                {[...getOptions]}
            </Form.Select>

            <Form.Group className="mb-3" controlId="pokemonName" >
                <Form.Label>Name your Pokemon!</Form.Label>
                <Form.Control 
                type="name" 
                placeholder="John Smitherstein" 
                required 
                name="name"
                value={formData.name}
                onChange={handleInputChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="pokemonName">
                <Form.Label>Choose their typing!</Form.Label>
            <Form.Select 
            aria-label="Default select example" 
            name="type"
            value={formData.type}
            onChange={handleInputChange}>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="electric">electric</option>
                <option value="grass">grass</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dragon">dragon</option>
                <option value="dark">dark</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>

            </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="dsad">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                name="description"
                value={formData.description}
                onChange={handleInputChange}/>
            </Form.Group>
            <Button variant="primary" onClick={sendData} type="submit">Create Pokemon</Button>
            </Form>
            <DashboardCards refresh={refresh} setRefresh={setRefresh}/>
            </Container>
        </div>

    );
}

export default Dashboard;