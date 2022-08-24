import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../../ProductContext"


export default function ShirtsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensShirts()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Shirts</h1>
                <ul>
                    {products.map(m => {
                        return <li>{m.product}</li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}