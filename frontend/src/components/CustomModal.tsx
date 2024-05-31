import { useEffect, useState } from 'react';
import {Modal, Image, Card, Row, Col, Container} from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
type props = {
    show: boolean,
    handleClose: () => void
    colours: any
    data: data
    types: []
}

type data = {
  id: string
  sprites: sprites
  name: string
  types: any[]
  cries: cries
}

type sprites = {
  front_default: string
}
type cries = {
  latest: string
  legacy: string
}

let c : {[key : string] : string} = {
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

function CustomModal({show, handleClose, colours, data, types}: props) {

  
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal key={data['name']} show={show} onHide={handleClose}>
        <Modal.Header style={{background:`linear-gradient(113.5deg, ${colours[types[0]]}, #F8A4A7`}} closeButton>
          <Modal.Title>{data['name']}</Modal.Title>
        </Modal.Header>

        <Modal.Body 
        key={data['name']}
        style={{background:`linear-gradient(113.5deg, ${colours[types[0]]}, ${colours[types[1]] || colours[types[0]]}`}}>
          <Image src={data["sprites"]["front_default"]}></Image>
          {types.map((element) => (
            <Container>
              <Col className='d-flex my-1'>
            <Card 
            className='p-1'
            key={element}
            style={{background: c[element]}}
            >
              {element}
            </Card>
              </Col>
              </Container>
          ))}
          <AudioPlayer key={data['name']}
          src={data["cries"]["latest"]}/>
        </Modal.Body>

        {/* <Modal.Footer style={{background:`linear-gradient(113.5deg, ${colour}, #F8A4A7`}}>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Add to Team</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default CustomModal;