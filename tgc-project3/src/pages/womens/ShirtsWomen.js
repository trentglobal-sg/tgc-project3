import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';


export default function ShirtsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensShirts()
    
    return (
        <Fragment>
            <div className='container'>
                <h3>Women's Shirts</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}