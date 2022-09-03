import { Fragment, useContext, useState, useEffect } from 'react';
import ProductContext from '../ProductContext';
import CustomerContext from '../CustomerContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
    // const [isLoaded, setIsLoaded] = useState(false)

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
        // setIsLoaded(true)
        console.log(productId)
        async function fetchVariantsData() {
            await getVariantsData(productId)
        }
        fetchVariantsData();
        // setIsLoaded(false)
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

    const increment = () => {
        if (selectedQuantity >= 1 && selectedQuantity < 10 && selectedQuantity < selectedProductVariantData.stock) {
            setSelectedQuantity(selectedQuantity + 1)
        }
    }

    const decrement = () => {
        if (selectedQuantity > 1 && selectedQuantity <= 10) {
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

                if (quantity < selected.stock) {

                    let response = await customerContext.addToCart(productVariantId, quantity)
                    console.log('add to cart response: ', response)
                    if (response) {
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
                <div style={{ minHeight: '100vh' }}>
                    <div className='buffer-top'></div>
                    <div className='container mt-4'>
                        <div className='row'>
                            <div className='col col-12 col-lg-8 mt-3'>
                                <div>
                                    <img src={product.product_image_url} className='product-image custom-shadow' alt="product_image"></img>
                                </div>
                            </div>
                            <div className='col col-12 col-lg-4 mt-3'>
                                <h2 className='my-bold'>{product.product}</h2>
                                <h4>{product.brand.brand}</h4>
                                <h4>$ {(product.cost / 100).toFixed(2)}</h4>
                                <hr></hr>

                                <h6 className='my-bold'>Colors</h6>
                                {!variants.length ? <Skeleton count={4} /> :
                                    <Fragment>
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
                                        <div>
                                            <p className='my-text-font'>{selectedVariantData.color_name}</p>
                                        </div>
                                    </Fragment>}
                                <h6 className='my-bold'>Sizes</h6>
                                {!activeProductVariants.length ? <Skeleton count={2} /> :
                                    <Fragment>
                                        {activeProductVariants.map(productVariant =>
                                            <Fragment key={productVariant.id}>
                                                {productVariant.stock == 0 ? <input type='radio' className='btn-check' value={productVariant.id} name='productVariant' id={productVariant.id} checked={selectedProductVariant === productVariant.id} onChange={(e) => { selectProductVariant(e.target.value) }} disabled /> :
                                                    <input type='radio' className='btn-check' value={productVariant.id} name='productVariant' id={productVariant.id} checked={selectedProductVariant === productVariant.id} onChange={(e) => { selectProductVariant(e.target.value) }} />}
                                                {selectedProductVariant === productVariant.id ?
                                                    <label className='btn btn-sm me-2 custom-selected' style={{ border: '1px solid black' }} for={productVariant.id}><span>{productVariant.size.size}</span></label>
                                                    : <label className='btn btn-sm me-2' style={{ border: '1px solid black' }} for={productVariant.id}>{productVariant.size.size}</label>
                                                }
                                            </Fragment>
                                        )}
                                    </Fragment>}

                                <div className='mt-3'>
                                    <h6 className='my-bold'>Quantity</h6>
                                    <div className='d-flex'>
                                        <div>
                                            <button className='btn btn-sm my-btn' onClick={decrement} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                                            </svg></button>
                                            <input type="number" style={{ width: '40px', textAlign:'center' }} className='form-input form-input-sm ms-2 me-2' value={selectedQuantity} onChange={(e) => { setSelectedQuantity(e.target.value) }} disabled />
                                            <button className='btn btn-sm my-btn' onClick={increment}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                            </svg></button>
                                        </div>
                                        <div>
                                            <button className='btn btn-sm my-btn ms-3' onClick={() => { addToCart() }} >Add to Cart</button>
                                        </div>
                                    </div>
                                    <div>
                                        {selectedProductVariantData.stock < 10 ? <span className='errorMessage'>{selectedProductVariantData.stock} pieces left</span> : ''}
                                    </div>
                                </div>

                                <div className='mt-3'>
                                    <p className='my-text-font'>{product.description}</p>
                                </div>
                                <div>
                                    <p className='mt-2 my-text-font'>{product.fit.fit} Fit</p>
                                    <p className='my-text-font'>Micron: {product.micron.micron} {product.micron.micron_description}</p>
                                    <p className='my-text-font'>Blend: {product.blend.blend}</p>
                                </div>
                            </div>
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