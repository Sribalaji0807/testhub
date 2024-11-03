import React from 'react'
import { useEffect } from 'react'
import { useState,useContext } from 'react'
import { Link,useLocation } from 'react-router-dom'
import AuthUser from '../shared/Authuser'
export const Navbar = () => {
    const {userData,clearUserData}=useContext(AuthUser)
    
    const location = useLocation();
 //   const user1=useContext(AuthUser)
    const [menuOpen, setMenuOpen] = useState(false);
   
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const closeMenu = async() => {
      const response=await fetch('http://localhost:3000/logout',{
method:'POST',
        credentials:'include'})
     if(response.ok){ 
     clearUserData();
    //  setUser(null);
      setMenuOpen(false);}
    };
  return (
    <>
    <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Ecommerce</span>
      </a>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 hover:text-gray-900"><Link to="/">Home</Link></a>
        <a class="mr-5 hover:text-gray-900">All products</a>
        <a class="mr-5 hover:text-gray-900">Categories</a>
        <a class="mr-5 hover:text-gray-900"><Link to='/myorders'>My Orders</Link></a>
    <a class="mr-5 hover:text-gray-900"> <Link to='Cart'>Cart</Link>
    </a>
        
        {userData == null ? (
    <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      <Link to="/login">Login</Link>
    </button>
  ) : (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <a
          href="#"
          onClick={toggleMenu}
          className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          {userData}
        </a>
      
      </div>
      {menuOpen && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
              onClick={closeMenu}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  
    )}
      </nav>
     
     </div>
  </header> </> )
}
