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
import ResetPassword from './pages/Auth/resetPassword'
import ProtectedRoute from './component/common/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import Loader from './component/common/loader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path='/' element={<UserLayout />}>
        
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='Otp/:email' element={<OtpVerification />} />
          <Route path='register' element={<Register />} />
          <Route path='resetpassword/:email/:otp' element={<ResetPassword />} />
<Route path="productlisting/:id?" element={<ProductListing />} />

          <Route path='detailpage/:id' element={<DetailPage />} />


            <Route path='sellproduct' element={
                        <ProtectedRoute requiredRole={["user"]}>

                <SellProduct />
              </ProtectedRoute>
              } />

            <Route path='profile/:id' element={
                       
                <Profile />

              } />
          

            <Route path='profile' element={
                        <ProtectedRoute requiredRole={["user"]}>  

                <Profile />
              </ProtectedRoute>
              } />
          </Route>
          



        <Route path='chats' element={
          <ProtectedRoute requiredRole={["user"]}>
          <Chats />
</ProtectedRoute>
          } />



<Route path='/loader' element={<Loader/>} >
</Route>
  
  

<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<ManageProducts />} />
  <Route path="categories" element={<Category />} />
  <Route path="users" element={<User />} />
</Route>
      </Routes>
    </>
  )
}

export default App
