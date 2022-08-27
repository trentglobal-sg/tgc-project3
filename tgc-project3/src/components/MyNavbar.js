import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//reactboostrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import merinologyLogo from '../images/merinology.png'
import '../index.css'
import CustomerContext from '../CustomerContext';
import { useContext } from 'react'

export default function MyNavbar() {
    const context = useContext(CustomerContext)
    const logout = async () => {
        await context.logout()
    }

    return (
        <Navbar bg="light" expand="lg" id="navbar">
            {/* <Container> */}
            <Navbar.Brand className="ms-3" href="/"><img style={{ height: '40px' }} src={merinologyLogo} alt="logo"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Men's" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/mens" >All Men's Products</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <h6 className='ms-3'>Categories</h6>
                        <NavDropdown.Item as={Link} to="/mens/shirts">Shirts</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/mens/jackets">Jackets</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/mens/bottoms">Bottoms</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/mens/innerwear">Innerwear</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Women's" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/womens">All Women's Products</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <h6 className='ms-3'>Categories</h6>
                        <NavDropdown.Item as={Link} to="/womens/shirts">Shirts</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/womens/jackets">Jackets</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/womens/bottoms">Bottoms</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/womens/innerwear">Innerwear</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="About" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/merino-wool">Merino Wool</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/about">Who Are We</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <button className='btn btn-sm btn-primary' onClick={()=>{logout()}} >Logout</button>
                </Nav>
            </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    )

}

