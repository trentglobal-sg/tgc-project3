import {Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';

export default function InnerwearMen() {

    const context = useContext(ProductContext)
    const products = context.getMensInnerwear()
    
    return (
        <Fragment>
            <div className='container'>
                <h1>Men's Innerwear</h1>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}