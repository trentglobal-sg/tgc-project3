import { useState, useEffect } from 'react';
import ProductContext from './ProductContext';
import axios from 'axios';

export default function ProductProvider(props) {
    const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/'

    const [products, setProducts] = useState([
    ])

    const context = {
        getProductsFromApi: async () => {
            let response = await axios.get(BASE_API_URL + 'api/products')
            // console.log(response.data)
            return response.data  
        },

        getMensProducts: ()=>{
            const mensProducts = []
            products.allProducts.map(product=>{
                if (product.gender_id == 2){
                    return mensProducts.push(product)
                }
            })
            return mensProducts
        },

        getMensShirts: ()=>{
            const mensShirts = []
            products.allProducts.map(product=>{
                if (product.gender_id == 2 && product.category_id == 2){
                    return mensShirts.push(product)
                }
            })
            return mensShirts
        },

        getMensJackets: ()=>{
            const mensJackets = []
            products.allProducts.map(product=>{
                if (product.gender_id == 2 && product.category_id == 3){
                    return mensJackets.push(product)
                }
            })
            return mensJackets
        },

        getMensBottoms: ()=>{
            const mensBottoms = []
            products.allProducts.map(product=>{
                if (product.gender_id == 2 && product.category_id == 4){
                    return mensBottoms.push(product)
                }
            })
            return mensBottoms
        },

        getMensInnerwear: ()=>{
            const mensInnerwear = []
            products.allProducts.map(product=>{
                if (product.gender_id == 2 && product.category_id == 5){
                    return mensInnerwear.push(product)
                }
            })
            return mensInnerwear
        },

        getWomensProducts: ()=>{
            const womensProducts = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3){
                    return womensProducts.push(product)
                }
            })
            return womensProducts
        },

        getWomensShirts: ()=>{
            const womensShirts = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3 && product.category_id == 2){
                    return womensShirts.push(product)
                }
            })
            return womensShirts
        },

        getWomensJackets: ()=>{
            const womensJackets = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3 && product.category_id == 3){
                    return womensJackets.push(product)
                }
            })
            return womensJackets
        },

        getWomensBottoms: ()=>{
            const womensBottoms = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3 && product.category_id == 4){
                    return womensBottoms.push(product)
                }
            })
            return womensBottoms
        },

        getWomensInnerwear: ()=>{
            const womensInnerwear = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3 && product.category_id == 5){
                    return womensInnerwear.push(product)
                }
            })
            return womensInnerwear
        },
    }

    useEffect(()=>{
        async function fetchData() {
            // You can await here
            const products = await context.getProductsFromApi()
            setProducts(products)
          }
          fetchData();
          console.log(products)
    },[])

    //use productProvider as a higher order component
    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}