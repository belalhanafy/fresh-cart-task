import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import WishList from './Components/WishList/WishList'
import AllOrders from './Components/AllOrders/AllOrders'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Notfound from './Components/Notfound/Notfound'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Products from './Components/Products/Products'
import CheckOut from './Components/CheckOut/CheckOut'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import CartContextProvider from './Context/CartContext'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-sine",
      offset: 100,
    });
    AOS.refresh();
  }, []);
  let routers = createBrowserRouter([
    {path:'', element:<Layout/> ,children:[
      {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute> },
      {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'Categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'wishList', element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'checkOut', element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'productDetails/:productId/:catId', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'forgetPassword', element:<ForgetPassword/>},
      {path:'verifyresetcode/:email', element:<VerifyResetCode/>},
      {path:'resetpassword/:email', element:<ResetPassword/>},
      {path:'login', element:<Login/>},
      {index:true , element:<Register/>},
      {path:"*", element:<Notfound/>},
    ]}
  ])
  return (
    <>
    <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ToastContainer />
        </CartContextProvider>
    </UserContextProvider>
    </>
  )
}

export default App
