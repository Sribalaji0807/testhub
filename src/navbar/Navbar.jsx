import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react'
import coin from '../assets/coins-solid.svg'
import add from '../assets/add.png'
import { Link,useLocation } from 'react-router-dom'
import { useStateContext } from '../Context/index1'
import { useSelector } from 'react-redux';
import api from '../shared/api';
import { useDispatch } from 'react-redux';
import { resetUserData } from '../shared/UserDataSlice';
export const Navbar = () => {
 
  const navigate=useNavigate();
   const {name} =useSelector((state)=>state.User)
   useEffect(() => {
     console.log(name);
   },[name])
   const [user, setUser] = useState(null);

    const {walletAddress,connectWallet,sendTransaction,balance}=useStateContext();
  const dispatch=useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
   
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const closeMenu = async() => {
      console.log("started");
      const response=await api.get('/api/auth/logout',{
        withCredentials:true})
     if(response.status===200){
      
     //clearUserData();
      dispatch(resetUserData());
      setUser(null);
      setMenuOpen(false);
    navigate('/')
    }
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
      <nav class="md:ml-auto flex flex-wrap items-center text-base gap-2 justify-center md:mr-auto lg:mr-0 ">
        <a class="mr-5 hover:text-gray-900"><Link to="/">Home</Link></a>
        <a class="mr-5 hover:text-gray-900">All products</a>
        <a class="mr-5 hover:text-gray-900">Categories</a>
        <a class="mr-5 hover:text-gray-900"><Link to='/myorders'>My Orders</Link></a>
    <a class="mr-5 hover:text-gray-900"> <Link to='Cart'  >Cart</Link>
    </a>
        
        {name == null ? (
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
          {name}
        </a>
      
      </div>
      {menuOpen && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <Link to={'/Dashboard?tab=profile'} onClick={toggleMenu} className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'>
            Profile
            </Link>
            <button
              href="#"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
              onClick={()=>{closeMenu()}}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  
    )}
    {walletAddress ==null ?(
    <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg "
    onClick={connectWallet}
    >
      connect
    </button>

    ):(
      <div className=' flex flex-row justify-center gap-2'>
        <p className='w-[40px] text-xl overflow-hidden'>{walletAddress}...</p>
        <div className='flex items-center gap-2'>
          <button onClick={sendTransaction}>

        <img className='w-[20px] h-[20px]' src={add} alt="" />

          </button>
          <p>{balance}</p>
          <img className='w-[20px] h-[20px]' src={coin} alt="" />
        </div>
      </div>
    ) }
      </nav>
     
     </div>
  </header> </> )
}
