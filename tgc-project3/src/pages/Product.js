import { Fragment, useContext } from 'react';
import ProductContext from '../ProductContext';
import { useParams } from 'react-router-dom';

export default function Product(props) {
    // eg:/products/:productId
    // useparams will return an object with all the parameters and their values just like req.params in express
    const { productId } = useParams();
    // const [product, setProduct] = useState([]);
    const context = useContext(ProductContext);
    const product = context.getProductById(parseInt(productId))

    return (
        <Fragment>
            <div className='container'>
                <h1>{product.product}</h1>
                <ul>
                    <li>Product ID: {product.id}</li>
                    <li>Cost: ${product.cost / 100}</li>
                </ul>
            </div>
        </Fragment>
    )
}