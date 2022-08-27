import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
 export default function ReactToastify(){
    return (
      <div>
        <ToastContainer 
        hideProgressBar={true}
        />
      </div>
    );
  }