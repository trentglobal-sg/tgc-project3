import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//reactboostrap
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
import Container from 'react-bootstrap/Container'

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

    const confirmUpdateItem = async (id, quantity) => {
        let response = await context.updateCartItem(id, quantity)
        if (response) {
            toast.success('Item updated')
            await getCart()
            return true
        } else {
            toast.error('Something went wrong')
            return false
        }
    }

    const checkout = async () => {
        let response = await context.checkout()
        console.log(response)
    }

    const confirmDeleteItem = async (id) => {
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
        <Navbar bg="light" expand="lg" id="navbar" fixed='top' collapseOnSelect > 
        <Container className='align-items-center'>
            <Navbar.Brand className="ms-3" as={Link} to="/" ><img style={{ height: '40px' }} src={merinologyLogo} alt="logo"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav id="nav-container" className='ps-3 pe-3'>
                    <div id="nav-left">
                        <NavDropdown title="Men's" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/mens" eventKey={1}>All Men's Products</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <h6 className='ms-3'>Categories</h6>
                            <NavDropdown.Item as={Link} to="/mens/shirts" eventKey={2}>Shirts</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mens/jackets" eventKey={3}>Jackets</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mens/bottoms" eventKey={4}>Bottoms</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/mens/innerwear" eventKey={5}>Innerwear</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Women's" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/womens" eventKey={6}>All Women's Products</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <h6 className='ms-3'>Categories</h6>
                            <NavDropdown.Item as={Link} to="/womens/shirts" eventKey={7}>Shirts</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/womens/jackets" eventKey={8}>Jackets</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/womens/bottoms" eventKey={9}>Bottoms</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/womens/innerwear" eventKey={10}>Innerwear</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="About" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/merino-wool" eventKey={11}>Merino Wool</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about" eventKey={12}>Who Are We</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <hr></hr>
                    <div id="nav-right">
                        {/* <Nav.Link as={Link} to="/login">Login</Nav.Link> */}
                        {context.checkAuth() ?
                            <Fragment>
                                <Nav.Link onClick={handleShow} eventKey={13}>Cart</Nav.Link>
                                <NavDropdown title="My Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item>{localStorage.getItem('customer')}</NavDropdown.Item>
                                    <hr></hr>
                                    <NavDropdown.Item as={Link} to="/orders" eventKey={14}>My Orders</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => { logout() }} eventKey={15}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Fragment>
                            : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    </div>
                    <Offcanvas show={show} onHide={handleClose} id="cart" placement='end'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>My Cart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className='list-group'>
                                {cart ? cart.map(item => {
                                    return <CartItem item={item} getCart={getCart} confirmUpdateItem={confirmUpdateItem} confirmDeleteItem={confirmDeleteItem} />
                                }) : ''}
                            </ul>
                            {cart.length ? <button className='btn btn-primary btn-sm mt-3' onClick={checkout}>Check Out</button> : <p>Cart is Empty</p>}

                        </Offcanvas.Body>
                    </Offcanvas>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

