import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import ProductContext from '../ProductContext'

export default function SearchResults(props) {
    return (
        <Fragment>
            <div className='row justify-content-left'>
                {props.products.map(m => {
                    return (
                        <div className="card col-12 col-md-6 col-lg-4 mb-3 p-4" style={{ border: "none" }}>
                            <img src={m.product_image_url} alt="productPhoto"></img>
                            <div className="card-body">
                                <h5 className="card-title">{m.product}</h5>
                                <p className="card-text">{m.description}</p>
                                <p>{m.fit.fit}</p>
                            </div>
                            <div>
                                <Button as={Link} to={`/product/${m.id}`} className='btn btn-sm btn-primary'>View</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}