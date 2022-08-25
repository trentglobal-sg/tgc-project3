import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from "../../components/SearchResults"


export default function ShirtsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensShirts()
    
    return (
        <Fragment>
            <div className='container'>
                <h3>Men's Shirts</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}