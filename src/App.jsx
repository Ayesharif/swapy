import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserLayout from './user/userLayout'
import { Route, Routes } from 'react-router-dom'
import Home from './user/Home'
import Login from './Auth/login'
import Register from './Auth/register'
import Chats from './user/chats'
import ProductListing from './user/ProductListing'
import Profile from './user/Profile'
import DetailPage from './user/detailPage'
import ForgotPassword from './Auth/forgotPassword'
import OtpVerification from './Auth/OtpVerification'

import SellProduct from './user/AddProduct'
import AdminLayout from './admin/adminLayout'
import Dashboard from './admin/dashboard'
import ManageProducts from './admin/product'
import AddProduct from './admin/addProduct'
import Category from './admin/category'

import User from './admin/user'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
  <Route path='/' element={<UserLayout/>}>
<Route index element={<Home/>} />
<Route path='login' element={<Login/>} />
<Route path='forgotpassword' element={<ForgotPassword/>} />
<Route path='Otp' element={<OtpVerification/>} />
<Route path='register' element={<Register/>} />
<Route path='productlisting' element={<ProductListing/>} />
<Route path='sellproduct' element={<SellProduct/>} />
<Route path='profile' element={<Profile/>} />
<Route path='detailpage/:id' element={<DetailPage/>} />

  </Route>
<Route path='chats' element={<Chats/>} />




<Route path='/admin' element={<AdminLayout/>} >
<Route index element={<Dashboard/>} />
<Route path='products' element={<ManageProducts/>} />
<Route path='categories' element={<Category/>} />
<Route path='users' element={<User/>} />

</Route>
</Routes>
    </>
  )
}

export default App
