import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';

export default function InnerwearWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensInnerwear()
    
    return (
        <Fragment>
            <div className='container'>
                <h3>Women's Innerwear</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}