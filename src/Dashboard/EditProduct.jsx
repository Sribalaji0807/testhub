import React,{useState,useRef} from 'react'
import './EditProduct.css'
const EditProduct = ({updateEdit}) => {
const imageref=useRef();
const [imageUrl,setImageUrl]=useState(null);
const[imageOption,setImageOption]=useState(null);
  const [form,setForm]=useState({
    name:'',
    price:'', 
  
  });
  const [image,setImage]=useState(null);
 const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
 }
 const handleImage=(e)=>{
  const file=e.target.files[0];
  setImage(file);
  const reader=new FileReader();
  reader.onloadend=()=>{
      setImageUrl(reader.result);
  }
  reader.readAsDataURL(file);

 }

const handleSubmit=async(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append('file',image);
  formData.append('fileName',image.name);
    formData.append('name',form.name);
  formData.append('price',form.price);
  formData.append('parentCategory',form.parentCategory);
formData.append('description',form.description);
  console.log(formData);
  try {
    const response=await fetch('/server/admin/setproduct', {
      method:'POST',
      credentials:'include',
      body:formData,
    });
    if(response.ok){
      console.log("success");
    }
    updateEdit(false);

  } catch (error) {
    console.log(error);
  }
}

  return (
  <div className='w-full  flex justify-center items-center '>
    <div className=' flex justify-center  '>
        <form action="" className='flex flex-col gap-3 justify-center text-gray-700'>
            <label for="name">Name</label>
            <input className='border-2 border-gray-300 rounded-[6px] ' type="text" id="name" name="name" value={form.name} onChange={
              (e)=>handleChange(e)} required/>
          
            <label for="price">Price:</label>
            <input type="number" className='border-2 border-gray-300 rounded-[6px] ' id="price" name="price" onChange={
              (e)=>handleChange(e)} value={form.price} required/>

<label htmlFor="ImageOption">ImageOption</label>
<div className='flex flex-row gap-3'>  <input type="radio" name="imageOption" checked={imageOption === "ImageLink"} value="ImageLink" onChange={(e)=>setImageOption(e.target.value)} />
<p>ImageLink</p>
</div>
<div className='flex flex-row gap-3'>
<input type="radio" name="imageOption" value="ImageFile" checked={imageOption === "ImageFile"}  onChange={(e)=>setImageOption(e.target.value)} />
<p>ImageUpload</p>
</div>

    {imageOption==='ImageLink' && (
      <>
      <label for="Image">ImageLink</label>
          <input className='border-2 border-gray-300 rounded-[6px] ' type="text" id="name" name="ImageUrl" value={form.ImageUrl} onChange={
            (e)=>handleChange(e)} />
            </>   
    )}{imageOption==='ImageFile' && (

<label class="custum-file-upload" for="file" >

<div class="icon">
<svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
</div>
<div class="text">
   <span>Click to upload image</span>
   </div>
   <input type="file" id="file" onChange={(e)=>handleImage(e)}/>
</label>
    )}    
               <label for="Category">Category</label>
            <input className='border-2 border-gray-300 rounded-[6px] ' type="text" id="name" name="parentCategory" value={form.parentCategory} onChange={
              (e)=>handleChange(e)} required/>

                <label for="Category">Description</label>
           <textarea className='border-2 border-gray-300 rounded-[6px] ' id="name" name="description" value={form.description} onChange={
              (e)=>handleChange(e)} required></textarea>

<div className='flex flex-row justify-between text-white mt-6 '>
<button class="btn-31" onClick={(e)=>handleSubmit(e)}>
  <span class="text-container">
    <span class="text">Save</span>
  </span>
</button>
<button class="btn-31" onClick={()=>updateEdit(false)}>
  <span class="text-container">
    <span class="text">Cancel</span>
  </span>
</button>

</div>
        </form>
    </div>
    </div>
  )
}

export default EditProduct