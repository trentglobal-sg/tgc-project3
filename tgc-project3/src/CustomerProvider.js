import { useState, useEffect } from 'react';
import CustomerContext from './CustomerContext';
import axios from 'axios';


export default function CustomerProvider(props) {
    // const BASE_API_URL = 'https://tgc-ec-merinology.herokuapp.com/api/customers/'
    const BASE_API_URL = 'https://8000-koihcire-tgcproject3api-jo56h3kktpv.ws-us63.gitpod.io/api/customers/'
    
   const context = {
        register: async (data)=>{
            let formData = {};
            let username = data.username;
            let first_name = data.first_name;
            let last_name = data.last_name;
            let email = data.email;
            let password = data.password;
            let contact_number = data.contact_number
            formData = {username, first_name, last_name, email, password, contact_number}
            // console.log(formData)
            let response = await axios.post(BASE_API_URL + 'register' , formData)
            // let customer = response.data
            console.log(response.data)

            

            if (response.data.customer) {
                let loginResponse = await axios.post(BASE_API_URL + 'login' ,{
                    email: email,
                    password: password
                })
                console.log(loginResponse)
                return true
            }

            if (response.data.customerExists){
                return false
            }
        }
   }

    //use productProvider as a higher order component
    return <CustomerContext.Provider value={context}>
        {props.children}
    </CustomerContext.Provider>
}