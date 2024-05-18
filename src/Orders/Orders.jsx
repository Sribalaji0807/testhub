import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navbar } from "../navbar/Navbar";
const Orders = () => {
  const username=localStorage.getItem('user');
const [array,setArray]=useState([]);

   useEffect(
    ()=>{
fetchdata();
    },[]);
    const fetchdata=async()=>{
        console.log(username);
const response =await fetch('http://localhost:3000/getmyorder',{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    "Name":username
  })
});
const data=await response.json();
console.log(data);
setArray(data);
    }
  return (
    <>
    <Navbar/>
    <section class="text-gray-600 body-font">
<div class="container px-5 py-24 mx-auto">
<div className="flex flex-wrap -m-4">

     {array.map((product, index) => (
<div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
  <a className="block relative h-48 rounded overflow-hidden">
    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
  </a>
  <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
  <p className="mt-1">$21.15</p>
  <p className="mt-1">Delivered in 3 days</p>

</div>
))}
</div>
</div>
</section>
    </>  )
}


export default Orders