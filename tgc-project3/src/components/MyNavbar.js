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

export default function MyNavbar(props) {
    const [cart, setCart] = useState('')
    const [activeItem, setActiveItem] = useState('')
    const [activeItemQuantity, setActiveItemQuantity] = useState('')

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
                                    return <CartItem item={item}/>
                                    // <li className='list-group-item' >
                                    //     <div className='row'>
                                    //         <div className='col col-3'>
                                    //             <img style={{ width: "100%" }} src={item.product_variant.variant.variant_thumbnail_url}></img>
                                    //         </div>
                                    //         <div className='col col-6'>
                                    //             <h6 style={{ fontSize: "small", height: "fit-content" }}>{item.product_variant.variant.product.product}</h6>
                                    //             <h6 style={{ fontSize: "small", height: "fit-content" }}>{item.product_variant.variant.color_name} | {item.product_variant.size.size}</h6>
                                    //             <h6 style={{ fontSize: "small", height: "fit-content" }}>$ {item.product_variant.variant.product.cost / 100}</h6>
                                    //             <div style={{ display: 'flex' }}>
                                    //                 {activeItemQuantity ?
                                    //                     <div>
                                    //                         <input type='number' style={{ width: '60px' }} className='form-control form-control-sm' value={activeItemQuantity} onChange={(e)=>{updateQuantity(e)}} /> <button className='btn btn-sm btn-primary ms-2' >Update</button>
                                    //                     </div>
                                    //                     :
                                    //                     <input type='number' style={{ width: '60px' }} className='form-control form-control-sm' value={item.quantity} onChange={()=>{mountActive(item.id, item.quantity)}} />
                                    //                 }

                                    //             </div>

                                    //         </div>
                                    //         <div className='col col-2'>
                                    //             <button className='btn btn-sm btn-danger' >Delete</button>
                                    //         </div>
                                    //     </div>
                                    // </li>
                                }) : ''}
                            </ul>
                            <button className='btn btn-primary btn-sm mt-3'>Check Out</button>

                        </Offcanvas.Body>
                    </Offcanvas>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

