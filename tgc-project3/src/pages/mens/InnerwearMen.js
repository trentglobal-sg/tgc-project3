import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../../ProductContext"


export default function InnerwearMen() {

    const context = useContext(ProductContext)
    const products = context.getMensInnerwear()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Innerwear</h1>
                <ul>
                    {products.map(m => {
                        return <li>{m.product}</li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}