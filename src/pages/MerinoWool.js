import { Fragment } from 'react';
import { Container } from 'react-bootstrap'


export default function MerinoWool() {
    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h1 className='my-bold'>Why Merino Wool</h1>
                    <Container>
                        <div className='ratio ratio-16x9'>
                            <iframe src="https://www.youtube.com/embed/ZoUs7ar3LD0" title='Why Merino Youtube' allowFullScreen></iframe>
                        </div>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}