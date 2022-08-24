import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../../ProductContext"


export default function BottomsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensBottoms()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Bottoms</h1>
                <ul>
                    {products.map(m => {
                        return <li>{m.product}</li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}