import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';


export default function BottomsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensBottoms()
    
    return (
        <Fragment>
            <div className='container'>
                <h3>Women's Bottoms</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}