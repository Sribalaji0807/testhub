import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
    const user=localStorage.getItem('user')
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
        <a class="mr-5 hover:text-gray-900"><Link to={{pathname: `/Cart`, state: {user1: user}}}>Cart</Link></a>
        {user == null ? (
    <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      <Link to="/login">Login</Link>
    </button>
  ) : (
    <a class="mr-5 hover:text-gray-900">{user}
  </a>
  
    )}
      </nav>
     
     </div>
  </header> </> )
}
