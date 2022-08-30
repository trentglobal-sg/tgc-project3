import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductProvider from "./ProductProvider"
import CustomerProvider from './CustomerProvider'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductsMen from "./pages/mens/ProductsMen"
import ShirtsMen from "./pages/mens/ShirtsMen"
import JacketsMen from "./pages/mens/JacketsMen"
import BottomsMen from "./pages/mens/BottomsMen"
import InnerwearMen from "./pages/mens/InnerwearMen"
import ProductsWomen from "./pages/womens/ProductsWomen"
import ShirtsWomen from "./pages/womens/ShirtsWomen"
import JacketsWomen from "./pages/womens/JacketsWomen"
import BottomsWomen from "./pages/womens/BottomsWomen"
import InnerwearWomen from "./pages/womens/InnerwearWomen"
import MerinoWool from "./pages/MerinoWool"
import NotFound from "./pages/NotFound"
import MyNavbar from "./components/MyNavbar"
import Product from "./pages/Product"
import ReactToastify from './components/ReactToastify'
import Stripe from './components/Stripe'
import Orders from './pages/Orders'
import OrderFail from './pages/OrderFail'
import Order from './components/Order'


function App() {
  return (
    <Fragment>
      
      {/* The Routes, Route and Link components only worked in <Router> */}
      <ProductProvider>
          <Router>
          <ReactToastify />
          <CustomerProvider>
            <MyNavbar />
            {/* The <Routes> contains the pages */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mens" element={<ProductsMen />} />
              <Route path="/mens/shirts" element={<ShirtsMen />} />
              <Route path="/mens/jackets" element={<JacketsMen />} />
              <Route path="/mens/bottoms" element={<BottomsMen />} />
              <Route path="/mens/innerwear" element={<InnerwearMen />} />
              <Route path="/womens" element={<ProductsWomen />} />
              <Route path="/womens/shirts" element={<ShirtsWomen />} />
              <Route path="/womens/jackets" element={<JacketsWomen />} />
              <Route path="/womens/bottoms" element={<BottomsWomen />} />
              <Route path="/womens/innerwear" element={<InnerwearWomen />} />
              <Route path="/about" element={<About />} />
              <Route path="/merino-wool" element={<MerinoWool />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/stripe" element={<Stripe />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<Order />} />
              <Route path="/order-fail" element={< OrderFail/>} />
            </Routes>
            </CustomerProvider>
          </Router>
      </ProductProvider>
    </Fragment >
  );
}

export default App;
