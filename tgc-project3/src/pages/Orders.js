import { Fragment, useState, useEffect, useContext } from 'react';
import CustomerContext from '../CustomerContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal';

export default function Orders() {
    const navigate = useNavigate()
    const customerContext = useContext(CustomerContext)
    const [orders, setOrders] = useState('')
    const [activeOrder, setActiveOrder] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setActiveOrder('')
        setShow(false);
    }
    const handleShow = (id) => {
        let selectedOrder = [];
        for (let order of orders) {
            if (order.id == id) {
                selectedOrder.push(order)
            }
        }
        setActiveOrder(selectedOrder)
        setShow(true);
    }

    const getOrdersData = async () => {
        let response = await customerContext.getOrders()
        return response
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    useEffect(() => {
        let mount = async () => {
            let orderData = await getOrdersData()
            setOrders(orderData)
        }
        mount()
    }, [])

    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h1>My Orders</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Updated Date</th>
                            <th>Amount</th>
                            <th>Shipping Type</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders ? orders.map(order => {
                            return <tr>
                                <td>{order.id}</td>
                                <td>{order.order_status.order_status}</td>
                                <td>{moment(order.order_date).format('YYYY-MM-DD')}</td>
                                {order.updated_date ? <td>{moment(order.updated_date).format('YYYY-MM-DD')}</td> : <td><p>As Order Date</p></td>}
                                <td>$ {order.total_amount / 100}</td>
                                <td>{order.shipping_type}</td>
                                <td><button className='btn btn-sm btn-primary' onClick={()=>openInNewTab(order.receipt_url)}>Receipt</button></td>
                                <td><button className="btn btn-sm btn-primary" onClick={() => { handleShow(order.id) }}>More</button></td>
                            </tr>
                        })
                            : ''}
                    </tbody>
                </table>
            </div>
            {activeOrder.length ?
                <Modal show={show} onHide={handleClose} style={{ marginTop: '60px' }}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>{activeOrder.order_id}</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>{activeOrder[0].order_status.order_status}</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal> : ''}

        </Fragment>
    )
}