import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';


export default function JacketsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensJackets()
    
    return (
        <Fragment>
            <div className='container'>
                <h3>Women's Jackets</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}