import { Fragment } from 'react';
export default function NotFound() {
    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <p>Page not found...</p>
                </div>
            </div>
        </Fragment>
    )
}