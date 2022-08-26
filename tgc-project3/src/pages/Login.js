import {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductContext from "../ProductContext"


export default function Login() {

    const context = useContext(ProductContext)
    
    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h1>Login</h1>
                <ul>
                    {/* {context.allProducts.map( p => {
                        return <li>{p.product}</li>
                    })} */}
                </ul>
            </div>
        </Fragment>
    )
}