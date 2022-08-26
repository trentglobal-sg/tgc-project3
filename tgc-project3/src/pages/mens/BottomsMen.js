import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext";
import SearchResults from "../../components/SearchResults"


export default function BottomsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensBottoms()
    
    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h3>Men's Bottoms</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}