import { Fragment, useContext } from 'react';
import ProductContext from "../../ProductContext"
import SearchResults from "../../components/SearchResults"


export default function JacketsMen() {

    const context = useContext(ProductContext)
    const products = context.getMensJackets()

    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h3 className='my-bold'>Men's Jackets</h3>
                    <SearchResults products={products} />
                </div>
            </div>
        </Fragment>
    )
}