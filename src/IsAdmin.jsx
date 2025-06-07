import React,{useContext, useState} from 'react'
import { Outlet,Navigate } from 'react-router-dom';
import Loginpage from './Authpage/Loginpage';
import { useSelector } from 'react-redux';
const IsAdmin = ({children}) => {
 const {Admin}=useSelector(state=>state.User);
    return (
        Admin ? <Outlet /> : <Navigate to="/login" replace />
  )
}
export const IsLogin=({children})=>{
  const {name}=useSelector(state=>state.User);
  return(
 name ? <Outlet /> : <Navigate to="/login" replace /> )
}

export default IsAdmin