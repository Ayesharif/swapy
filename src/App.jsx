import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './Layouts/userLayout'
import Home from './pages/user/Home'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Chats from './pages/user/chats'
import ProductListing from './pages/user/ProductListing'
import Profile from './pages/user/Profile'
import DetailPage from './pages/user/detailPage'
import ForgotPassword from './pages/Auth/forgotPassword'
import OtpVerification from './pages/Auth/OtpVerification'

import SellProduct from './pages/user/AddProduct'
import AdminLayout from './Layouts/adminLayout'
import Dashboard from './pages/admin/dashboard'
import ManageProducts from './pages/admin/product'

import Category from './pages/admin/category'

import User from './pages/admin/user'
import Adminayout from './Layouts/adminLayout'
import Practice from './pages/user/practice'

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
<Route path='practice' element={<Practice/>} />

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
