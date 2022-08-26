import { Fragment, useContext, useState, useEffect } from 'react';
import ProductContext from '../ProductContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product(props) {
    const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/api/products/'
    // eg:/products/:productId
    // useparams will return an object with all the parameters and their values just like req.params in express
    const { productId } = useParams();
    const [variants, setVariants] = useState([]);
    const [activeProductVariants, setActiveProductVariants] = useState([])
    const context = useContext(ProductContext);
    const product = context.getProductById(parseInt(productId))

    const getVariantsData = async (productId) => {
        let variantsResponse = await axios.get(BASE_API_URL + productId)
        let variants = variantsResponse.data
        return variants
    }

    const getProductVariantData = async (productId, variantId)=>{
        let activeProductVariantResponse = await axios.get(BASE_API_URL + productId + '/' + variantId)
        let activeProductVariant = activeProductVariantResponse.data
        return activeProductVariant
    }

    useEffect(()=>{
        console.log(productId)
        async function fetchVariantsData(){
            const variantData = await getVariantsData(productId)
            setVariants(variantData)
        }
        fetchVariantsData();

        async function fetchActiveProductVariantData(){
            const firstProductVariants = await getProductVariantData(productId, 1)
            setActiveProductVariants(firstProductVariants)
        }
        fetchActiveProductVariantData()
    },[])


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