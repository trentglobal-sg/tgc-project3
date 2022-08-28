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
                    
                        <div key={m.id} className="card col-12 col-md-6 col-lg-3 mb-3 p-4" style={{ border: "none" }}>
                            <Link to={`/product/${m.id}`}>
                            <img src={m.product_image_url} alt="productPhoto" style={{width: "100%"}}></img></Link>
                            <div className="card-body row justify-content-left">
                                <div className='col-8'>
                                    <h6 className="card-title">{m.product}</h6>
                                    <h7 className="card-text">$ {(m.cost / 100).toFixed(2)}</h7>
                                </div>
                                <div className='col-3'>
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