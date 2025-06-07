import React,{useCallback, useEffect, useState} from 'react'
import EditProduct from './EditProduct';
const AddProduct = () => {

  const [showEdit,setShowEdit]=useState(false);
  const [product,setProduct]=useState([]);
  const [searchResult,setSearchResult]=useState([]);
  const [showSearch,setShowSearch]=useState(false);
  const updateEdit=useCallback((val)=>{setShowEdit(val)},[])
  useEffect(()=>{
const fetchdata=async()=>{
  const response=await fetch('/server/api/products/productnames');
const data=await response.json();
console.log(data);
setProduct(data.products);
}
fetchdata();
}
  
  ,[])
  const search=(input)=>{
    console.log('start');
    if(input==='' || input===null || input===undefined){
      setSearchResult([]);
      setShowSearch(false);
      return;
    }
    
const response=product.filter((product)=>{
  return product.productName.toLowerCase().includes(input.toLowerCase())
})
console.log(response);
setShowSearch(true);
setSearchResult(response);
  }
  return (
    <div className='w-full h-full flex flex-wrap flex-col lg:mt-10 gap-2'>
   {!showEdit && (
    <>
         <div className='w-full  flex justify-center items-center gap-12'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-[6px]' onClick={()=>setShowEdit(true)}>Add Product</button>
        <div className='flex justify-center items-center'>
          <div>
            <input type="text" className='px-4 h-11 border-2 border-gray-300 rounded-[6px]' onChange={(e)=>search(e.target.value)} />
            <div className={`${showSearch ? 'block' : 'hidden'} w-1/4 absolute bg-white border-2 border-gray-300`}>
  {showSearch && searchResult.length > 0 ? (
    searchResult.map((product) => (
      <h3 key={product.id} className="p-2 hover:bg-gray-200">
        {product.productName}
      </h3>
    ))
  ) : (
    <p className="p-2">No products found</p>
  )}
</div>
            </div>
            <div>
               <button className='bg-blue-500 text-white px-4 py-2 rounded-[6px] ml-2'>Search</button>
               </div> </div>
</div>
<div className='w-full flex justify-center items-center text-4xs text-gray-700  '>
    <table cellPadding="26px" cellSpacing="2px">
       <thead>
       <tr>
            <th>s.no</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>

        </tr>
       </thead>
        <tbody>

        {product.length>0 && product.map((product, index) => (
          <tr key={index}>
              <td>{index+1}</td>
              <td>{product.productName}</td>
              <td><img src={product.images} className='w-[50px]' alt="" /></td>
            <td>{product.price}</td>
            <td>Edit</td>
            <td>Delete</td>
            </tr>
        ))}
        </tbody>
    </table>
</div></>
   )}

{showEdit && <EditProduct updateEdit={updateEdit}/>}
    </div>
  )
}
export default AddProduct;
