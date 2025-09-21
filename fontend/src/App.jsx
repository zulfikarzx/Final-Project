import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Products from './Components/Products/Products'
import AOS from 'aos'
import "aos/dist/aos.css"
import TopProducts from './Components/TopProducts/TopProducts'
import Banner from './Components/Banner/Banner'
import Subscribe from './Components/Subscribe/Subscribe'
import Testimonial from './Components/Testimonial/Testimonial'
import Footer from './Components/Footer/Footer'
import Popup from './Components/Popup/Popup'
import Login from './Components/Admin/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
// import { ToastContainer } from 'react-toastify'
import SignUp from './Components/Admin/SingUp'
import Dashbord from './Components/Admin/Dashbord'
import { ToastContainer } from 'react-toastify'
import { AdminRequire } from './Components/Admin/AdminRequire'
import Categories from './Components/Admin/Categories/Catagories'
import Loader from './Components/Common/Loader'
import Create from './Components/Admin/Categories/Create'
import Edit from './Components/Admin/Categories/Edit'
import Brands from './Components/Admin/Brands/Brands'
import {default as BrandCreate} from './Components/Admin/Brands/Create'
import {default as BrandEdit} from './Components/Admin/Brands/Edit'
import {default as Adminproducts} from './Components/Admin/Products/Products'
import {default as AdminProductCreate} from './Components/Admin/Products/Create'
import {default as AdminProductEdit} from './Components/Admin/Products/Edit'
import Shop from './Components/Shop/Shop'
import NavTop from './Components/TopProducts/NavTop'

import NavDis from './Components/TopProducts/NavDis'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Cartdisplay from './Components/Cart/Cartdisplay'
import Checkout from './Components/Checkout/Checkout'
import { AuthRequire } from './Components/Context/AuthRequire'
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation'
import {default as AdminOrders} from './Components/Orders/Orders'
import OdersDetails from './Components/Orders/OdersDetails'
import AboutUs from './Components/About/AboutUs.jsx'





function App() {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
  
    <Route path="/" element={<Navbar  handleOrderPopup={handleOrderPopup}/>}/>
    <Route path="/" element=  {<Hero  handleOrderPopup={handleOrderPopup}/>}/>
    <Route path="/" element={<Products/>}/>
    <Route path="/" element={<TopProducts handleOrderPopup={handleOrderPopup}/>}/>
    <Route path="/" element={ < Banner/>}/>
    <Route path="/" element={ <Subscribe/>}/>
    <Route path="/" element={ <Testimonial/>}/>
    <Route path="/" element={ <Footer/>}/>
    <Route path="/Loader" element={ <Loader/>}/>
    <Route path="/Shop" element={ <Shop/>}/>
    <Route path="/NavTop" element={ <NavTop/>}/>
    <Route path="/Discountproduct" element={ <NavDis/>}/>
    <Route path="/" element={ <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />}/>
    <Route path="/ProductDetail/:id" element={ <ProductDetail/>}/>
      <Route path="/Cart" element={ <Cartdisplay/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/AboutUs" element={<AboutUs/>}/>
 
    <Route path="/dashboard" element={
      <AdminRequire>
      <Dashbord/>
      </AdminRequire>
      
      }/>
      <Route path="/categories" element={
      <AdminRequire>
      <Categories/>
      </AdminRequire>
  }/>


  <Route path="/OrderConfirmation/:id" element={
      <AuthRequire>
     <OrderConfirmation/>
      </AuthRequire>
 }/>

  <Route path="/categories/create" element={
      <AdminRequire>
      <Create/>
      </AdminRequire>
  }/>

<Route path="/categories/edit/:id" element={
      <AdminRequire>
      <Edit/>
      </AdminRequire>
  }/>

<Route path="/brands" element={
      <AdminRequire>
      <Brands/>
      </AdminRequire>
  }/>

<Route path="/brands/create" element={
      <AdminRequire>
      <BrandCreate/>
      </AdminRequire>
  }/>

<Route path="/brands/edit/:id" element={
      <AdminRequire>
      <BrandEdit/>
      </AdminRequire>
  }/>
  <Route path="/products" element={
      <AdminRequire>
      <Adminproducts/>
      </AdminRequire>
  }/>
  <Route path="/products/create" element={
      <AdminRequire>
      <AdminProductCreate/>
      </AdminRequire>
  }/>

  <Route path="/products/edit/:id" element={
      <AdminRequire>
      <AdminProductEdit/>
      </AdminRequire>
  }/>

  <Route path="/checkout" element={
      <AuthRequire>
     <Checkout/>
      </AuthRequire>
 }/>

  <Route path="/Orders" element={
      <AdminRequire>
      <AdminOrders/>
      </AdminRequire>
  }/>
    
<Route path="/order/:id" element={
      <AdminRequire>
      <OdersDetails/>
      </AdminRequire>
  }/>

    </Routes>
  </BrowserRouter>
  <ToastContainer />
     
    </>
  )
}

export default App
