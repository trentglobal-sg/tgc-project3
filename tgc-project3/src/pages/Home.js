import { Fragment, useState, useContext, useEffect } from 'react';
import ProductContext from '../ProductContext';
import SearchResults from '../components/SearchResults';
import "bootstrap/dist/css/bootstrap.min.css"
import '../index.css'
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
    const navigate = useNavigate()
    const context = useContext(ProductContext);
    const [searchProduct, setSearchProduct] = useState('')
    const [searchBrands, setSearchBrands] = useState('')
    const [searchCategories, setSearchCategories] = useState('')
    const [searchActivities, setSearchActivities] = useState('')
    const [searchBlends, setSearchBlends] = useState('')
    const [searchResults, setSearchResults] = useState([])
    //search fields
    const [brands, setBrands] = useState([])
    const [blends, setBlends] = useState([])
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])

    const updateSearchProduct = (value) => {
        setSearchProduct(value)
    }

    const updateSearchBrands = (value) => {
        setSearchBrands(value)
    }

    const updateSearchCategories = (value) => {
        setSearchCategories(value)
    }

    const updateSearchActivities = (value) => {
        setSearchActivities(value)
    }

    const updateSearchBlends = (value) => {
        setSearchBlends(value)
    }

    const search = async () => {
        let searchParams = {}
        if (searchProduct) {
            let product = searchProduct
            searchParams = { ...searchParams, product }
        }

        if (searchBrands) {
            let brand_id = searchBrands;
            searchParams = { ...searchParams, brand_id }
        }

        if (searchCategories) {
            let category_id = searchCategories;
            searchParams = { ...searchParams, category_id }
        }

        if (searchActivities) {
            let activity_id = searchActivities;
            searchParams = { ...searchParams, activity_id }
        }

        if (searchBlends) {
            let blend_id = searchBlends;
            searchParams = { ...searchParams, blend_id }
        }
        // console.log(searchParams)
        let results = await context.search(searchParams)
        console.log(results)

        setSearchResults(results)
    }

    const resetSearch = async () => {
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

    // const updateBrands = (e)=>{
    //     let value = parseInt(e.target.value)
    //     let currentValues = searchBrands;
    //     let modifiedValues;
    //     if(!currentValues.includes(value)){
    //         modifiedValues = [...currentValues, value]
    //     } else {
    //         modifiedValues = currentValues.filter((element)=>{
    //             return element !== value
    //         })
    //     }
    //     setSearchBrands(modifiedValues)
    // }

    return (
        <Fragment>
            <div id='landing' className='d-flex align-items-center justify-center'>
                {/* <img src={homeWallpaper} alt="wallpaper" style={{ height: "100%" }}></img> */}
                <div className='container align-items-center justify-center d-flex flex-column'>
                    <div className='btn' onClick={() => { navigate('/merino-wool') }} style={{ border: 'none' }}><h1 className='my-bold'>Experience the magic of Merino Wool</h1></div>
                    <div className='d-flex align-items-center justify-center'>
                        <Button as={Link} to='/mens' className='landing-links me-2'>Shop Mens</Button>
                        <Button as={Link} to='/womens' className='landing-links ms-2'>Shop Womens</Button>
                    </div>
                    <Button className='landing-links mt-4' href="#searchPage" >Search for Products</Button>
                </div>
            </div>
            <div id='searchPage' className='container'>
                <div className='buffer-top' id='buffer'></div>
                <h3 className='my-bold'>Search for products</h3>
                <div id='search-container' className="row">
                    <div id="search-fields" className="col col-12 col-lg-3">
                        <input id='searchProduct' placeholder='Search by product name...' name='searchProduct' type="text" className='form-control' value={searchProduct} onChange={(e) => { updateSearchProduct(e.target.value) }} onKeyUp={(e) => { keyUpSearch(e) }} />
                        <h5 className='mt-2'>Brands</h5>
                        <select className='form-select' name="searchBrands" onChange={(e) => { updateSearchBrands(e.target.value) }} >
                            <option selected value="">Select Brand</option>
                            {brands.map(brand => {
                                return <option value={brand[0]}>{brand[1]}</option>
                            }
                            )}
                        </select>
                        <h5 className='mt-2'>Categories</h5>
                        <select className='form-select' name='searchCategories' onChange={(e) => { updateSearchCategories(e.target.value) }} >
                            <option selected value="">Select Category</option>
                            {categories.map(category => {
                                return <option value={category[0]}>{category[1]}</option>
                            })}
                        </select>
                        <h5 className='mt-2'>Activities</h5>
                        <select className='form-select' name='searchActivities' onChange={(e) => { updateSearchActivities(e.target.value) }}>
                            <option selected value="">Select Activity</option>
                            {activities.map(activity => {
                                return <option value={activity[0]}>{activity[1]}</option>
                            })}
                        </select>
                        <h5 className='mt-2'>Blends</h5>
                        <select className='form-select' name='searchBlends' onChange={(e => { updateSearchBlends(e.target.value) })}>
                            <option selected value=''>Select Blends</option>
                            {blends.map(blend => {
                                return <option value={blend[0]}>{blend[1]}</option>
                            })}
                        </select>
                        <div className='mt-3'>
                            <button className='btn btn-sm btn-primary me-2' onClick={search}>Search</button>
                            <button className='btn btn-sm btn-primary me-2' onClick={resetSearch}>Reset</button>
                        </div>
                    </div>
                    <div id="search" className="col col-12 col-lg-9">
                        {searchResults.length ? <SearchResults products={searchResults} /> : <h4>No Search Results</h4>}
                    </div>
                </div>
            </div>
            {/* <div>
                <Footer />
            </div> */}

        </Fragment>
    )
}