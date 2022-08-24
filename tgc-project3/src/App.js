import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductProvider from "./ProductProvider"
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
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

//reactboostrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//logos and images
import merinologyLogo from './images/merinology.png'


function App() {
  return (
    <Fragment>
      {/* The Routes, Route and Link components only worked in <Router> */}
      <ProductProvider>
        <Router>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/"><img style={{ height: '40px' }} src={merinologyLogo}></img></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Men's" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/mens" >All Men's Products</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <h6 className='ms-3'>Categories</h6>
                    <NavDropdown.Item as={Link} to="/mens/shirts">Shirts</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mens/jackets">Jackets</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mens/bottoms">Bottoms</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mens/innerwear">Innerwear</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Women's" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/womens">All Women's Products</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <h6 className='ms-3'>Categories</h6>
                    <NavDropdown.Item as={Link} to="/womens/shirts">Shirts</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/womens/jackets">Jackets</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/womens/bottoms">Bottoms</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/womens/innerwear">Innerwear</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="About" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/merino-wool">Merino Wool</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/about">Who Are We</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

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
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ProductProvider>
    </Fragment >
  );
}

export default App;
