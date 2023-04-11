import React from "react";

import { Routes, Route, Navigate } from 'react-router-dom'

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import ResetPassword from "../pages/User/ResetPassword";
import VerifyEmail from "../pages/User/VerifyEmail";
import ForgotPassword from "../pages/User/ForgotPassword";



const AppRoutes = () => {
  return (
    <Routes>
        <Route exact path="/user/login" element={<Login/>} />
        <Route exact path="/user/register" element={<Register/>}/>
        <Route exact path="/user/verifyEmail" element={<VerifyEmail/>}/>
        <Route exact path="/user/forgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/user/resetPassword" element={<ResetPassword/>}/>
        <Route path="*" element={<Navigate to="/user/login" replace/>}/>
    </Routes>
  )
}

export default AppRoutes
