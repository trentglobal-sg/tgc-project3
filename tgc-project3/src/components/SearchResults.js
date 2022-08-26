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
                        <div key={m.id} className="card col-12 col-md-6 col-lg-4 mb-3 p-4" style={{ border: "none" }}>
                            <img src={m.product_image_url} alt="productPhoto"></img>
                            <div className="card-body row">
                                <div className='col-10'>
                                    <h5 className="card-title">{m.product}</h5>
                                    <h6 className="card-text">$ {(m.cost / 100).toFixed(2)}</h6>
                                </div>
                                <div className='col-2'>
                                    <Button as={Link} to={`/product/${m.id}`} className='btn btn-sm btn-primary'>View</Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}