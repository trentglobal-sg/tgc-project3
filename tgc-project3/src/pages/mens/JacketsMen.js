import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from "../../components/SearchResults"


export default function JacketsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensJackets()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Jackets</h1>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}