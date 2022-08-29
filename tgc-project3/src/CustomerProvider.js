import { useState, useEffect } from 'react';
import CustomerContext from './CustomerContext';
import axios from 'axios';
import { toast } from 'react-toastify'

export default function CustomerProvider(props) {
    const [customer, setCustomer] = useState({});
    const [jwt, setJwt] = useState([]);

    // const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/api/'
    const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us63.gitpod.io/api/'

    const parseJWT = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const login = async (email, password) => {
        let loginResponse = await axios.post(BASE_API_URL + 'customers/login', {
            email: email,
            password: password
        })
        // console.log(loginResponse)
        if (loginResponse.data.error) {
            setCustomer({})
            toast.error("Account Not Found")
            return false
        }

        //TODO jwt session?
        sessionStorage.setItem('accessToken', loginResponse.data.accessToken)
        sessionStorage.setItem('refreshToken', loginResponse.data.refreshToken)

        setJwt(loginResponse.data)
        let customerData = parseJWT(loginResponse.data.accessToken)
        console.log(customerData)
        setCustomer(customerData)
        toast.success("Login Success")
        return true
    }

    const logout = async () => {
        // console.log(jwt.refreshToken)
        if (jwt.accessToken) {
            let logoutResponse = await axios.post(BASE_API_URL + 'customers/logout',
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
                //TODO clear jwt sessions
                sessionStorage.clear()
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

    useEffect(() => {
        const handleTabClose = (event) => {
            event.preventDefault();
            console.log('before unload event triggered');

            return (event.returnValue = "Are you sure you want to exit?")
            // return(alert('you want to exit?'))
        }

        window.addEventListener('beforeunload', handleTabClose);

        return () => {
            window.removeEventListener('beforeunload', handleTabClose)
        };
    }, [])

    const addToCart = async (productVariantId, quantity) => {
        if (jwt.accessToken) {
            try {
                await axios.post(BASE_API_URL + 'cart/' + productVariantId + '/add',
                    {
                        quantity: quantity
                    },
                    {
                        headers: {
                            authorization: `Bearer ${jwt.accessToken}`,
                        },
                    })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        } else {
            return false;
        }
    }

    const getCart = async (customerId) => {
        if (jwt.accessToken) {
            try{
                let response = await axios.get(BASE_API_URL + 'cart/', {
                    headers: {
                        authorization: `Bearer ${jwt.accessToken}`,
                    },
                })
                let cartItems = response.data
                console.log(cartItems)
                return cartItems;
            } catch (error){
                console.log(error)
                return false
            }
        }
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
            let response = await axios.post(BASE_API_URL + 'customers/register', formData)
            // let customer = response.data
            console.log(response.data)

            if (response.data.customer) {
                return await login(email, password)
            }

            if (response.data.customerExists) {
                return false
            }
        },

        login: async (email, password) => {
            let response = await login(email, password)
            return response
        },

        getSession: () => {
            let sessionData = sessionStorage.getItem("accessToken")
            console.log("sessions accesstoken: ", sessionData)
        },

        logout: async () => {
            await logout()
        },

        checkAuth: () => {
            if (jwt.accessToken) {
                return true
            } else {
                return false
            }
        },

        addToCart: async (productVariantId, quantity) => {
            let response = await addToCart(productVariantId, quantity)
            return response;
        },

        getCart: async () => {
            let response = await getCart()
            return response;
        }
    }

    //use productProvider as a higher order component
    return <CustomerContext.Provider value={context}>
        {props.children}
    </CustomerContext.Provider>
}