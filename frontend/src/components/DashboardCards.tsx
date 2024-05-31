import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";


function DashboardCards({refresh, setRefresh}: any) {

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
    

    const [cards, setCards] = useState([]);
      useEffect(() => {
        const createCards = async () => {
            let display: any[] = []
            let rowID = 0;
            axios.get(`http://localhost:3000/dashboard/list`).then(function (response) {
            console.log(response.data)
            display.push(
                <Row className="p-2 " key={rowID}>
                    {
                        response.data.map((data : any, idx: number) => (
                            <Card
                            className="Card shadow p-3 my-5 mx-2 bg-white rounded"
                            style={{ width: '18rem', background:`linear-gradient(113.5deg, ${colours[data['type']]}, ${colours[data['type']] || colours[data['type']]}`}}>
                            <Card.Img variant="top" src={data["sprite"]} />
                            <Card.Body>
                                <Card.Title>{data["name"]}</Card.Title>
                                    <Container>
                                    <Col className='d-flex my-1'>
                                    <Card 
                                    className='p-1'
                                    key={data["type"]}
                                    style={{background: colours[data["type"]]}}
                                    >
                                    {data["type"]}
                                    </Card>
                                    </Col>
                                    </Container>
                                    <Card.Text>{data['description']}</Card.Text>
                                </Card.Body>
                                </Card>
                    ))
                }
                </Row>
            )
            setCards(display)
            setRefresh(false)
        })}
        createCards()
    }, [refresh])


    return(
        <div>
            {[...cards]}
        </div>
    )
}

export default DashboardCards;