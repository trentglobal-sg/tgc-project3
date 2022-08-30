import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function Order(props) {
    return (
        <Fragment>
                <Modal.Header closeButton>
                    <Modal.Title>{props.order_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.order_status}</Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={props.handleClose}>
                        Close
                    </button>
                </Modal.Footer>
        </Fragment>
    )
}