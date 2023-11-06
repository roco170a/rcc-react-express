import { BlogOnline } from "./blogOnline"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function BlogNav() {    
    return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Blog</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            
            { BlogOnline() && <Nav.Link href="/create">Nuevo</Nav.Link> }  
          </Nav>
        </Container>
      </Navbar>

            

    )
}

