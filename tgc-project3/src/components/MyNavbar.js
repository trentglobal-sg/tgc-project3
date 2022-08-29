import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//reactboostrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import merinologyLogo from '../images/merinology.png'
import '../index.css'
import CustomerContext from '../CustomerContext';
import { useContext, useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from './Cart'

export default function MyNavbar(props) {
    const [cart, setCart] = useState('')
    const context = useContext(CustomerContext);
    const logout = async () => {
        await context.logout()
    };

    // off canvas cart controls
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        const getCart = async () => {
            let response = await context.getCart();
            setCart(response);
        }
        getCart();
        setShow(true)
    };

    return (
        <Navbar bg="light" expand="lg" id="navbar">
            {/* <Container> */}
            <Navbar.Brand className="ms-3" as={Link} to="/" ><img style={{ height: '40px' }} src={merinologyLogo} alt="logo"></img></Navbar.Brand>
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
                    {context.checkAuth() ? <Nav.Link onClick={() => { logout() }}>Logout</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                    {/* <Cart show={show} handleClose={handleClose} /> */}
                    <Offcanvas show={show} onHide={handleClose} id="cart" placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>My Cart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {cart ? cart.map(cart=>{
                                return <div>
                                    <h1>ID: {cart.id}</h1>
                                    <h2>Quantity: {cart.quantity}</h2>
                                </div>
                            }) : ''}
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Nav.Link onClick={() => { context.getSession() }}>SESSIONS</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    )

}

