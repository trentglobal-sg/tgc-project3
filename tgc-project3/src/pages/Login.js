import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../CustomerContext';


export default function Login() {
    const context = useContext(CustomerContext)
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const updateFormField = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const submitForm = async ()=>{
        let email = loginData.email;
        let password = loginData.password
        let loginResponse = await context.login(email, password)
        console.log ("login =>", loginResponse)

        if (loginResponse){
            navigate('/')
        } 
    }

    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h1>Login</h1>
                <label>Email </label>
                <input type='text' name='email' className='form-control' value={loginData.email} onChange={(e)=>{updateFormField(e)}}/>
                <label>Password</label>
                <input type='password' name='password' className='form-control' value={loginData.password} onChange={(e)=>{updateFormField(e)}}/>
                <button className='btn btn-primary btn-submit mt-3' onClick={()=>submitForm()} >Submit</button>
                <div className='mt-3'>
                    <p>No account? <a href='/register'>Register Here</a> </p>
                </div>
            </div>
        </Fragment>
    )
}