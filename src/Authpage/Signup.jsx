import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../shared/UserDataSlice"
import api from "../shared/api"
const Signup = () => {
    const [form,setForm]=useState({})
    const handleEdit=(e)=>{setForm({...form,[e.target.id]:e.target.value})}
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            if(!form.name || !form.email || !form.password){
                alert('fill all the details');
                return;
            }
            const response = await api.post('/api/auth/signup', form);  
            if(response.status===200){
                console.log("response",response);
                const data=await response.data
                console.log("data",data);
                dispatch(setUser({name:data.Name,email:data.Emailid,Admin:data.Admin}));
                alert('Signup successfully');
              //  navigate('/');
            }
            else{
                alert('Invalid Credentials');
            }
        } catch (error) {
            console.log(error.message);
            alert("Due to some error auth failed");
        }



    }

    return (
    <div className='w-screen h-screen flex justify-center items-center relative bottom-10'>
        <form onSubmit={handleSubmit} className='w-1/2  lg:w-1/3  flex flex-col items-center gap-3 justify-center rounded-2xl bg-white p-8 shadow-2xl relative overflow-hidden'>
                  <div className="absolute w-72 h-72 bg-purple-300 rounded-3xl transform rotate-45 -left-44 bottom-8 z-0 shadow-md"></div>
      <p className="text-2xl text-gray-800 font-bold mb-4 z-10">SignUp</p>

<div className="block relative  w-64  "> 
    <label htmlFor="name" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
    <input type="text" onChange={handleEdit} id="name" className="w-full h-8 bg-transparent  border-b-2 border-gray-300 pl-8 py-1 text-sm focus:outline-none focus:border-purple-400"
 />    
    </div>
<div className="block relative w-64 "> 
    <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
    <input type="text" onChange={handleEdit} id="email" className="w-full h-8 bg-transparent  border-b-2 border-gray-300 pl-8 py-1 text-sm focus:outline-none focus:border-purple-400"
 />
    
    </div>
    <div className="block relative  w-64 "> 
    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
    <input type="text" onChange={handleEdit} id="password"  className="w-full h-8 bg-transparent  border-b-2 border-gray-300 pl-8 py-1 text-sm focus:outline-none focus:border-purple-400"
/>
    
    </div>   <input type="submit" className="bg-purple-500 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal" />
          <div className='flex gap-2'>
        <p className="text-1xl text-purple-800 z-10">have an account  </p>
        <Link to={'/login'} className="text-1xl text-purple-800 z-10">Login</Link>
</div>
           </form>
         
    </div>
  )
}

export default Signup