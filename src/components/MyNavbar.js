import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//reactboostrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../index.css'
import CustomerContext from '../CustomerContext';
import { Fragment, useContext, useState, useEffect, createFactory } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import CartItem from './CartItem'
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container'

export default function MyNavbar(props) {
    const [cart, setCart] = useState('')
    const [cartTotal, setCartTotal] = useState('')

    const context = useContext(CustomerContext);
    const logout = async () => {
        await context.logout()
    };

    const getCart = async () => {
        if (localStorage.getItem('accessToken')) {
            let response = await context.getCart();
            setCart(response);
            // handleShow();
            let total = 0
            response.map(item => {
                let quantity = item.quantity;
                let cost = item.product_variant.variant.product.cost;
                let itemTotal = quantity * cost;
                total = total + itemTotal
            })
            setCartTotal(total)
        }
    }

    useEffect(() => {
        let getCartOnMount = async () => {
            getCart()
        }
        getCartOnMount()
    }, [])

    const confirmUpdateItem = async (id, quantity) => {
        let response = await context.updateCartItem(id, quantity)
        if (response) {
            toast.success('Item updated')
            await getCart()
            return quantity
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

    return (
        <Navbar bg="light" expand="lg" id="navbar" fixed='top' collapseOnSelect>
            <Container className='align-items-center'>
                <Navbar.Brand className="ms-3" as={Link} to="/" ><h4 className='my-company-font'>merinology</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav id="nav-container" className='ps-3 pe-3 '>
                        <div id="nav-left">
                            <NavDropdown title="Men's" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/mens" eventKey={1} className="my-bold">All Men's Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <h6 className='ms-3 my-bold'>Categories</h6>
                                <NavDropdown.Item as={Link} to="/mens/shirts" eventKey={2}>Shirts</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/mens/jackets" eventKey={3}>Jackets</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/mens/bottoms" eventKey={4}>Bottoms</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/mens/innerwear" eventKey={5}>Innerwear</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Women's" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/womens" eventKey={6} className="my-bold">All Women's Products</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <h6 className='ms-3 my-bold'>Categories</h6>
                                <NavDropdown.Item as={Link} to="/womens/shirts" eventKey={7}>Shirts</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/womens/jackets" eventKey={8}>Jackets</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/womens/bottoms" eventKey={9}>Bottoms</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/womens/innerwear" eventKey={10}>Innerwear</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/merino-wool" eventKey={11}>Merino Wool</Nav.Link>
                        </div>
                        <hr></hr>
                        <div id="nav-right">
                            {localStorage.getItem('accessToken') ?
                                <Fragment>
                                    <Nav.Link onClick={handleShow} eventKey={13}>
                                        <div id="cart-logo-container">
                                            {cart.length ? <span id="cart-counter" className='my-text-font-small' style={{ position: 'fixed' }}>{cart.length}</span> : ''}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                        </div>
                                    </Nav.Link>
                                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                                        <h6 className='ms-3 pt-2 my-bold'>Hi, {localStorage.getItem('customer')}</h6>
                                        <hr></hr>
                                        <NavDropdown.Item as={Link} to="/orders" eventKey={14}>My Orders</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => { logout() }} eventKey={15}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                </Fragment>
                                : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        </div>
                        <Offcanvas show={show} onHide={handleClose} id="cart" placement='end'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='my-bold'>My Cart</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <ul className='list-group'>
                                    {cart ? cart.map(item => {
                                        return <CartItem item={item} getCart={getCart} confirmUpdateItem={confirmUpdateItem} confirmDeleteItem={confirmDeleteItem} />
                                    }) : ''}
                                </ul>
                                {cart.length ? <div>
                                    <div className='my-bold mt-3'>Total: ${cartTotal / 100}</div>
                                    <button className='btn my-btn btn-sm mt-2' onClick={checkout}>Checkout</button>
                                </div> : <p className='my-bold'>Cart is Empty</p>}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

