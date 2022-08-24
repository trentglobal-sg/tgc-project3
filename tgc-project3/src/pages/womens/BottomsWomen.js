import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../../ProductContext"


export default function BottomsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensBottoms()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Women's Products</h1>
                <ul>
                    {products.map(m => {
                        return <li>{m.product}</li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}