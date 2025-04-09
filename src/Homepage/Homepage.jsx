import React, { useCallback } from "react";
import { Await, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import mac from "D:/projects/git repo/testhub/src/assets/mac.webp"
import BuyingComponent from "../BuyingPage/BuyingComponent";
import ProductCard from "../AllProducts/ProductCard";

//import iphone from "D:/projects/ecommerce/frontend/vite-project/src/assets/iphone.jpg"
const Homepage=()=>{
const location =useLocation();

const [array,setArray]=useState([]);
const [mainCategory,setMainCategory]=useState(null);
const [subcategory,setSubCategory]=useState([]);
const [User,setUser]=useState();
 useEffect(
()=>{
  fetchdata();
},[]
);
useEffect(() => {
 
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  
}, []);

const setcart=useCallback(async(index)=>{
  
  try{
const senddata={
  "Name":User,
  "id":index
}
console.log(senddata);
    const response=await fetch('/server/api/cart/addtocart',{method:"POST",
      credentials:"include",
headers:{
  'Content-Type':'application/json'
},
body:JSON.stringify(senddata)
  });
  if(response.ok){
    console.log("success");
  }
  }
  catch(error){
    console.log(error);
  }
},[]);
const fetchdata = async () => {
  try {
    const response = await fetch('/server/api/products/productnames');
    const data =await response.json()

console.log(Object.keys(data.mainCategory))
setArray(data.products);
setMainCategory(data.mainCategory);
setSubCategory(data.subCategory);

  } catch (error) {
    console.log(error.message);
  }
};
  return(
    <>
  {/* <BuyingComponent /> */}
<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">MacBook pro 14      <br class="hidden lg:inline-block"/>
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Read more</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Add to cart</button>
      </div>
    </div>
     <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src={mac} />
    </div>
  </div>
</section>
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
      <button class="mt-2 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"onClick={()=>{setcart(product._id)}}>Add to cart</button>
      <button class="mt-2 ml-8 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"><Link to={`/Buy/${product._id}`}>Buy</Link></button>

    </div>
  ))}
</div>     
{mainCategory != null &&
  Object.keys(mainCategory).map((category, index) => (
    <div key={index} className="p-4">
      <h2 className="text-black-900 title-font text-lg font-medium mb-2">{category}</h2>
      <div className="flex flex-wrap -m-4">
      {mainCategory[category].map((subcategory, subindex) => (
        <ProductCard subcategory={subcategory} subindex={subindex} setcart={setcart} />
      ))}
      </div>
    </div>
  ))}

         {/* <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://unsplash.com/photos/a-close-up-of-a-microphone-1IE_EhrJM_E" />
        </a>
        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
          <p class="mt-1">$21.15</p>
        </div>
      </div>
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/427x267" />
        </a>
        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">Neptune</h2>
          <p class="mt-1">$12.00</p>
        </div>
      </div>
      <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/428x268" />
        </a>
        <div class="mt-4">
          <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 class="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
          <p class="mt-1">$18.40</p>
        </div>
      </div> */}
  </div> 
</section>
    </>
);
}
export default Homepage;