import { useState, useEffect } from 'react';
import CustomerContext from './CustomerContext';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function CustomerProvider(props) {
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({});
    const [jwt, setJwt] = useState([]);
    const [stripeSessionInfo, setStripeSessionInfo] = useState('')
    const [redirectTo, setRedirectTo] = useState('')

    const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
    // const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us63.gitpod.io/api/'

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
        let accessToken = loginResponse.data.accessToken
        let refreshToken = loginResponse.data.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        setJwt(loginResponse.data)
        let customerData = parseJWT(loginResponse.data.accessToken)
        // console.log(customerData)
        let customer = customerData.username
        setCustomer(customerData)
        localStorage.setItem('customer', customer)
        toast.success("Login Success")
        return true
    }


    const logout = async () => {
        // console.log(jwt.refreshToken)
        if (localStorage.getItem("accessToken")) {
            // if (jwt.accessToken) {
            let logoutResponse = await axios.post(BASE_API_URL + 'customers/logout',
                {
                    // refreshToken: jwt.refreshToken
                    refreshToken: localStorage.getItem('refreshToken')
                },
            )

            if (logoutResponse.data.message) {
                setCustomer({});
                //TODO clear jwt sessions
                localStorage.clear()
                setJwt([]);
                toast.success("Logged Out")
                navigate('/')
            }

            if (logoutResponse.data.error) {
                localStorage.clear()
                setCustomer({});
                setJwt([]);
                toast.error("There has been an error")
                navigate('/')
            }
        }
    }

    //TODO check refresh auth
    const refreshAuth= async () => {
        let accessToken = localStorage.getItem('accessToken')
        let refreshToken = localStorage.getItem('refreshToken')
        if (accessToken) {
            try {
                let response = await axios.post(BASE_API_URL + 'customers/refresh',
                    {
                        refreshToken: refreshToken
                    },
                    {
                        headers: {
                            authorization: `Bearer ${accessToken}`
                        }
                    })
                let newAccessToken = response.data 
                console.log('new token', newAccessToken)
                localStorage.setItem('accessToken', newAccessToken.accessToken)
                return true
            } catch(error){
                localStorage.clear()
                console.log(error)
                return false
            }   
        } else {
            localStorage.clear()
            return false
        }
    }

    useEffect(()=>{
        let refresh = async ()=>{
            let response =  await refreshAuth()
            console.log(response)
        }
        refresh()
    },[])

    // load warning on reload and browser tab close?
    // useEffect(() => {
    //     const handleTabClose = (event) => {
    //         event.preventDefault();
    //         console.log('before unload event triggered');

    //         return (event.returnValue = "Are you sure you want to exit?")
    //         // return(alert('you want to exit?'))
    //     }

    //     window.addEventListener('beforeunload', handleTabClose);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleTabClose)
    //     };
    // }, [])

    const addToCart = async (productVariantId, quantity) => {
        if (localStorage.getItem('accessToken')) {
            // if (jwt.accessToken) {
            try {
                await axios.post(BASE_API_URL + 'cart/' + productVariantId + '/add',
                    {
                        quantity: quantity
                    },
                    {
                        headers: {
                            // authorization: `Bearer ${jwt.accessToken}`,
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
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

    const updateCartItem = async (productVariantId, quantity) => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.post(BASE_API_URL + 'cart/' + productVariantId + '/update', {
                    quantity: quantity
                }, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                })
                return true;

            } catch (error) {
                console.log(error)
                return false
            }
        } else {
            return false
        }
    }

    const deleteCartItem = async (productVariantId) => {
        if (localStorage.getItem('accessToken')) {
            try {
                await axios.delete(BASE_API_URL + 'cart/' + productVariantId + '/delete', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        } else {
            return false
        }
    }

    const getCart = async () => {
        if (localStorage.getItem('accessToken')) {
            // if (jwt.accessToken) {
            try {
                let response = await axios.get(BASE_API_URL + 'cart/', {
                    headers: {
                        // authorization: `Bearer ${jwt.accessToken}`,
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                })
                let cartItems = response.data
                console.log(cartItems)
                return cartItems;
            } catch (error) {
                console.log(error)
                return false
            }
        } else {
            return false
        }
    }

    const getOrders = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                let response = await axios.get(BASE_API_URL + 'orders', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                let orders = response.data
                return orders
            } catch (error) {
                console.log(error)
                return false
            }
        } else {
            return false
        }
    }

    const getStripeSessionInfo = async () => {
        if (localStorage.getItem('accessToken')) {
            try {
                let response = await axios.get(BASE_API_URL + 'checkout', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                console.log('api checkout:', response.data)
                setStripeSessionInfo(response.data)
                navigate('/stripe')

            } catch (error) {
                console.log(error)
                return false
            }
        } else {
            return false
        }
    }

    const getStripe = () => {
        return stripeSessionInfo
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
            if (!redirectTo) {
                let response = await login(email, password)
                navigate('/')
                return response
            } else if (redirectTo) {
                navigate(redirectTo)
                setRedirectTo('')
                let response = await login(email, password)
                return response
            }

        },

        getSession: () => {
            let localStorageData = localStorage.getItem("accessToken")
            console.log("localstorage accesstoken: ", localStorageData)
        },

        logout: async () => {
            await logout()
        },

       

        addToCart: async (productVariantId, quantity) => {
            let response = await addToCart(productVariantId, quantity)
            return response;
        },

        updateCartItem: async (productVariantId, quantity) => {
            let response = await updateCartItem(productVariantId, quantity)
            return response;
        },

        deleteCartItem: async (productVariantId) => {
            let response = await deleteCartItem(productVariantId)
            return response;
        },

        getCart: async () => {
            let response = await getCart()
            return response;
        },

        checkout: async () => {
            let response = await getStripeSessionInfo()
            return response
        },

        getStripe: () => {
            let response = getStripe()
            return response
        },

        getOrders: async (customerId) => {
            let response = await getOrders(customerId)
            return response
        },

        updateRedirectTo: (lastVisited) => {
            setRedirectTo(lastVisited)
        },

        checkAuth: ()=>{
            let accessToken = localStorage.getItem('accessToken')
            if (accessToken){
                return true
            } else {
                return false
            }
        }
    }

    //use productProvider as a higher order component
    return <CustomerContext.Provider value={context}>
        {props.children}
    </CustomerContext.Provider>
}