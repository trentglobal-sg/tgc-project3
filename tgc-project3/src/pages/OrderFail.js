import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function OrderFail() {
    let navigate = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        },3000)
    },[])

    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container'>
                    <h3>We're sorry, checkout failed...</h3>
                </div>
            </div>
        </Fragment>
    )
}