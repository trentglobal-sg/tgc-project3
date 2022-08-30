import {useState} from 'react'

export default function CartItem(props) {
    const [updateItem, setUpdateItem] = useState('')
    const [updateItemQuantity, setUpdateItemQuantity] = useState('')

    const updateQuantity = (e)=>{
        setUpdateItemQuantity(e.target.value)
    }

    const mountActive = (id, quantity) => {
        setUpdateItem(id)
        setUpdateItemQuantity(quantity)
    }

    return (
        <li className='list-group-item' >
            <div className='row'>
                <div className='col col-3'>
                    <img style={{ width: "100%" }} src={props.item.product_variant.variant.variant_thumbnail_url}></img>
                </div>
                <div className='col col-6'>
                    <h6 style={{ fontSize: "small", height: "fit-content" }}>{props.item.product_variant.variant.product.product}</h6>
                    <h6 style={{ fontSize: "small", height: "fit-content" }}>{props.item.product_variant.variant.color_name} | {props.item.product_variant.size.size}</h6>
                    <h6 style={{ fontSize: "small", height: "fit-content" }}>$ {props.item.product_variant.variant.product.cost / 100}</h6>
                    {/* <div style={{ display: 'flex' }}> */}
                        {updateItemQuantity ?
                            <div className='d-flex'>
                                <input type='number' style={{ width: '50px' }} className='form-control form-control-sm' value={updateItemQuantity} onChange={(e) => { updateQuantity(e) }} /> <button className='btn btn-sm btn-primary ms-2' >Update</button>
                            </div>
                            :
                            <input type='number' style={{ width: '50px' }} className='form-control form-control-sm' value={props.item.quantity} onChange={() => { mountActive(props.item.id, props.item.quantity) }} />
                        }
                    {/* </div> */}
                </div>
                <div className='col col-2'>
                    <button className='btn btn-sm btn-danger' >Delete</button>
                </div>
            </div>
        </li>
    )
}