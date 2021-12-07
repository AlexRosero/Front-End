import React from "react";
import {Navbar,Container,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Barra() {
  return (
    <div>
      <>
        <Navbar variant="dark" style={{
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        padding:'1rem'}}>
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="http://pngimg.com/uploads/letter_p/letter_p_PNG46.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Peliculas Pop - Corn
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/registrarProductos">Peliculas</Nav.Link>
             </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default Barra;
