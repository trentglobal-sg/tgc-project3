import Offcanvas from 'react-bootstrap/Offcanvas';
import '../index.css';

export default function Cart(props) {
    return (
            <Offcanvas show={props.show} onHide={props.handleClose} id="cart" placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
    );
}