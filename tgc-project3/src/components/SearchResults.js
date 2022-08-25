import { Link } from 'react-router-dom'
import { Fragment } from 'react'
// import ProductContext from '../ProductContext'

export default function SearchResults(props) {
    return (
        <Fragment>
            <ul>
                {props.products.map(m => {
                    return <li>
                        <Link to={'/product/' + m.id}>{m.product}</Link>
                    </li>
                })}
            </ul>
        </Fragment>
    )
}