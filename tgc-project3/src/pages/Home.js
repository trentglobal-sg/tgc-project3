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
    //search fields
    const [brands, setBrands] = useState([])
    const [blends, setBlends] = useState([])
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])

    const updateSearchProduct = (value) => {
        setSearchProduct(value)
    }

    const search = async () => {
        let searchParams = {}
        if (searchProduct) {
            let product = searchProduct
            searchParams = { ...searchParams, product }
        }
        // console.log(searchParams)
        let results = await context.search(searchParams)
        console.log(results)

        setSearchResults(results)
    }

    const resetSearch = async() => {
        //reset all params
        setSearchProduct('')

        //do an empty search
        let searchParams = {}
        let results = await context.search(searchParams)
        setSearchResults(results)
    }

    const keyUpSearch = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }

    const getSearchFields = async () => {
        let response = await context.getSearchFields();

        let brands = response.brandsData
        setBrands(brands)

        let blends = response.blendsData
        setBlends(blends)

        let activities = response.activitiesData
        setActivities(activities)

        let categories = response.categoriesData
        setCategories(categories)
    }

    useEffect(() => {
        getSearchFields()
        search()
    }, [])

    return (
        <Fragment>
            {/* <ReactToastify /> */}
            <div id='landing'>
                <img src={homeWallpaper} alt="wallpaper" style={{ height: "100%" }}></img>
            </div>
            <div id='search' className='container'>
                <h3 className='mt-3'>Search for products</h3>
                <div>
                    <input id='searchProduct' name='searchProduct' type="text" className='form-control mb-2' value={searchProduct} onChange={(e) => { updateSearchProduct(e.target.value) }} onKeyUp={(e) => { keyUpSearch(e) }} />
                    <h4>Brands</h4>
                    <select className='form-select' name="brand">
                        <option selected>Select Brand</option>
                        {brands.map(brand => {
                            return <option value={brand[0]}>{brand[1]}</option>
                        }
                        )}
                    </select>
                    <h4>Categories</h4>
                    <select className='form-select' name='category' >
                        <option selected>Select Category</option>
                        {categories.map(category => {
                            return <option value={category[0]}>{category[1]}</option>
                        })}
                    </select>
                    <h4>Activities</h4>
                    <select className='form-select' name='activity'>
                        <option selected>Select Activity</option>
                        {activities.map(activity => {
                            return <option value={activity[0]}>{activity[1]}</option>
                        })}
                    </select>
                    <h4>Blends</h4>
                    <select className='form-select' name='blends'>
                        <option selected>Select Blends</option>
                        {blends.map(blend => {
                            return <option value={blend[0]}>{blend[1]}</option>
                        })}
                    </select>
                    <div className='mt-3'>
                        <button className='btn btn-sm btn-primary me-2' onClick={search}>Search</button>
                        <button className='btn btn-sm btn-primary me-2' onClick={resetSearch}>Reset</button>
                    </div>
                </div>
                <div className='mt-2'>
                    {searchResults ? <SearchResults products={searchResults} /> : ''}
                </div>

            </div>

        </Fragment>
    )
}