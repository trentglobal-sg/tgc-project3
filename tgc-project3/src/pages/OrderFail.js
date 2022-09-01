import { Fragment } from 'react';
export default function OrderFail() {
    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h1>Oops your order has failed</h1>
                </div>
            </div>
        </Fragment>
    )
}