import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navbar } from "../navbar/Navbar";
import { useSelector } from 'react-redux';
import api from "../shared/api";
const Orders = () => {
  //const username=localStorage.getItem('user');
  const [array,setArray]=useState([]);

   useEffect(
    ()=>{
fetchdata();
    },[]);
    const fetchdata=async()=>{
        
const response =await api.get('/api/products/getmyorder',{ 
 withCredentials:true,
});
const data= response.data;
console.log(data);
setArray(data);
    }
  return (
    <>
    <section class="text-gray-600 body-font">
<div class="container px-5 py-24 mx-auto">
<div className="flex flex-wrap -m-4">
{
  array.length >0 ? (
    array.map((product, index) => (
<div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
  <a className="block relative h-48 rounded overflow-hidden">
    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
  </a>
  <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
  <p className="mt-1">$21.15</p>
  <p className="mt-1">Delivered in 3 days</p>

</div>
))
  ):(
   <div className="text-center mt-10 text-gray-500 w-full flex flex-col justify-center items-center gap-4">
<img width="50" height="50" src="https://img.icons8.com/ios/50/bird--v1.png" alt="bird--v1"/>
  
  <p>  You have no orders yet. Start shopping now and track them here!
</p>
</div>
 
  )
}

     {/* {array.map((product, index) => (
<div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
  <a className="block relative h-48 rounded overflow-hidden">
    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
  </a>
  <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
  <p className="mt-1">$21.15</p>
  <p className="mt-1">Delivered in 3 days</p>

</div>
))} */}
</div>
</div>
</section>
    </>  )
}


export default Orders