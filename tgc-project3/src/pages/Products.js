import {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../ProductContext"


export default function Products() {

    const context = useContext(ProductContext)
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Products</h1>
                <ul>
                    {context.getProducts().map( p => {
                        return <li>p.product</li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}