import { Card, Col, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import CustomModal from "./CustomModal"
import '../css/CustomCard.css'

type props = {
    data: data
}

type data = {
    id: string ,
    sprites: sprites
    name: string
    types: []
    cries: cries
}

type sprites = {
    front_default: string
}

type cries = {
    latest: string
    legacy: string
  }

let colours : {[key : string] : string} = {
    "normal": '#A8A77A',
    "fire": '#EE8130',
    "water": '#6390F0',
    "electric": '#F7D02C',
    "grass": '#7AC74C',
    "ice": '#96D9D6',
    "fighting": '#C22E28',
    "poison": '#A33EA1',
    "ground": '#E2BF65',
    "flying": '#A98FF3',
    "psychic": '#F95587',
    "bug": '#A6B91A',
    "rock": '#B6A136',
    "ghost": '#735797',
    "dragon": '#6F35FC',
    "dark": '#705746',
    "steel": '#B7B7CE',
    "fairy": '#D685AD'
}

function CustomCard( { data } : props) {

    const [show, setShow] = useState(false);
    const [getTypes, setTypes] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const findTypes = () =>{
          let types:  [] = []
          data["types"].forEach( (d) => {
            types.push(d["type"]["name"])})
          setTypes(types)
        }
        findTypes()
      }, [])
        
    return(
        <div >
            <CustomModal show={show} handleClose={handleClose} types={getTypes} colours={colours} data={data}/>

            <Card 
            className="Card shadow p-3 mb-5 bg-white rounded"
            onClick={handleShow}  
            style={{ width: '18rem', background:`linear-gradient(113.5deg, ${colours[getTypes[0]]}, ${colours[getTypes[1]] || colours[getTypes[0]]}`}}>
            <Card.Img variant="top" src={data["sprites"]["front_default"]} />
                <Card.Body>
                    <Card.Title>{data["name"]}</Card.Title>
                    {getTypes.map((element) => (
                        <Container>
                        <Col className='d-flex my-1'>
                        <Card 
                        className='p-1'
                        key={element}
                        style={{background: colours[element]}}
                        >
                        {element}
                        </Card>
                        </Col>
                        </Container>
                    ))}
                    {/* <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text> */}
                </Card.Body>
                {}
            </Card>
        </div>
    )
}

export default CustomCard