import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import api from "../shared/api";
import { setUser } from "../shared/UserDataSlice";
const Loginpage = () => {
  const navigate = useNavigate();
 const [form,setForm]=useState({
    email:'',
    password:''
 })
    const handleEdit=(e)=>{setForm({...form,[e.target.name]:e.target.value})}
const dispatch=useDispatch();
  const login = async function () {
    if(!form.email || !form.password){
        alert('fill all the details');
        return;
    }
    const response = await api.post('/api/auth/login', form);  
  if(response.status===200){
      const data=await response.data
      await dispatch(setUser({name:data.Name,email:data.Emailid,Admin:data.Admin}));
      console.log(data)
      navigate('/');
    }else{
      alert('Invalid Credentials');
    }
    setForm({email:'',password:''})
  
  }

  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center relative bottom-10">
<form className="w-1/2 h-1/2 lg:w-1/3  flex flex-col items-center justify-center bg-white p-8 shadow-lg relative overflow-hidden" onSubmit={(e)=>{e.preventDefault();login()}}>
      <div className="absolute w-72 h-72 bg-indigo-300  rounded-3xl transform rotate-45 -left-44 bottom-8 z-0 shadow-md"></div>

      <p className="text-3xl text-gray-800 font-bold mb-4 z-10">Login</p>

      <div className="w-full relative flex items-center justify-center mb-4 z-10">
        <svg className="absolute left-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
          <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleEdit}
          value={form.email}
          className="w-full h-8 bg-transparent  border-b-2 placeholder-black border-gray-300 pl-8 py-1 text-sm focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div className="w-full relative flex items-center justify-center mb-4 z-10">
        <svg className="absolute left-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
        </svg>
        <input
          type="password"
          value={form.password}
          placeholder="Password"
          name="password"
          onChange={handleEdit}
          className="w-full h-8 bg-transparent placeholder-black border-b-2 border-gray-300 pl-8 py-1 text-sm focus:outline-none focus:border-purple-400"
        />
      </div>

      <input type="submit"  className="w-full bg-indigo-600  text-white py-2 text-sm font-medium hover:bg-purple-500 cursor-pointer z-10 mb-2"/>
<div className='flex gap-2'>
        <p className="text-1xl text-indigo-800 z-10">Don't have an account ?</p>
        <Link to={'/signup'} className="text-1xl text-indigo-800 z-10">Sign up</Link>
</div>
    </form>

    </div>
    </>
  );

}
export default Loginpage;