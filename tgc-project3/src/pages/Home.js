import { Fragment, useState, useContext, useEffect } from 'react';
import ProductContext from '../ProductContext';
import homeWallpaper from '../images/home-wallpaper.jpeg'
import SearchResults from '../components/SearchResults';
import '../index.css'
import ReactToastify from '../components/ReactToastify';
import Accordian from 'react-bootstrap/Accordion'

export default function Home() {
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

    const updateSearchBrands = (value) =>{
        setSearchBrands(value)
    }

    const updateSearchCategories = (value) => {
        setSearchCategories(value)
    }

    const updateSearchActivities = (value)=>{
        setSearchActivities(value)
    }

    const updateSearchBlends = (value)=>{
        setSearchBlends(value)
    }

    const search = async () => {
        let searchParams = {}
        if (searchProduct) {
            let product = searchProduct
            searchParams = { ...searchParams, product }
        }

        if (searchBrands){
            let brand_id = searchBrands;
            searchParams = {...searchParams, brand_id}
        }

        if (searchCategories){
            let category_id = searchCategories;
            searchParams = {...searchParams, category_id}
        }

        if (searchActivities){
            let activity_id = searchActivities;
            searchParams = {...searchParams, activity_id}
        }

        if (searchBlends){
            let blend_id = searchBlends;
            searchParams = {...searchParams, blend_id}
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
            {/* <ReactToastify /> */}
            <div id='landing'>
                <img src={homeWallpaper} alt="wallpaper" style={{ height: "100%" }}></img>
            </div>
            <div id='search' className='container'>
                <h3 className='mt-3'>Search for products</h3>
                <div>
                    <input id='searchProduct' name='searchProduct' type="text" className='form-control mb-2' value={searchProduct} onChange={(e) => { updateSearchProduct(e.target.value) }} onKeyUp={(e) => { keyUpSearch(e) }} />
                    {/* <Accordian>
                        <Accordian.Item eventKey='0'>
                            <Accordian.Header>Brands</Accordian.Header>
                            <Accordian.Body>
                                {brands.map(brand => {
                                    return <div>
                                        <input className='form-check-input' type='checkbox' name='searchBrands' value={brand[0]} id={brand[1]} checked={searchBrands.includes(brand[0])} onChange={(e)=>{updateBrands(e)}}/>
                                        <label className='form-check-label ms-2' for={brand[1]}>{brand[1]}</label>
                                        </div>
                                })}
                            </Accordian.Body>
                        </Accordian.Item>
                    </Accordian> */}
                    <h4>Brands</h4>
                    <select className='form-select' name="searchBrands" onChange={(e)=>{updateSearchBrands(e.target.value)}} >
                        <option selected value="">Select Brand</option>
                        {brands.map(brand => {
                            return <option value={brand[0]}>{brand[1]}</option>
                        }
                        )}
                    </select>
                    <h4>Categories</h4>
                    <select className='form-select' name='searchCategories' onChange={(e)=>{updateSearchCategories(e.target.value)}} >
                        <option selected value="">Select Category</option>
                        {categories.map(category => {
                            return <option value={category[0]}>{category[1]}</option>
                        })}
                    </select>
                    <h4>Activities</h4>
                    <select className='form-select' name='searchActivities' onChange={(e)=>{updateSearchActivities(e.target.value)}}>
                        <option selected value="">Select Activity</option>
                        {activities.map(activity => {
                            return <option value={activity[0]}>{activity[1]}</option>
                        })}
                    </select>
                    <h4>Blends</h4>
                    <select className='form-select' name='searchBlends' onChange={(e=>{updateSearchBlends(e.target.value)})}>
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
                <div className='mt-2'>
                    {searchResults.length ? <SearchResults products={searchResults} /> : <h4>No Search Results</h4>}
                </div>

            </div>

        </Fragment>
    )
}