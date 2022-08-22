import { useState, useEffect } from 'react';
import ProductContext from './ProductContext';
import axios from 'axios';

export default function ProductProvider(props) {
    const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us62.gitpod.io/'

    const [products, setProducts] = useState([
    ])
  
    const context = {
        getProducts: async () => {
            let response = await axios.get(BASE_API_URL + 'api/products')
            console.log(response.data)
            return response.data  
        },
    }

    //use productProvider as a higher order component
    return <ProductContext.Provider value={context}>
        {props.children}
    </ProductContext.Provider>
}