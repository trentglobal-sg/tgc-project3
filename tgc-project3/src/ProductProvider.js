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

        getWomensProducts: ()=>{
            const womensProducts = []
            products.allProducts.map(product=>{
                if (product.gender_id == 3){
                    return womensProducts.push(product)
                }
            })
            return womensProducts
        }
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