import { Fragment, useContext, useState } from 'react';
import CustomerContext from '../CustomerContext';
import "bootstrap/dist/css/bootstrap.min.css"
import '../index.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const context = useContext(CustomerContext)
    const navigate = useNavigate()

    const [registerData, setRegisterData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        contact_number: '',
    })

    const [formError, setformError] = useState({})

    const updateFormField = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const emailCheck = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        } else {
            return false
        }
    }

    const contactNumberCheck = (number) => {
        if (/[a-zA-Z]/.test(number)){
            return false
        } else {
            return true
        }
    }

    const checkErrors = () => {
        let errors = {}
        if (!registerData.username || registerData.username.length > 20) {
            errors = { ...errors, username: "Please enter a username of not more than 20 characters" }
        }

        if (!registerData.first_name || registerData.first_name.length > 20) {
            errors = { ...errors, first_name: "Please enter a first name of not more than 20 characters" }
        }

        if (!registerData.last_name || registerData.last_name.length > 20) {
            errors = { ...errors, last_name: "Please enter a last name of not more than 20 characters" }
        }

        let email = emailCheck(registerData.email)
        if (!email){
            errors = {...errors, email: "Please enter a valid email"}
        }

        let contact = contactNumberCheck(registerData.contact_number)
        if (!contact) {
            errors = {...errors, contact_number: "Please enter a valid contact number not more than 10 digits"}
        }

        if (!registerData.password || registerData.password.includes(' ') || registerData.password.length < 8){
            errors = {...errors, password: "Please enter a valid password of at least 8 characters"}
        }

        if (registerData.password && (registerData.password !== registerData.confirm_password)) {
            errors = {...errors, confirm_password: "Please ensure your passwords match"}
        }

        setformError(errors)

        if (Object.keys(errors).length === 0) {
            return true
        } else {
            return false
        }
    }

    const submitForm = async () => {
        let formCheck= checkErrors()
        console.log("formCheck => ", formCheck)
        if (formCheck){
            // send form
            let register = await context.register(registerData)
            console.log("register => ", register)
            if (register) {
                navigate('/')
            } else {
                let error = {email: "Email address already in use. Please enter another email address."}
                setformError(error)
            }
        } 
    }

    return (
        <Fragment>
            <div className='buffer-top'></div>
            <div className='container'>
                <h1>Register</h1>
                <label>Username</label>
                <input type='text' name='username' className='form-control' value={registerData.username} onChange={(e) => { updateFormField(e) }} />
                {formError.username ? <p className='errorMessage'>{formError.username}</p> : ''}
                <label>First Name</label>
                <input type='text' name='first_name' className='form-control' value={registerData.first_name} onChange={(e) => { updateFormField(e) }} />
                {formError.first_name ? <p className='errorMessage'>{formError.first_name}</p> : ''}
                <label>Last Name</label>
                <input type='text' name='last_name' className='form-control' value={registerData.last_name} onChange={(e) => { updateFormField(e) }} />
                {formError.last_name ? <p className='errorMessage'>{formError.last_name}</p> : ''}
                <label>Email</label>
                <input type='text' name='email' className='form-control' value={registerData.email} onChange={(e) => { updateFormField(e) }} />
                {formError.email ? <p className='errorMessage' >{formError.email}</p>: '' }
                <label>Contact Number</label>
                <input type='text' name='contact_number' className='form-control' value={registerData.contact_number} onChange={(e) => { updateFormField(e) }} />
                {formError.contact_number ? <p className='errorMessage' >{formError.contact_number}</p>: '' }
                <label>Password</label>
                <input type='password' name='password' className='form-control' value={registerData.password} onChange={(e) => { updateFormField(e) }} />
                {formError.password ? <p className='errorMessage' >{formError.password}</p>: '' }
                <label>Confirm Password</label>
                <input type='password' name='confirm_password' className='form-control' value={registerData.confirm_password} onChange={(e) => { updateFormField(e) }} />
                {formError.confirm_password ? <p className='errorMessage' >{formError.confirm_password}</p>: '' }
                <button className='btn btn-primary btn-submit mt-3' onClick={() => { submitForm() }} >Submit</button>
            </div>
        </Fragment>
    )
}