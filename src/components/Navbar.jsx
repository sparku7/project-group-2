import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <>
      <Navbar bg="light" className="custom-navbar fixed-top" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">WrongMove</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/buyers">Buyers</Nav.Link>
            <Nav.Link href="/sellers">Sellers</Nav.Link>
            <Nav.Link href="/newproperty">Add Property</Nav.Link>
            <Nav.Link href="/bookappointment">Book Appointment</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
     </>
  );
}

export default NavBar;
