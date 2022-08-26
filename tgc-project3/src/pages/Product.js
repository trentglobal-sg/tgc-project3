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

    const getProductVariantData = async (productId, variantId) => {
        let activeProductVariantResponse = await axios.get(BASE_API_URL + productId + '/' + variantId)
        let activeProductVariant = activeProductVariantResponse.data
        return activeProductVariant
    }

    useEffect(() => {
        console.log(productId)
        async function fetchVariantsData() {
            const variantData = await getVariantsData(productId)
            setVariants(variantData)
        }
        fetchVariantsData();

        async function fetchActiveProductVariantData() {
            const firstProductVariants = await getProductVariantData(productId, 1)
            setActiveProductVariants(firstProductVariants)
        }
        fetchActiveProductVariantData()
    }, [])


    if (product) {
        return (
            <Fragment>
                <div className='container row'>
                    <div className='col col-12 col-lg-8'>
                        <h1>{product.product}</h1>
                        <div>
                            <img src={product.product_image_url} alt="product_image"></img>
                        </div>
                        <p>{product.description}</p>

                    </div>
                    <div className='col col-12 col-lg-4'>
                        <h4>$ {(product.cost / 100).toFixed(2)}</h4>
                        <h4>Fit: {product.fit.fit}</h4>
                        <h4>Micron: {product.micron.micron}: {product.micron.micron_description}</h4>
                        <h4>Blend: {product.blend.blend}: {product.blend.blend_description}</h4>
                        <h4>Colors</h4>
                        {variants.map(variant => {
                            // <input type="radio" value={variant.id} name="variant">{variant.color_name}</input>
                            <p>{variant.color_name}</p>
                        })}
                    </div>
                </div>
            </Fragment>
        )
    } else {
        return (
            <h1>page loading</h1>
        )
    }

}