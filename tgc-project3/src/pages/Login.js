import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ProductContext from "../ProductContext"

export default function Login() {
    const context = useContext(ProductContext)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const updateFormField = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const submitForm = ()=>{
        alert('form submitted')
    }

    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h1>Login</h1>
                <label>Email </label>
                <input type='text' name='username' className='form-control' value={loginData.email} onChange={(e)=>{updateFormField(e)}}/>
                <label>Password</label>
                <input type='text' name='password' className='form-control' value={loginData.password} onChange={(e)=>{updateFormField(e)}}/>
                <button className='btn btn-primary btn-submit mt-3' onClick={() => { submitForm() }} >Submit</button>
                <div className='mt-3'>
                    <p>No account? <a href='/register'>Register Here</a> </p>
                </div>
            </div>
        </Fragment>
    )
}