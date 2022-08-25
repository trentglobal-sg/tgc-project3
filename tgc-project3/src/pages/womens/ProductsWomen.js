import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../../ProductContext"


export default function ProductsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensProducts()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Women's Products</h1>
                <ul>
                    {products.map(m => {
                        return <li>
                        <Link to={'/product/' + m.id}>{m.product}</Link>
                        </li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}