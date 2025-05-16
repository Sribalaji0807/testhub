import React, { useState,useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

import AuthUser from "../shared/Authuser";

const Cart=()=>{
//const {userData}=useContext(AuthUser);
 const [array,setArray]=useState([]);

   useEffect(
    ()=>{
     
fetchdata();
    },[]);
    const fetchdata=async()=>{
const response =await fetch('/server/api/cart/getthecart',{
  method: 'GET',
  credentials:"include",
 
});
const data=await response.json();
console.log(data);
setArray(data);
// const {Productname,images} = data;
//     const products=Productname.map((productname, index) => ({
//       productname,
//       image: images[index]
//     }));
//     console.log(products);
//     setArray(products);
//     console.log(array);

    }
const deletetheproduct=async(id)=>{
const response=await fetch("/server/api/cart/deletetheuserproduct",{
  method:"POST",
  credentials:"include",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    Name:userData,
    id:id
  })
})
console.log(response);
fetchdata();
}
    
    return(
        <>
        <section class="text-gray-600 body-font">
  <div class="ml-14 container px-5 py-24 mx-auto">
  <div className="flex flex-wrap m-4">

         {array.map((product, index) => (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
      <a className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
      </a>
      <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
      <p className="mt-1">$21.15</p>
      <button class="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={()=>{deletetheproduct(product._id)}}>Delete from cart</button>

    </div>
  ))}
  </div>
  </div>
  </section>
        </>
    )
}

export default Cart;