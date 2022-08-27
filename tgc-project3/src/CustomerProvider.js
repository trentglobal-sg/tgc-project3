import { useState, useEffect } from 'react';
import CustomerContext from './CustomerContext';
import axios from 'axios';
import { toast } from 'react-toastify'


export default function CustomerProvider(props) {
    const [customer, setCustomer] = useState({})
    const [jwt, setJwt] = useState([])

    // const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/api/customers/'
    const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us63.gitpod.io/api/customers/'

    const parseJWT = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const context = {
        register: async (data) => {
            let formData = {};
            let username = data.username;
            let first_name = data.first_name;
            let last_name = data.last_name;
            let email = data.email;
            let password = data.password;
            let contact_number = data.contact_number
            formData = { username, first_name, last_name, email, password, contact_number }
            // console.log(formData)
            let response = await axios.post(BASE_API_URL + 'register', formData)
            // let customer = response.data
            console.log(response.data)

            if (response.data.customer) {
                let loginResponse = await axios.post(BASE_API_URL + 'login', {
                    email: email,
                    password: password
                })
                console.log(loginResponse)

                setJwt(loginResponse.data)
                let customerData = parseJWT(loginResponse.data.accessToken)
                console.log(customerData)
                setCustomer(customerData)
                toast.success("Login Success")
                return true
            }

            if (response.data.customerExists) {
                return false
            }
        },

        login: async (email, password) => {
            let loginResponse = await axios.post(BASE_API_URL + 'login', {
                email: email,
                password: password
            })
            // console.log(loginResponse)
            if (loginResponse.data.error) {
                setCustomer({})
                toast.error("Account Not Found")
                return false
            }

            setJwt(loginResponse.data)
            let customerData = parseJWT(loginResponse.data.accessToken)
            console.log(customerData)
            setCustomer(customerData)
            toast.success("Login Success")
            return true
        },

        logout: async () => {
            // console.log(jwt.refreshToken)
            if (jwt.accessToken) {
                let logoutResponse = await axios.post(BASE_API_URL + 'logout',
                    {
                        refreshToken: jwt.refreshToken
                    },
                    {
                        headers: {
                            authorization: `Bearer ${jwt.accessToken}`
                        }
                    })

                if (logoutResponse.data.message) {
                    setCustomer({});
                    setJwt([]);
                    toast.success("Logged Out")
                }

                if (logoutResponse.data.error) {
                    setCustomer({});
                    setJwt([]);
                    toast.error("There has been an error")
                }
            }
        }
    }

    //use productProvider as a higher order component
    return <CustomerContext.Provider value={context}>
        {props.children}
    </CustomerContext.Provider>
}