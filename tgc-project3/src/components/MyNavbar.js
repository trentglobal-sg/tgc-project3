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
import { Fragment, useContext, useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from './Cart'
import CartItem from './CartItem'
import { toast } from 'react-toastify'

export default function MyNavbar(props) {
    const [cart, setCart] = useState('')

    const context = useContext(CustomerContext);
    const logout = async () => {
        await context.logout()
    };

    const getCart = async () => {
        let response = await context.getCart();
        setCart(response);
        // handleShow();
    }

    const confirmUpdateItem = async (id, quantity)=>{
        let response = await context.updateCartItem(id, quantity)
        if (response){
            toast.success('Item updated')
            await getCart()
            return true
        } else {
            toast.error('Something went wrong')
            return false
        }
    }

    const checkout = async ()=>{
        let response = await context.checkout()
        console.log(response)
    }

    const confirmDeleteItem = async (id)=>{
        let response = await context.deleteCartItem(id)
        if (response) {
            toast.success('Item deleted')
            await getCart()
            return true
        } else {
            toast.error('Something went wrong')
            return false
        }
    }

    // off canvas cart controls
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        getCart()
        setShow(true)
    };

    // const mountActiveItem = (id)=>{
    //     setActiveItem (id)
    //     setActiveItemQuantity(quantity)
    // }

    // const updateItem = ()=>{

    // }

    // const updateQuantity = (e)=>{
    //     setActiveItemQuantity(e.target.value)
    // }

    // const mountActive = (id, quantity) => {
    //     setActiveItem(id)
    //     setActiveItemQuantity(quantity)
    // }


    return (
        <Navbar bg="light" expand="lg" id="navbar">
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
                    {context.checkAuth() ?
                        <Fragment>
                            <Nav.Link onClick={() => { logout() }}>Logout</Nav.Link>
                            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                        </Fragment>
                        : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    {/* <Cart show={show} handleClose={handleClose} /> */}
                    <Offcanvas show={show} onHide={handleClose} id="cart" placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>My Cart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className='list-group'>
                                {cart ? cart.map(item => { 
                                    return <CartItem item={item} getCart={getCart} confirmUpdateItem={confirmUpdateItem} confirmDeleteItem={confirmDeleteItem}/>
                                }) : ''}
                            </ul>
                            {cart.length ? <button className='btn btn-primary btn-sm mt-3' onClick={checkout}>Check Out</button> : <p>Cart is Empty</p> }
                            
                        </Offcanvas.Body>
                    </Offcanvas>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

