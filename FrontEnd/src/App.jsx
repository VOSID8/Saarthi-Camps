import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import MedForm from './pages/MedForm'
import RefugeeForm from './pages/RefugeeForm'
import Details from './pages/Details'
import Navbar from './components/Navbar'
import ManageDEO from './pages/ManageDEO'
import ForgotPassword from './pages/ForgotPwd'
import Data from './pages/Data'
import AuthContext from './components/AuthProvider2'
import React, { useContext, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManageDoctor from './pages/ManageDoctor'
import Consultancy from './pages/Consultancy'

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {!authCtx.isLoggedIn && <Route index path="/" element={<Login />} />}
          {!authCtx.isLoggedIn && (
            <Route index path="forgot-password" element={<ForgotPassword />} />
          )}
          {!authCtx.isLoggedIn && <Route index path="*" element={<Login />} />}
          {authCtx.isLoggedIn && (
            <Route path="/*" element={<AppWithSidebar />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function AppWithSidebar() {
  const authCtx = useContext(AuthContext)
  const [channel, setChannel] = useState('')

  const selectChannel = useCallback((newChannel) => {
    setChannel(newChannel)
  }, [])

  return (
    <div className="w-[100vw]">
      {/*  md:flex */}
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-refugee" element={<RefugeeForm />} />
        <Route path="/add-medicine" element={<MedForm />} />
        <Route path="/view-details" element={<Details />} />
        <Route path="/manage-deo" element={<ManageDEO />} />
        <Route path="/manage-doctor" element={<ManageDoctor />} />
        <Route path="/consult" element={<Consultancy />} />
        <Route path="/data" element={<Data />} />
        {/* <Route path='/vc-form' element={<ChannelForm selectChannel={selectChannel}/>} /> */}
        {/* <Route path='/call' element={<Call channel={channel}/>} /> */}
      </Routes>
    </div>
  )
}

export default App
