import React from "react";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom"
import AuthUser from "../shared/Authuser";

const Loginpage = () => {
  const navigate = useNavigate();
  const [emailid, setEmailid] = useState('');
  const [passwd, setPasswd] = useState('');
const {updateUserData}=useContext(AuthUser)
  const login = async function () {
    const senddata = {
      email: emailid,
      password: passwd
    }
    console.log(senddata);
    const response = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(senddata)
    })
  if(response.ok){
    const data = await response.json();
    const name = data.name;
    updateUserData(name);
  // console.log(name);
  //   localStorage.setItem("user", name);
   navigate('/');
  }
  }

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 class="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
            <p class="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
          </div>
          <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign in</h2>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600">Username</label>
              <input type="text" id="full-name" name="full-name" onChange={(e) => { setEmailid(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">Password</label>
              <input type="passwd" id="email" name="email" onChange={(e) => { setPasswd(e.target.value) }} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => { login() }}>Submit</button>
            <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
          </div>
        </div>
      </section></>
  );

}
export default Loginpage;