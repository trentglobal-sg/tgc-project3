import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductProvider from "./ProductProvider"
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from "./pages/Products"




function App() {
  return (
    <Fragment>
      {/* The Routes, Route and Link components only worked in <Router> */}
      <ProductProvider>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Merinology</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/products">Products</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* The <Routes> contains the pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </ProductProvider>
    </Fragment >
  );
}

export default App;
