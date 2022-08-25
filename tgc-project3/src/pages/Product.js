import { Fragment, useState, useEffect, useContext } from 'react';
import ProductContext from '../ProductContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product(props){
    // eg:/products/:productId
    // useparams will return an object with all the parameters and their values just like req.params in express
    const {productId} = useParams();
    const [product, setProduct] = useState([]);
    const context = useContext(ProductContext);

    useEffect(()=>{
        // console.log(productId)
        const product = context.getProductById(parseInt(productId));
        console.log(product)
        setProduct(product)
    },[productId]);


    return(
        <Fragment>
            <h1>{product.product}</h1>
        <ul>
            <li>Product ID: {product.id}</li>
            <li>Cost: ${product.cost/100}</li>
        </ul>
        </Fragment>
    )
}