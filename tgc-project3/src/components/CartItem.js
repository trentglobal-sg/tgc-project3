import { useContext, useEffect, useState } from 'react'
// import CustomerContext from '../CustomerContext';

export default function CartItem(props) {
    // const context = useContext(CustomerContext);
    const [updateItem, setUpdateItem] = useState('')
    const [updateItemQuantity, setUpdateItemQuantity] = useState('')

    const mountActive = (quantity) => {
        setUpdateItemQuantity(quantity)
    }

    const setLoading = (id) => {
        setUpdateItem(id)
    }

    useEffect(()=>{
        mountActive(props.item.quantity)
    },[])

    const confirmUpdateItem = async (id, quantity) => {
        let response = await props.confirmUpdateItem(id, quantity)
        setUpdateItem('')
        setUpdateItemQuantity(response);
        return response;
    }

    const increment = () => {
        setLoading(props.item.product_variant.id)
        if (updateItemQuantity >= 1 && updateItemQuantity < 10 && updateItemQuantity < (props.item.product_variant.stock-1)) {
            setUpdateItemQuantity(updateItemQuantity + 1)
        }
    }

    const decrement = () => {
        setLoading(props.item.product_variant.id)
        if (updateItemQuantity > 1 && updateItemQuantity <= 10 ) {
            setUpdateItemQuantity(updateItemQuantity - 1)
        }
    }

    const confirmDeleteItem = async (id) => {
        let response = props.confirmDeleteItem(id)
        return response
    }

    return (
        <li className='list-group-item' >
            <div className='row'>
                <div className='col col-3'>
                    <img style={{ width: "100%" }} src={props.item.product_variant.variant.variant_thumbnail_url}></img>
                </div>
                <div className='col col-6'>
                    <h6 className='my-bold' style={{ fontSize: "small", height: "fit-content" }}>{props.item.product_variant.variant.product.product}</h6>
                    <h6 style={{ fontSize: "small", height: "fit-content" }}>{props.item.product_variant.variant.color_name} | {props.item.product_variant.size.size}</h6>
                    <h6 style={{ fontSize: "small", height: "fit-content" }}>$ {props.item.product_variant.variant.product.cost / 100}</h6>
                    {updateItem ?
                        <div className='d-flex'>
                            <button className='btn btn-sm my-btn' onClick={decrement} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                            </svg></button>
                            <input type="number" style={{ width: '40px', textAlign: 'center' }} className='form-input form-input-sm ms-2 me-2' value={updateItemQuantity} disabled />
                            <button className='btn btn-sm my-btn' onClick={increment}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg></button>
                            <button className='btn btn-sm btn-primary ms-2' onClick={async () => { await confirmUpdateItem(updateItem, updateItemQuantity) }} >Update</button>
                        </div>
                        :
                        <div className='d-flex'>
                            <button className='btn btn-sm my-btn' onClick={decrement} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                            </svg></button>
                            <input type="number" style={{ width: '40px', textAlign: 'center' }} className='form-input form-input-sm ms-2 me-2' value={props.item.quantity} disabled />
                            <button className='btn btn-sm my-btn' onClick={increment}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg></button>
                        </div>
                    }
                </div>
                <div className='col col-2'>
                    <button className='btn btn-sm' onClick={() => { confirmDeleteItem(props.item.product_variant.id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg></button>
                </div>
            </div>
        </li>
    )
}