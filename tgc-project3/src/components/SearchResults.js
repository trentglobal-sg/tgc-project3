import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import ProductContext from '../ProductContext'

export default function SearchResults(props) {
    return (
        <Fragment>
            {/* <ul> */}
            <div className='row'>
                {props.products.map(m => {
                    return (
                        // <li>
                        //     <Link to={'/product/' + m.id}>{m.product}</Link>
                        // </li>
                        <div className="card col-12 col-md-5 col-lg-4 mb-3" style={{ border: "none" }}>
                            <img src={m.product_image_url} alt="productPhoto"></img>
                            <div className="card-body">
                                <h5 className="card-title">{m.product}</h5>
                                <p className="card-text">{m.description}</p>
                            </div>
                            <div>
                                {/* <a href={`/product/` + m.id} className="btn btn-primary btn-sm">View</a> */}
                                <Button as={Link} to={`/product/${m.id}`} className='btn btn-sm btn-primary'>View</Button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* </ul> */}
        </Fragment>
    )
}