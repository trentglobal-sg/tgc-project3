import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';

export default function InnerwearMen() {

    const context = useContext(ProductContext)
    const products = context.getMensInnerwear()
    
    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h3>Men's Innerwear</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}