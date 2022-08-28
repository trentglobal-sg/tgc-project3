import { Fragment, useState, useContext, useEffect } from 'react';
import ProductContext from '../ProductContext';
import homeWallpaper from '../images/home-wallpaper.jpeg'
import SearchResults from '../components/SearchResults';
import '../index.css'
import ReactToastify from '../components/ReactToastify';

export default function Home() {
    const context = useContext(ProductContext);
    const [searchProduct, setSearchProduct] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const updateSearchProduct = (value)=>{
        setSearchProduct(value)
    }

    const search = async ()=>{
        let searchParams = {}
        if (searchProduct) {
            let product = searchProduct
            searchParams = {...searchParams, product}
        }
        // console.log(searchParams)
        let results = await context.search(searchParams)
        console.log(results)

        setSearchResults(results)
    }

    const keyUpSearch = (e) =>{
        if(e.key === "Enter") {
            search();
        }
    }

    useEffect(()=>{
        search()

    },[])

    return (
        <Fragment>
            <ReactToastify />
            <div id='landing'>
                <img src={homeWallpaper} alt="wallpaper" style={{ height: "100%" }}></img>
            </div>
            <div id='search' className='container'>
                <h3 className='mt-3'>Search for products</h3>
                <input id='searchProduct' name='searchProduct' type="text" className='form-control mb-2' value={searchProduct} onChange={(e)=>{updateSearchProduct(e.target.value)}} onKeyUp={(e)=>{keyUpSearch(e)}}/>
                
                {searchResults ? <SearchResults products={searchResults}/> : ''}            
            </div>
            
        </Fragment>
    )
}