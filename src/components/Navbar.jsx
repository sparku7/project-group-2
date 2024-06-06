import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg" className="custom-navbar fixed-top" expanded={expanded}>
        <Container>
          <Navbar.Brand href="/">WrongMove</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onClick={() => setExpanded(false)}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/buyers">Buyers</Nav.Link>
              <Nav.Link href="/sellers">Sellers</Nav.Link>
              <Nav.Link href="/propertyadmin">Property Admin</Nav.Link>
              <Nav.Link href="/appointments">Appointments</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
     </>
  );
}

export default NavBar;
