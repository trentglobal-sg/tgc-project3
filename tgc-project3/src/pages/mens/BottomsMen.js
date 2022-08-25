import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext";
import SearchResults from "../../components/SearchResults"


export default function BottomsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensBottoms()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Bottoms</h1>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}