import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar(): JSX.Element {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">TV Show Rater</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Discover Shows</Nav.Link>
                        <Nav.Link href="/rate">Rate</Nav.Link>
                        <Nav.Link href="/view">View Rated</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;