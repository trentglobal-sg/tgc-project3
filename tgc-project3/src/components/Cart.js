import {Fragment, useContext, useState, useEffect} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import CustomerContext from '../CustomerContext';
import '../index.css';

export default function Cart(props) {
    const customerContext = useContext(CustomerContext)

    return (
            <Offcanvas show={props.show} onHide={props.handleClose} id="cart" placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='my-bold'>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                    {/* <button onClick={()=>{getCart()}}>Get</button> */}
                </Offcanvas.Body>
            </Offcanvas>
    );
}