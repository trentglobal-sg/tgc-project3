import { Fragment, useContext} from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';


export default function ProductsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensProducts()

    return (
        <Fragment>
            <div className='container'>
                <h3>Women's Products</h3>
                <SearchResults products={products} />
            </div>
        </Fragment>
    )
}