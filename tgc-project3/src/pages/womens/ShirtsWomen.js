import { Fragment, useContext } from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from '../../components/SearchResults';


export default function ShirtsWomen() {

    const context = useContext(ProductContext)
    const products = context.getWomensShirts()

    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h3 className='my-bold'>Women's Shirts</h3>
                    <SearchResults products={products} />
                </div>
            </div>
        </Fragment>
    )
}