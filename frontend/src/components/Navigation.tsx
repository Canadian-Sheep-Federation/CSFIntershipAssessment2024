import { Nav, Navbar, Container, Form, InputGroup, Button} from "react-bootstrap";
import pokebuilder from '../assets/pokebuilder.svg'
function Navigation() {
    return(
      <>
        <Navbar bg="dark" data-bs-theme="dark" >
          <Navbar.Brand href="/" className="d-flex justify-content-start">
            <img
              src={pokebuilder}
              width="120"
              height="40"
              className="d-inline-block align-top"
              alt="Pokebuilder logo"
            />
          </Navbar.Brand >
            <Nav className="d-flex justify-content-right">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/dashboard">Create Team</Nav.Link>
            </Nav>
        </Navbar>
      </>
    )
} 

export default Navigation;