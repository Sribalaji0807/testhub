import React,{useContext, useState} from 'react'
import { Outlet } from 'react-router-dom';
import Loginpage from './Loginpage/Loginpage';
import { useSelector } from 'react-redux';
const IsAdmin = ({children}) => {
 const {Admin}=useSelector(state=>state.User);
    return (
        Admin ? <Outlet /> : <Loginpage />
  )
}

export default IsAdmin