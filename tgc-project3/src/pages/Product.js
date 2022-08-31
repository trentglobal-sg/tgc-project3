import { Fragment, useContext, useState, useEffect } from 'react';
import ProductContext from '../ProductContext';
import CustomerContext from '../CustomerContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"
import { toast } from 'react-toastify'

export default function Product(props) {
    const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/api/products/'
    // const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us63.gitpod.io/api/products/'
    // eg:/products/:productId
    // useparams will return an object with all the parameters and their values just like req.params in express
    const { productId } = useParams();
    const [variants, setVariants] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedVariantData, setSelectedVariantData] = useState({})
    const [activeProductVariants, setActiveProductVariants] = useState([]);
    const [selectedProductVariant, setSelectedProductVariant] = useState('');
    const [selectedProductVariantData, setSelectedProductVariantData] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    const context = useContext(ProductContext);
    const product = context.getProductById(parseInt(productId));
    const customerContext = useContext(CustomerContext)

    const getVariantsData = async (productId) => {
        let variantsResponse = await axios.get(BASE_API_URL + productId)
        let variants = variantsResponse.data
        setVariants(variants)

        let firstVariant = variants[0].id
        setSelectedVariant(firstVariant)

        variants.map(variant => {
            if (variant.id === firstVariant) {
                setSelectedVariantData(variant)
            }
        })


        let firstProductVariantsResponse = await axios.get(BASE_API_URL + productId + '/' + firstVariant)
        let firstProductVariants = firstProductVariantsResponse.data
        setActiveProductVariants(firstProductVariants)
    }

    const getProductVariantData = async (productId, variantId) => {
        let activeProductVariantResponse = await axios.get(BASE_API_URL + productId + '/' + variantId)
        let activeProductVariant = activeProductVariantResponse.data
        setActiveProductVariants(activeProductVariant)
    }

    useEffect(() => {
        console.log(productId)
        async function fetchVariantsData() {
            await getVariantsData(productId)
        }
        fetchVariantsData();
    }, [])

    const selectVariant = (variantId) => {
        setSelectedProductVariant('')
        setSelectedProductVariantData({})
        setSelectedVariant(parseInt(variantId))

        variants.map(variant => {
            if (variant.id === parseInt(variantId)) {
                setSelectedVariantData(variant)
            }
        })

        getProductVariantData(productId, variantId)
        return true;
    }

    const selectProductVariant = (productVariantId) => {
        setSelectedQuantity(1)
        setSelectedProductVariant(parseInt(productVariantId))

        activeProductVariants.map(productVariant => {
            if (productVariant.id === parseInt(productVariantId)) {
                setSelectedProductVariantData(productVariant)
            }
        })
    }

    const increment = ()=>{
        if(selectedQuantity >= 1 && selectedQuantity < 10 && selectedQuantity < selectedProductVariantData.stock){
            setSelectedQuantity(selectedQuantity + 1)
        }
    }

    const decrement = ()=>{
        if (selectedQuantity > 1 && selectedQuantity <= 10){
            setSelectedQuantity(selectedQuantity - 1)
        }
    }

    const loginErrorToast = () => {
        let address = `/product/${productId}`
        return <div>
            Please <Link to='/login' onClick={customerContext.updateRedirectTo(address)}>Login First</Link> to add to cart
        </div>

    };

    const addToCart = async () => {
        if (selectedProductVariantData) {
            let checkAuth = customerContext.checkAuth();
            if (checkAuth) {
                let selected = selectedProductVariantData;
                let quantity = selectedQuantity;
                let product = selectedVariantData;
                let productVariantId = selectedProductVariant

                if(quantity < selected.stock){
                    
                    let response = await customerContext.addToCart(productVariantId, quantity)
                    console.log('add to cart response: ', response)
                    if (response){
                        toast.success("Item added to cart")

                        //reset the counter
                        setSelectedQuantity(1)
                        setSelectedProductVariant('')
                        setSelectedProductVariantData('')
                    } else {
                        toast.error("Something went wrong")
                    }
                    
                } else {
                    toast.error('Sorry, item is out of stock')
                }

            } else {
                toast.info(loginErrorToast())
            }
        } else {
            toast.error('Please add something to cart')
        }
    }

    if (product) {
        return (
            <Fragment>
                <div className='buffer-top'></div>
                <div className='container row'>
                    <div className='col col-12 col-lg-8'>
                        <h1>{product.product}</h1>
                        <div>
                            <img src={product.product_image_url} style={{ width: "30%" }} alt="product_image"></img>
                        </div>
                        <p>{product.description}</p>

                    </div>
                    <div className='col col-12 col-lg-4'>
                        <h4>$ {(product.cost / 100).toFixed(2)}</h4>
                        <h4>Fit: {product.fit.fit}</h4>
                        <h4>Micron: {product.micron.micron}: {product.micron.micron_description}</h4>
                        <h4>Blend: {product.blend.blend}: {product.blend.blend_description}</h4>
                        <h4>Colors</h4>
                        {variants.map(variant =>
                            <Fragment key={variant.id}>
                                <input type="radio" className='btn-check' value={variant.id} name="variants" id={variant.color_name} checked={selectedVariant === variant.id} onChange={(e) => { selectVariant(e.target.value) }} />
                                {selectedVariant === variant.id ?
                                    <label className='btn variant-circle me-2 custom-selected' style={{ backgroundColor: variant.color_code }} for={variant.color_name}></label> :
                                    <label className='btn variant-circle me-2' style={{ backgroundColor: variant.color_code }} for={variant.color_name}></label>}
                            </Fragment>
                        )}
                        <div>
                            <img className='mt-3' src={selectedVariantData.variant_thumbnail_url} alt="variant thumbnail"></img>
                        </div>
                        <h4>Sizes</h4>
                        {activeProductVariants.map(productVariant =>
                            <Fragment key={productVariant.id}>
                                <div>
                                    <input type='radio' value={productVariant.id} name="productVariant" id={productVariant.id} checked={selectedProductVariant === productVariant.id} onChange={(e) => { selectProductVariant(e.target.value) }} />
                                    <label for={productVariant.id}>{productVariant.size.size}</label>
                                    {productVariant.stock < 10 ? <p className='errorMessage ms-3' style={{display: "inline"}}>Only {productVariant.stock} pieces left</p> : ''}
                                    {/* <p>Stock : {productVariant.stock}</p> */}
                                </div>
                            </Fragment>
                        )}
                        <div>
                            <h6>Quantity</h6>
                            <button className='btn btn-sm btn-primary' onClick={increment}><h3>+</h3></button>
                            <input type="number" className='form-input form-input-sm ms-2 me-2' value={selectedQuantity} onChange={(e) => { setSelectedQuantity(e.target.value) }} disabled/>
                            <button className='btn btn-sm btn-primary' onClick={decrement} ><h3>-</h3></button>
                        </div>
                        <div>
                            <button className='btn btn-sm btn-primary mt-3' onClick={() => { addToCart() }} >Add to Cart</button>
                        </div>
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