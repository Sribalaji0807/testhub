import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Cart=()=>{
const username=localStorage.getItem('user');
const [array,setArray]=useState();

   useEffect(
    ()=>{
fetchdata();
    },[]);
    const fetchdata=async()=>{
        console.log(username);
const response =await fetch('http://localhost:3000/getthecart',{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    "name":username
  })
});
const data=await response.json();
console.log(data);
const {Productname,images} = data;
    const products=Productname.map((productname, index) => ({
      productname,
      image: images[index]
    }));
    console.log(products);
    setArray(products);
    console.log(array);

    }
    return(
        <>
        <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
  <div className="flex flex-wrap -m-4">

         {array.map((product, index) => (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
      <a className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.image} />
      </a>
      <h2 className="text-gray-900 title-font text-lg font-medium">{product.productname}</h2>
      <p className="mt-1">$21.15</p>
      <button class="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={()=>{setcart(index)}}>Add to cart</button>

    </div>
  ))}
  </div>
  </div>
  </section>
        </>
    )
}

export default Cart;