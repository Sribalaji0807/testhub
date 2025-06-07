import React, { useState,useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../shared/api"
const Cart=()=>{
//const {userData}=useContext(AuthUser);
 const [array,setArray]=useState([]);

   useEffect(
    ()=>{
fetchdata();
    },[]);
    const fetchdata=async()=>{
const response =await api.get('/api/cart/getthecart',{
 
  withCredentials:true,
 
});
const data= response.data;
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
const response = await api.post(
  "/api/cart/deletetheuserproduct",
  {
  
    id: id
  },
  {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
);
console.log(response);
fetchdata();
}
    
    return(
        <>
        <section class="text-gray-600 body-font">
  <div class="ml-14 container px-5 py-24 mx-auto">
  <div className="flex flex-wrap m-4">
<>
{array.length==0 ?(
  <div className="text-center mt-10 text-gray-500 w-full flex-col justify-center items-center">
  <svg className="mx-auto mb-4 w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h11.4M7 13L5.4 5M16 17a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
  <p>Your cart is empty. Add items to get started!</p>
</div>

):(
  array.map((product, index) => (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
      <a className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
      </a>
      <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
      <p className="mt-1">$21.15</p>
      <button class="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={()=>{deletetheproduct(product._id)}}>Delete from cart</button>

    </div>
  ))
)}
</>

         {/* {array.map((product, index) => (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full" key={index}>
      <a className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images} />
      </a>
      <h2 className="text-gray-900 title-font text-lg font-medium">{product.ProductName}</h2>
      <p className="mt-1">$21.15</p>
      <button class="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={()=>{deletetheproduct(product._id)}}>Delete from cart</button>

    </div>
  ))} */}
  </div>
  </div>
  </section>
        </>
    )
}

export default Cart;