import { Fragment, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

    const submitForm = async () => {
        let email = loginData.email;
        let password = loginData.password
        let loginResponse = await context.login(email, password)
        console.log("login =>", loginResponse)

        // if (loginResponse){
        //     navigate('/')
        // } 
    }

    return (
        <Fragment>
            <div style={{ minHeight: ' 100vh' }}>
                <div className='buffer-top'></div>
                <div className='container' style={{maxWidth: '600px'}}>
                    <h1>Login</h1>
                    <label>Email </label>
                    <input type='text' name='email' className='form-control' value={loginData.email} onChange={(e) => { updateFormField(e) }} />
                    <label>Password</label>
                    <input type='password' name='password' className='form-control' value={loginData.password} onChange={(e) => { updateFormField(e) }} />
                    <button className='btn my-btn btn-submit mt-3' onClick={() => submitForm()} >Submit</button>
                    <div className='mt-3'>
                        <p>No account? <Link to='/register'>Register Here</Link> </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}