import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/HurmeGeometric/HurmeGeometricSans3-Light.ttf';
import './fonts/HurmeGeometric/HurmeGeometricSans3-SemiBoldObl.ttf';
import './fonts/HurmeGeometric/HurmeGeometricSans3-Regular.ttf';
import './fonts/HurmeGeometric/HurmeGeometricSans3-SemiBold.ttf';
import './fonts/Vanillate/Vanillate.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
