import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import '../index.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SearchResults(props) {
    return (
        <Fragment>
            <div className='row justify-content-left'>
                {props.products.map(m => {
                    return (
                        <div key={m.id} className="card col-12 col-md-6 col-lg-4 mb-3 p-4" style={{ border: "none" }}>
                            {!props.products.length ? <Skeleton /> :
                            <Link to={`/product/${m.id}`}>
                            <img id='product-image' className="custom-shadow" src={m.product_image_url} alt="productPhoto" style={{width: "100%"}}></img></Link>}
                            <div className="card-body row justify-content-left">
                                <div className='col-12'>
                                    <h6 className="card-title my-bold">{m.product}</h6>
                                    <h6 className="card-text">$ {(m.cost / 100).toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}