import { Link } from 'react-router-dom'
import { Fragment } from 'react'
// import ProductContext from '../ProductContext'

export default function SearchResults(props) {
    return (
        <Fragment>
            {/* <ul> */}
            <div className='row justify-content-around'>
                {props.products.map(m => {
                    return (
                        // <li>
                        //     <Link to={'/product/' + m.id}>{m.product}</Link>
                        // </li>
                        <div className="card col-12 col-md-5 col-lg-4" style={{border:"none"}}>
                            <img src={m.product_image_url} alt="productPhoto"></img>
                            <div className="card-body">
                                <h5 className="card-title">{m.product}</h5>
                                <p className="card-text">{m.description}</p>
                                <a href={`/product/` + m.id} className="btn btn-primary btm-sm">View</a>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* </ul> */}
        </Fragment>
    )
}