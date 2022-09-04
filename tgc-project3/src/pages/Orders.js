import { Fragment, useState, useEffect, useContext } from 'react';
import CustomerContext from '../CustomerContext';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

export default function Orders() {
    const navigate = useNavigate()
    const customerContext = useContext(CustomerContext)
    const [orders, setOrders] = useState('')

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
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h1 className='my-bold'>My Orders</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th className='my-bold'>ID</th>
                                <th className='my-bold'>Status</th>
                                <th className='my-bold'>Order Date</th>
                                <th className='my-bold'>Amount</th>
                                <th className='my-bold'>Shipping Type</th>
                                <th className='my-bold'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders ? orders.map(order => {
                                return <tr>
                                    <td>{order.id}</td>
                                    <td>{order.order_status.order_status} {order.updated_date ? <td>({moment(order.updated_date).format('YYYY-MM-DD')})</td> : ''}</td>
                                    <td>{moment(order.order_date).format('YYYY-MM-DD')}</td>
                                    <td>$ {order.total_amount / 100}</td>
                                    <td>{order.shipping_type} <br></br> {order.shipping_address_line1} <br></br>{order.shipping_address_line2} <br></br>{order.shipping_postal_code} <br></br>{order.shipping_country}</td>
                                    <td><button className='btn btn-sm btn-primary' onClick={() => openInNewTab(order.receipt_url)}>Receipt</button></td>
                                </tr>
                            })
                                : <h5 className='my-bold'>No Orders Found</h5>}
                        </tbody>
                    </table>
                </div>
                {/* {activeOrder.length ? */}
                {/* <Modal show={show} onHide={handleClose} style={{ marginTop: '60px' }}> */}
                {/* <Modal.Header closeButton> */}
                {/* <Modal.Title>{activeOrder.order_id}</Modal.Title> */}
                {/* </Modal.Header> */}
                {/* <Modal.Body>{activeOrder[0].order_status.order_status}</Modal.Body> */}
                {/* <Modal.Footer> */}
                {/* <button variant="secondary" onClick={handleClose}> */}
                {/* Close */}
                {/* </button> */}
                {/* </Modal.Footer> */}
                {/* </Modal> : ''} */}
            </div>
        </Fragment>
    )
}